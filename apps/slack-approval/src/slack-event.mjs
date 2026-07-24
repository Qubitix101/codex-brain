export function normalizeSlackEvent(payload) {
  if (payload?.type !== "event_callback" || payload?.event?.type !== "reaction_added") {
    return null;
  }

  const item = payload.event.item;
  if (item?.type !== "message") {
    return null;
  }

  return Object.freeze({
    id: payload.event_id,
    reaction: payload.event.reaction,
    workspaceId: payload.team_id,
    channelId: item.channel,
    userId: payload.event.user,
    messageTs: item.ts
  });
}
