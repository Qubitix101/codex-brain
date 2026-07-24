# Trigger Calibration

## Trigger examples

1. “Run `$jass-loop-review` on the next open builder PR.”
2. “Independently verify PR 91 against its linked Linear contract.”
3. “Review this exact head SHA and publish the Jass Loop verdict.”
4. “Check the preview, tests, and acceptance criteria before merge.”
5. “Re-review the new PR head after the requested fixes.”

## Non-trigger examples

1. “Implement the changes requested on PR 91.”
2. “Write a new Linear specification.”
3. “Merge this pull request.”
4. “Summarize all queue health.”
5. “Start a recurring reviewer every five minutes.”

Expected: trigger only for an independent, exact-SHA review. Do not implement,
merge, expand scope, or schedule recurring work.
