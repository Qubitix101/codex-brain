export function createSlackClient({ token, fetchImpl = fetch }) {
  async function call(method, body) {
    const response = await fetchImpl(`https://slack.com/api/${method}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body)
    });
    const result = await response.json();
    if (!response.ok || result.ok !== true) {
      throw new Error(`Slack ${method} failed`);
    }
    return result;
  }

  return Object.freeze({
    async postDryRunResult({ channelId, messageTs, result }) {
      const ready = result.status === "dry_run_ready";
      const text = ready
        ? "🧪 Your 🚀 was securely recorded. I rechecked the exact pull request and it is ready under the Phase 2 rules. Nothing was merged—dry-run mode is still on."
        : `⚠️ Your 🚀 was recorded, but the safety check stopped here: ${result.decision?.code ?? result.status}. Nothing was merged.`;
      return call("chat.postMessage", {
        channel: channelId,
        thread_ts: messageTs,
        text
      });
    }
  });
}
