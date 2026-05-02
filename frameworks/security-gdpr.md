# Security, Privacy, and GDPR Framework

Security and privacy must be designed before they are patched.

## Minimum Security Questions

- What data is sensitive?
- Who can access it?
- How is authentication handled?
- How is authorization enforced?
- What can an attacker do?
- What logs are captured?
- What secrets exist?
- What third parties receive data?
- What happens during breach detection and response?

## GDPR Questions

If EU users or EU personal data may exist:

- What personal data is processed?
- What is the lawful basis?
- Who is the controller?
- Who are processors/subprocessors?
- Where is data stored?
- How can users export data?
- How can users delete data?
- What is the retention period?
- Is consent needed?
- Is a DPA needed?
- Are cookies/tracking used?
- Is data transferred outside the EU?

## Mode Requirements

### Light

- secret handling
- no sensitive data in logs
- basic auth/privacy note if user data exists

### Standard

- security baseline
- auth and authorization model
- privacy data inventory
- GDPR screen if personal data exists
- dependency and secret review
- secure deployment settings

### Full

- threat model
- OWASP review
- STRIDE or equivalent analysis
- GDPR data processing record
- subprocessors
- retention/deletion/export plan
- audit logs
- incident response plan
- rate limiting and abuse prevention
- compliance roadmap
- trust communication plan

## AI-Specific Security

If AI is core:

- prompt injection risks
- data leakage risks
- tool-use permissions
- retrieval boundaries
- model fallback behavior
- evaluation plan
- human escalation path
- hallucination risk handling

## Gate

Do not ship with unresolved critical/high security or privacy risks.

