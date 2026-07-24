import { createHmac, timingSafeEqual } from "node:crypto";

const DEFAULT_MAX_AGE_SECONDS = 60 * 5;

function asBuffer(value) {
  return Buffer.from(String(value ?? ""), "utf8");
}

export function verifySlackSignature({
  rawBody,
  timestamp,
  signature,
  signingSecret,
  nowSeconds = Math.floor(Date.now() / 1000),
  maxAgeSeconds = DEFAULT_MAX_AGE_SECONDS
}) {
  if (
    !Buffer.isBuffer(rawBody) ||
    !/^\d+$/.test(String(timestamp ?? "")) ||
    !/^v0=[a-f0-9]{64}$/.test(String(signature ?? "")) ||
    typeof signingSecret !== "string" ||
    signingSecret.length === 0
  ) {
    return Object.freeze({ ok: false, code: "INVALID_SIGNATURE_INPUT" });
  }

  const requestSeconds = Number(timestamp);
  if (Math.abs(nowSeconds - requestSeconds) > maxAgeSeconds) {
    return Object.freeze({ ok: false, code: "STALE_REQUEST" });
  }

  const base = Buffer.concat([
    asBuffer(`v0:${timestamp}:`),
    rawBody
  ]);
  const expected = asBuffer(
    `v0=${createHmac("sha256", signingSecret).update(base).digest("hex")}`
  );
  const received = asBuffer(signature);

  if (
    expected.length !== received.length ||
    !timingSafeEqual(expected, received)
  ) {
    return Object.freeze({ ok: false, code: "SIGNATURE_MISMATCH" });
  }

  return Object.freeze({ ok: true, code: "VERIFIED" });
}

export async function readRawBody(request, maxBytes = 256 * 1024) {
  const chunks = [];
  let bytes = 0;

  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    bytes += buffer.length;
    if (bytes > maxBytes) {
      const error = new Error("Request body exceeds the allowed size");
      error.code = "BODY_TOO_LARGE";
      throw error;
    }
    chunks.push(buffer);
  }

  return Buffer.concat(chunks);
}
