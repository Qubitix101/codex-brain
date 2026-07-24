import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";

import { verifySlackSignature } from "../src/slack-signature.mjs";

const SECRET = "test-signing-secret";
const TIMESTAMP = "2000000000";
const RAW = Buffer.from('{"type":"event_callback"}');

function signature(rawBody = RAW) {
  return `v0=${createHmac("sha256", SECRET)
    .update(Buffer.concat([Buffer.from(`v0:${TIMESTAMP}:`), rawBody]))
    .digest("hex")}`;
}

test("accepts the exact raw body with a fresh Slack signature", () => {
  assert.deepEqual(
    verifySlackSignature({
      rawBody: RAW,
      timestamp: TIMESTAMP,
      signature: signature(),
      signingSecret: SECRET,
      nowSeconds: Number(TIMESTAMP)
    }),
    { ok: true, code: "VERIFIED" }
  );
});

test("rejects a modified body", () => {
  const result = verifySlackSignature({
    rawBody: Buffer.from('{"type":"different"}'),
    timestamp: TIMESTAMP,
    signature: signature(),
    signingSecret: SECRET,
    nowSeconds: Number(TIMESTAMP)
  });
  assert.equal(result.ok, false);
  assert.equal(result.code, "SIGNATURE_MISMATCH");
});

test("rejects a request older than five minutes", () => {
  const result = verifySlackSignature({
    rawBody: RAW,
    timestamp: TIMESTAMP,
    signature: signature(),
    signingSecret: SECRET,
    nowSeconds: Number(TIMESTAMP) + 301
  });
  assert.equal(result.ok, false);
  assert.equal(result.code, "STALE_REQUEST");
});
