const API = "https://api.github.com";

export function createGitHubReadOnlyAdapter({
  token,
  signal,
  fetchImpl = fetch,
  delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))
}) {
  async function github(path) {
    const response = await fetchImpl(`${API}${path}`, {
      headers: {
        accept: "application/vnd.github+json",
        authorization: `Bearer ${token}`,
        "x-github-api-version": "2022-11-28"
      },
      signal
    });
    if (!response.ok) {
      throw new Error(`GitHub read failed with HTTP ${response.status}`);
    }
    return response.json();
  }

  return Object.freeze({
    async getPullRequest({ repoOwner, repoName, pullNumber }) {
      const repo = `/repos/${encodeURIComponent(repoOwner)}/${encodeURIComponent(repoName)}`;
      let pull;
      for (let attempt = 0; attempt < 3; attempt += 1) {
        pull = await github(`${repo}/pulls/${pullNumber}`);
        if (pull.mergeable_state !== "unknown") break;
        if (attempt < 2) await delay(100 * (2 ** attempt));
      }
      const baseBranch = pull.base?.ref;

      const [protection, checks] = await Promise.all([
        github(`${repo}/branches/${encodeURIComponent(baseBranch)}/protection`),
        github(`${repo}/commits/${encodeURIComponent(pull.head?.sha)}/check-runs?per_page=100`)
      ]);

      const required = protection.required_status_checks?.checks ?? [];
      const requiredChecks = required.map((requirement) => {
        const matches = (checks.check_runs ?? []).filter(
          (check) =>
            check.name === requirement.context &&
            (requirement.app_id == null || String(check.app?.id) === String(requirement.app_id))
        );
        const latest = matches.sort(
          (a, b) => new Date(b.completed_at ?? b.started_at ?? 0) -
            new Date(a.completed_at ?? a.started_at ?? 0)
        )[0];
        return {
          name: requirement.context,
          appId: latest?.app?.id ?? requirement.app_id ?? null,
          status: latest?.status ?? "missing",
          conclusion: latest?.conclusion ?? null
        };
      });

      return Object.freeze({
        headSha: pull.head?.sha,
        baseBranch,
        state: pull.state,
        isDraft: pull.draft === true,
        labels: (pull.labels ?? []).map((label) => label.name),
        requiredChecks,
        mergeableState: pull.mergeable_state
      });
    }
  });
}
