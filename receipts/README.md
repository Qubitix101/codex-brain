# Verification Receipts

Receipts are append-only proof of what actually ran. Use one Markdown file per
bounded pass:

```text
YYYY-MM-DDTHH-MM-SSZ-TEAM-NNN-short-slug.md
```

Each receipt contains:

```md
# Receipt

- Time:
- Actor:
- Linear issue:
- Repository, branch, and commit SHA:
- Pull request:
- Intended scope:
- External writes:

## Commands and interactions

1. Command or interface action
   - Exit/result:
   - Relevant output:

## Acceptance-criterion evidence

- AC-1:
- AC-2:

## Independent cross-check

- Check:
- Result:

## Outcome

- Status: proven | blocked | failed
- Unverified:
- Next safe action:
```

Never store credentials, access tokens, personal data, or full sensitive logs
in a receipt. Link to access-controlled evidence when needed.
