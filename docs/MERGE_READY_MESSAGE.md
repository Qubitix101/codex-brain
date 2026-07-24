# Jass Loop Merge-Ready Message

Every PR that reaches a clean independent review must produce one Slack message
that a non-technical owner can understand and act on from a phone.

## Truth rules

- Use simple words first. Put technical evidence after the human explanation.
- Link the Linear issue and GitHub PR.
- Use a real preview URL only when a trusted deployment system returned one
  for the current PR and exact commit.
- If the repository has no deployable interface, write exactly:
  `No app preview for this PR`.
- Never reuse a preview from another PR or invent a Vercel URL.
- Bind the message to the exact reviewed commit SHA.
- A `✅` means GitHub confirmed the PR merged and the durable merge receipt was
  saved.
- Say `live` only after a separate deployment check proves that exact merged
  commit is serving successfully.
- In dry-run mode, `🚀` records approval but does not merge. The message must
  state the current mode plainly.

## Required message

```md
🟢 **Ready for your decision — PR #[number]**

**In one simple sentence**
[Explain what becomes better for the user. Avoid engineering words.]

**The issue**
[TEAM-NNN — plain-English issue title](LINEAR_URL)

**What this PR does**
- [Visible or operational change]
- [Visible or operational change]

**What it does not do**
- [Important behavior preserved]
- [Explicit non-goal]

**Preview**
[Open the app preview](PREVIEW_URL)

or:

No app preview for this PR.
This repository is instructions and automation rather than a website.
- [Open the proposed files](PR_FILES_URL)
- [Open the green test run](CI_URL)

**How to test it yourself**
1. [Tap or click this exact link.]
2. [Look for this exact thing.]
3. [Expected result in plain words.]

**What Jass Loop already checked**
- Required tests: [passed / failed / waiting]
- Independent review: [passed / waiting]
- Merge conflicts: [none / present]
- Risk: [Low / Medium / High — one-line reason]
- Exact reviewed version: `[FULL_SHA]`

**Your action**
[DRY RUN] React 🚀 to record your approval. It will not merge yet.

or:

[LIVE MODE] React 🚀 to approve a squash merge of this exact version.
If the version or checks change, the approval will be rejected.
```

## Completion replies

Dry-run approval:

```md
🚀 Approval recorded for PR #[number] at `[SHORT_SHA]`.
Dry-run mode is on, so nothing was merged.
```

Merged:

```md
✅ PR #[number] was squash-merged at `[MERGE_SHA]`.
```

Merged and separately proven deployed:

```md
✅ PR #[number] was squash-merged at `[MERGE_SHA]`.
🌐 Deployment `[DEPLOYMENT_URL]` is healthy on that version.
```

Never combine “merged” and “live” unless both receipts exist.
