import test from "node:test";
import assert from "node:assert/strict";

import { normalizeSlackEvent } from "../src/slack-event.mjs";

test("normalizes only message reaction_added envelopes", () => {
  assert.deepEqual(
    normalizeSlackEvent({
      type: "event_callback",
      event_id: "Ev123",
      team_id: "T123",
      event: {
        type: "reaction_added",
        reaction: "rocket",
        user: "U123",
        item: { type: "message", channel: "C123", ts: "123.456" }
      }
    }),
    {
      id: "Ev123",
      reaction: "rocket",
      workspaceId: "T123",
      channelId: "C123",
      userId: "U123",
      messageTs: "123.456"
    }
  );
  assert.equal(normalizeSlackEvent({ type: "event_callback", event: {} }), null);
});
