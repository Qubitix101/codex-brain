# Database and Scale Framework

Database decisions are product decisions. They affect performance, data safety, enterprise readiness, migrations, analytics, and future feature velocity.

## Required Questions

For every project with persistent data:

- What data is stored?
- Who owns each record?
- What is the access boundary?
- What grows fastest?
- What is the expected read/write pattern?
- What queries must be fast?
- What must be auditable?
- What must be deleted or exported?
- What must be retained?
- What happens at 10x, 100x, and 1000x current assumptions?

## Mode Requirements

### Light

- storage choice
- basic schema or data model
- backup/restore note if data matters

### Standard

- database choice rationale
- schema
- indexing plan
- migration plan
- auth ownership model
- backup strategy
- data deletion/export approach

### Full

- database alternatives matrix
- ADR for database selection
- multi-tenancy model if applicable
- row-level security or equivalent isolation plan
- indexing and query scale model
- partitioning/archive strategy if needed
- analytics/data warehouse boundary
- migration/rollback plan
- backup/restore RTO/RPO
- data retention and deletion policy
- noisy-neighbor prevention

## Database Choice Criteria

Evaluate:

- query shape
- consistency requirements
- transaction requirements
- relational complexity
- scale path
- operational maturity
- ecosystem/tooling
- hosting and cost
- portability
- team familiarity
- compliance needs

## Common Defaults

These are defaults, not laws:

- PostgreSQL for most serious SaaS products.
- SQLite for local-first, embedded, prototypes, or single-user internal tools.
- Redis for cache/queues/ephemeral coordination, not source of truth.
- Object storage for files and large blobs.
- Search engine/vector store only when query requirements justify it.

## Multi-Tenancy

If the project has organizations, teams, workspaces, clients, customers, schools, clinics, companies, or accounts with owned data, define the tenant model before implementation.

Options:

- shared database, shared schema, tenant_id on records
- shared database, separate schemas
- separate databases per tenant
- hybrid by tier

Required:

- tenant identifier
- isolation enforcement
- cross-tenant query prevention
- admin access rules
- background job tenant context
- audit logs
- tests proving isolation

## Scale Model

For Standard and Full, document:

- expected users at launch, 12 months, 36 months
- records per user/tenant
- hottest tables
- hottest queries
- largest payloads
- write frequency
- read frequency
- peak concurrency
- cache plan

## Gate

Do not implement serious persistence until the database section matches the project mode.

