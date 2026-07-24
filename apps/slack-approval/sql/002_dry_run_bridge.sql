-- Phase 2 dry-run bridge hardening and atomic RPC surface.
-- This migration does not create any merge-capable database function.

alter table jass_loop_private.slack_merge_message_bindings
  enable row level security;
alter table jass_loop_private.slack_merge_approval_events
  enable row level security;
alter table jass_loop_private.slack_merge_receipts
  enable row level security;

alter table jass_loop_private.slack_merge_approval_events
  add column if not exists attempt_count integer not null default 1
    check (attempt_count between 1 and 3);

revoke all on table jass_loop_private.slack_merge_message_bindings
  from anon, authenticated, service_role;
revoke all on table jass_loop_private.slack_merge_approval_events
  from anon, authenticated, service_role;
revoke all on table jass_loop_private.slack_merge_receipts
  from anon, authenticated, service_role;

grant select, insert, update
  on table jass_loop_private.slack_merge_message_bindings
  to service_role;
grant select, insert, update
  on table jass_loop_private.slack_merge_approval_events
  to service_role;
grant select, insert, update
  on table jass_loop_private.slack_merge_receipts
  to service_role;

create or replace function public.jass_loop_claim_event(
  p_event_id text,
  p_workspace_id text,
  p_channel_id text,
  p_message_ts text,
  p_user_id text,
  p_reaction text
)
returns boolean
language plpgsql
security invoker
set search_path = jass_loop_private, pg_temp
as $$
declare
  inserted_count integer;
begin
  insert into jass_loop_private.slack_merge_approval_events (
    event_id,
    workspace_id,
    channel_id,
    message_ts,
    user_id,
    reaction
  ) values (
    p_event_id,
    p_workspace_id,
    p_channel_id,
    p_message_ts,
    p_user_id,
    p_reaction
  )
  on conflict (event_id) do nothing;

  get diagnostics inserted_count = row_count;
  if inserted_count = 1 then
    return true;
  end if;

  -- A later Slack retry may recover an explicitly failed delivery, or a claim
  -- abandoned for at least 30 seconds. Completed/denied events never reopen.
  update jass_loop_private.slack_merge_approval_events
  set status = 'claimed',
      attempt_count = attempt_count + 1,
      decision_code = null,
      decision = null,
      failure = null,
      claimed_at = now(),
      updated_at = now()
  where event_id = p_event_id
    and attempt_count < 3
    and (
      status = 'processing_failed'
      or (status = 'claimed' and updated_at < now() - interval '30 seconds')
    );

  get diagnostics inserted_count = row_count;
  return inserted_count = 1;
end;
$$;

create or replace function public.jass_loop_find_binding(
  p_workspace_id text,
  p_channel_id text,
  p_message_ts text
)
returns jsonb
language sql
stable
security invoker
set search_path = jass_loop_private, pg_temp
as $$
  select to_jsonb(binding)
  from jass_loop_private.slack_merge_message_bindings as binding
  where binding.workspace_id = p_workspace_id
    and binding.channel_id = p_channel_id
    and binding.message_ts = p_message_ts
    and binding.state = 'awaiting_approval'
    and binding.merge_enabled = true
    and (binding.expires_at is null or binding.expires_at > now())
  limit 1;
$$;

create or replace function public.jass_loop_record_decision(
  p_event_id text,
  p_status text,
  p_decision jsonb,
  p_failure jsonb
)
returns boolean
language plpgsql
security invoker
set search_path = jass_loop_private, pg_temp
as $$
declare
  updated_count integer;
begin
  update jass_loop_private.slack_merge_approval_events
  set status = p_status,
      decision_code = p_decision ->> 'code',
      decision = p_decision,
      failure = p_failure,
      updated_at = now()
  where event_id = p_event_id
    and (
      (p_status = 'processing_failed' and status = 'claimed')
      or (
        p_status <> 'processing_failed'
        and status in ('claimed', 'processing_failed')
      )
    );

  get diagnostics updated_count = row_count;
  return updated_count = 1;
end;
$$;

create or replace function public.jass_loop_get_event_outcome(
  p_event_id text
)
returns jsonb
language sql
stable
security invoker
set search_path = jass_loop_private, pg_temp
as $$
  select jsonb_build_object(
    'eventId', event_id,
    'status', status,
    'decisionCode', decision_code,
    'decision', decision,
    'failure', failure,
    'attemptCount', attempt_count,
    'claimedAt', claimed_at,
    'updatedAt', updated_at
  )
  from jass_loop_private.slack_merge_approval_events
  where event_id = p_event_id;
$$;

create or replace function public.jass_loop_finalize_dry_run_approval(
  p_event_id text,
  p_workspace_id text,
  p_channel_id text,
  p_message_ts text,
  p_reviewed_sha text,
  p_authorized_by_user_id text,
  p_decision jsonb
)
returns boolean
language plpgsql
security invoker
set search_path = jass_loop_private, pg_temp
as $$
declare
  updated_count integer;
begin
  update jass_loop_private.slack_merge_message_bindings
  set state = 'claimed',
      claimed_event_id = p_event_id,
      claimed_by_user_id = p_authorized_by_user_id,
      claimed_at = now()
  where workspace_id = p_workspace_id
    and channel_id = p_channel_id
    and message_ts = p_message_ts
    and reviewed_sha = p_reviewed_sha
    and merge_enabled = true
    and (
      (
        state = 'awaiting_approval'
        and (expires_at is null or expires_at > now())
      )
      or (
        state = 'claimed'
        and claimed_event_id = p_event_id
        and claimed_by_user_id = p_authorized_by_user_id
      )
    );

  get diagnostics updated_count = row_count;
  if updated_count <> 1 then
    return false;
  end if;

  update jass_loop_private.slack_merge_approval_events
  set status = 'dry_run_ready',
      decision_code = p_decision ->> 'code',
      decision = p_decision,
      failure = null,
      updated_at = now()
  where event_id = p_event_id
    and status in ('claimed', 'processing_failed', 'dry_run_ready');

  get diagnostics updated_count = row_count;
  if updated_count <> 1 then
    raise exception 'dry-run event was not durably claimed';
  end if;

  return true;
end;
$$;

revoke all on function public.jass_loop_claim_event(text, text, text, text, text, text)
  from public, anon, authenticated;
revoke all on function public.jass_loop_find_binding(text, text, text)
  from public, anon, authenticated;
revoke all on function public.jass_loop_record_decision(text, text, jsonb, jsonb)
  from public, anon, authenticated;
revoke all on function public.jass_loop_get_event_outcome(text)
  from public, anon, authenticated;
revoke all on function public.jass_loop_finalize_dry_run_approval(
  text, text, text, text, text, text, jsonb
) from public, anon, authenticated;

grant execute on function public.jass_loop_claim_event(text, text, text, text, text, text)
  to service_role;
grant execute on function public.jass_loop_find_binding(text, text, text)
  to service_role;
grant execute on function public.jass_loop_record_decision(text, text, jsonb, jsonb)
  to service_role;
grant execute on function public.jass_loop_get_event_outcome(text)
  to service_role;
grant execute on function public.jass_loop_finalize_dry_run_approval(
  text, text, text, text, text, text, jsonb
) to service_role;
