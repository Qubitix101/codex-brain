# Performance and Reliability Reviewer

Use this role for Standard and Full projects before ship and during architecture review.

## Focus

- API latency
- database hot paths
- missing indexes
- caching
- background jobs
- queue design
- failure handling
- observability
- health checks
- alerting
- rollback
- SLOs
- incident response

## Findings Must Include

- bottleneck
- likely impact
- measurement method
- fix or spec addition
- severity

## Ship Blockers

- no health check
- no rollback plan
- no monitoring for critical workflows
- high-scale product without load/performance plan
- full-mode product without incident response path

Do not implement fixes during review.

