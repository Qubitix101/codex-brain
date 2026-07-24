# Trigger Calibration

## Trigger examples

1. “Is the loop running and healthy?”
2. “Will this keep working while I sleep?”
3. “What is blocked, what is merge-ready, and what needs me?”
4. “Is this scheduled or continuously active?”
5. “Give me the evidence-backed queue and worker status.”

## Non-trigger examples

1. “Fix the blocked issue.”
2. “Create an hourly builder automation.”
3. “Merge the ready PR.”
4. “Send the status report to Slack.”
5. “Implement the next queue item.”

Expected: trigger `$jass-loop-status` for a read-only operating snapshot. Never repair, schedule,
message, merge, or otherwise mutate state.
