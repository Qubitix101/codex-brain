-- PostgreSQL schema for the Slack exact-SHA approval protocol.
-- Apply with a dedicated migration role. The runtime service should receive
-- only the least privileges needed for the statements documented below.

create schema if not exists jass_loop_private;
revoke all on schema jass_loop_private from public, anon, authenticated;
grant usage on schema jass_loop_private to service_role;

create table if not exists jass_loop_private.slack_merge_message_bindings (
  workspace_id text not null,
  channel_id text not null,
  message_ts text not null,
  repo_owner text not null,
  repo_name text not null,
  pull_number bigint not null check (pull_number > 0),
  reviewed_sha text not null check (reviewed_sha ~ '^[0-9a-fA-F]{40}$'),
  risk_level text not null check (risk_level in ('low', 'medium', 'high')),
  merge_enabled boolean not null default false,
  state text not null default 'awaiting_approval'
    check (state in ('awaiting_approval', 'claimed', 'cancelled', 'superseded')),
  claimed_event_id text,
  claimed_by_user_id text,
  claimed_at timestamptz,
  bound_by text not null,
  bound_at timestamptz not null default now(),
  expires_at timestamptz,
  primary key (workspace_id, channel_id, message_ts),
  check (risk_level = 'low' or merge_enabled = false)
);

create table if not exists jass_loop_private.slack_merge_approval_events (
  event_id text primary key,
  workspace_id text not null,
  channel_id text not null,
  message_ts text not null,
  user_id text not null,
  reaction text not null,
  status text not null default 'claimed',
  decision_code text,
  decision jsonb,
  failure jsonb,
  claimed_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists jass_loop_private.slack_merge_receipts (
  event_id text primary key
    references jass_loop_private.slack_merge_approval_events(event_id)
      on delete restrict,
  workspace_id text not null,
  channel_id text not null,
  message_ts text not null,
  authorized_by_user_id text not null,
  repo_owner text not null,
  repo_name text not null,
  pull_number bigint not null check (pull_number > 0),
  reviewed_sha text not null check (reviewed_sha ~ '^[0-9a-fA-F]{40}$'),
  merge_commit_sha text check (
    merge_commit_sha is null or merge_commit_sha ~ '^[0-9a-fA-F]{40}$'
  ),
  merge_method text not null check (merge_method in ('merge', 'squash', 'rebase')),
  github_response jsonb not null,
  merged_at timestamptz not null,
  stored_at timestamptz not null default now(),
  receipt_reaction text,
  receipt_reaction_recorded_at timestamptz,
  unique (repo_owner, repo_name, pull_number, reviewed_sha)
);

create index if not exists slack_merge_events_message_idx
  on jass_loop_private.slack_merge_approval_events (
    workspace_id,
    channel_id,
    message_ts
  );

create index if not exists slack_merge_receipts_pr_idx
  on jass_loop_private.slack_merge_receipts (
    repo_owner,
    repo_name,
    pull_number
  );

-- Atomic event claim. Exactly one worker receives a returned row.
--
-- insert into jass_loop_private.slack_merge_approval_events (
--   event_id, workspace_id, channel_id, message_ts, user_id, reaction
-- ) values ($1, $2, $3, $4, $5, $6)
-- on conflict (event_id) do nothing
-- returning event_id;

-- Atomic approval claim. Exactly one distinct Slack event may claim the
-- message/PR/SHA approval, even if several rockets arrive concurrently.
--
-- update jass_loop_private.slack_merge_message_bindings
-- set state = 'claimed',
--     claimed_event_id = $5,
--     claimed_by_user_id = $6,
--     claimed_at = now()
-- where workspace_id = $1
--   and channel_id = $2
--   and message_ts = $3
--   and reviewed_sha = $4
--   and state = 'awaiting_approval'
--   and merge_enabled = true
--   and (expires_at is null or expires_at > now())
-- returning workspace_id, channel_id, message_ts, reviewed_sha;

-- getEventOutcome reads the event plus its optional receipt by event_id.
-- getApprovalOutcome reads the claimed_event_id from the exact binding, then
-- joins that event and its optional receipt. These are read-only reconciliation
-- paths; they never repeat a merge call.

-- Production notes:
-- 1. findBinding must add:
--      and merge_enabled = true
--      and state = 'awaiting_approval'
--      and (expires_at is null or expires_at > now())
-- 2. saveMergeReceipt and the corresponding event status update should commit
--    in one transaction.
-- 3. Keep jass_loop_private out of the Supabase Data API exposed schemas.
--    Public RPCs must use security invoker and be granted only to service_role.
-- 4. Do not delete claims or receipts as part of routine retries.
