import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const migrationUrl = new URL("../sql/002_dry_run_bridge.sql", import.meta.url);

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
