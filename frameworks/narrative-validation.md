# Narrative Validation

Narrative validation catches the gap between builder language and user language.

Specifications answer:

- What tables exist?
- What APIs exist?
- What components exist?
- What rules exist?

Narratives answer:

- What does the user believe they can do?
- What outcome do we promise?
- Why should they trust it?
- Why is it better than alternatives?

Both must match.

## Required for Full Mode

Full-mode projects must create:

```text
docs/product/pitch-narrative.md
docs/product/promise-to-spec-audit.md
```

## Narrative Sections

1. What the product is
2. Who it is for
3. The problem it solves
4. Why now
5. Why alternatives fail
6. What the user experiences first
7. The core workflow
8. The trust story
9. The data/privacy story
10. The AI story if applicable
11. The business/pricing story if applicable
12. The outcome users get
13. What could go wrong
14. Why this can become excellent

## Promise-to-Spec Audit

Extract every user-facing promise.

| Promise | Type | Spec Reference | Status | Gap Severity |
| --- | --- | --- | --- | --- |

Types:

- feature
- data
- security
- privacy
- performance
- AI quality
- design/UX
- billing
- compliance
- support
- business outcome

Severity:

- P0: promise impossible or unsafe
- P1: promise missing core implementation detail
- P2: promise vague but manageable
- P3: wording polish

## Gate

Full mode cannot enter execution with unresolved P0/P1 narrative gaps.

