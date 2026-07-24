function snakeToCamelBinding(row) {
  if (!row) return null;
  return Object.freeze({
    workspaceId: row.workspace_id,
    channelId: row.channel_id,
    messageTs: row.message_ts,
    repoOwner: row.repo_owner,
    repoName: row.repo_name,
    pullNumber: Number(row.pull_number),
    reviewedSha: row.reviewed_sha,
    riskLevel: row.risk_level,
    mergeEnabled: row.merge_enabled
  });
}

export function createSupabaseStore({
  url,
  serviceRoleKey,
  signal,
  fetchImpl = fetch
}) {
  async function rpc(name, body) {
    const response = await fetchImpl(`${url}/rest/v1/rpc/${name}`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        authorization: `Bearer ${serviceRoleKey}`,
        "content-type": "application/json"
      },
      signal,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Durable store RPC ${name} failed with HTTP ${response.status}`);
    }
    if (response.status === 204) return null;
    return response.json();
  }

  return Object.freeze({
    async claimEvent(event) {
      return rpc("jass_loop_claim_event", {
        p_event_id: event.id,
        p_workspace_id: event.workspaceId,
        p_channel_id: event.channelId,
        p_message_ts: event.messageTs,
        p_user_id: event.userId,
        p_reaction: event.reaction
      });
    },
    async getEventOutcome(eventId) {
      return rpc("jass_loop_get_event_outcome", { p_event_id: eventId });
    },
    async findBinding(key) {
      const row = await rpc("jass_loop_find_binding", {
        p_workspace_id: key.workspaceId,
        p_channel_id: key.channelId,
        p_message_ts: key.messageTs
      });
      return snakeToCamelBinding(row);
    },
    async recordDecision(eventId, record) {
      return rpc("jass_loop_record_decision", {
        p_event_id: eventId,
        p_status: record.status,
        p_decision: record.decision ?? null,
        p_failure: record.failure ?? null
      });
    },
    async finalizeDryRunApproval(value) {
      return rpc("jass_loop_finalize_dry_run_approval", {
        p_event_id: value.eventId,
        p_workspace_id: value.workspaceId,
        p_channel_id: value.channelId,
        p_message_ts: value.messageTs,
        p_reviewed_sha: value.reviewedSha,
        p_authorized_by_user_id: value.authorizedByUserId,
        p_decision: value.decision
      });
    }
  });
}
