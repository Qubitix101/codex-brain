# Trigger Calibration

## Trigger examples

1. “Run one `$jass-loop-build` pass for the next eligible Qubitix issue.”
2. “Claim one `agent-ready` issue and implement only its contract.”
3. “Build QUB-42, prove it, and open one PR.”
4. “Continue the bounded builder workflow for this already specified issue.”
5. “Take the next safe queue item through implementation and verification.”

## Non-trigger examples

1. “Turn this idea into a specification.”
2. “Independently review PR 91.”
3. “Keep building every five minutes forever.”
4. “Merge every green pull request.”
5. “Tell me whether the current loop is healthy.”

Expected: trigger only for one bounded implementation unit. Do not spec,
self-approve, merge, or create a recurring schedule.
