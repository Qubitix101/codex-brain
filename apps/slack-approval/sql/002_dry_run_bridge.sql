-- Phase 2 dry-run bridge hardening and atomic RPC surface.
-- This migration does not create any merge-capable database function.

alter table public.slack_merge_message_bindings enable row level security;
alter table public.slack_merge_approval_events enable row level security;
alter table public.slack_merge_receipts enable row level security;

alter table public.slack_merge_approval_events
  add column if not exists attempt_count integer not null default 1
    check (attempt_count between 1 and 3);

revoke all on table public.slack_merge_message_bindings
  from anon, authenticated, service_role;
revoke all on table public.slack_merge_approval_events
  from anon, authenticated, service_role;
revoke all on table public.slack_merge_receipts
  from anon, authenticated, service_role;

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
security definer
set search_path = public, pg_temp
as $$
declare
  inserted_count integer;
begin
  insert into public.slack_merge_approval_events (
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
  update public.slack_merge_approval_events
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
security definer
set search_path = public, pg_temp
as $$
  select to_jsonb(binding)
  from public.slack_merge_message_bindings as binding
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
security definer
set search_path = public, pg_temp
as $$
declare
  updated_count integer;
begin
  update public.slack_merge_approval_events
  set status = p_status,
      decision_code = p_decision ->> 'code',
      decision = p_decision,
      failure = p_failure,
      updated_at = now()
  where event_id = p_event_id;

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
security definer
set search_path = public, pg_temp
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
  from public.slack_merge_approval_events
  where event_id = p_event_id;
$$;

revoke all on function public.jass_loop_claim_event(text, text, text, text, text, text)
  from public, anon, authenticated;
revoke all on function public.jass_loop_find_binding(text, text, text)
  from public, anon, authenticated;
revoke all on function public.jass_loop_record_decision(text, text, jsonb, jsonb)
  from public, anon, authenticated;
revoke all on function public.jass_loop_get_event_outcome(text)
  from public, anon, authenticated;

grant execute on function public.jass_loop_claim_event(text, text, text, text, text, text)
  to service_role;
grant execute on function public.jass_loop_find_binding(text, text, text)
  to service_role;
grant execute on function public.jass_loop_record_decision(text, text, jsonb, jsonb)
  to service_role;
grant execute on function public.jass_loop_get_event_outcome(text)
  to service_role;
