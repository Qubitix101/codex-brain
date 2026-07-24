import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const migrationUrl = new URL("../sql/002_dry_run_bridge.sql", import.meta.url);
const schemaUrl = new URL("../sql/001_approval_receipts.sql", import.meta.url);

test("SQL preserves terminal outcomes and makes same-event finalization idempotent", async () => {
  const sql = await readFile(migrationUrl, "utf8");
  assert.match(
    sql,
    /p_status = 'processing_failed' and status = 'claimed'/
  );
  assert.match(
    sql,
    /state = 'claimed'\s+and claimed_event_id = p_event_id\s+and claimed_by_user_id = p_authorized_by_user_id/
  );
  assert.match(
    sql,
    /status in \('claimed', 'processing_failed', 'dry_run_ready'\)/
  );
});

test("SQL keeps durable tables private and avoids privileged definer RPCs", async () => {
  const [schema, migration] = await Promise.all([
    readFile(schemaUrl, "utf8"),
    readFile(migrationUrl, "utf8")
  ]);
  assert.match(schema, /create schema if not exists jass_loop_private/);
  assert.doesNotMatch(schema, /create table if not exists public\./);
  assert.doesNotMatch(migration, /security definer/i);
  assert.match(migration, /security invoker/i);
  assert.match(
    migration,
    /grant select, insert, update[\s\S]+to service_role/
  );
  assert.match(
    migration,
    /revoke all on function public\.jass_loop_claim_event[\s\S]+from public, anon, authenticated/
  );
});
