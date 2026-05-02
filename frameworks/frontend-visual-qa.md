# Frontend Visual QA Framework

Design DNA defines the target. Visual QA verifies that implementation actually reached it.

This framework is mandatory for Standard and Full user-facing products after major UI screens are built.

## Visual QA Inputs

- `design/design-dna.md`
- `design/tokens.json`
- `design/references/`
- screenshots of implemented UI
- browser verification results
- accessibility checks

## Review Dimensions

### 1. Design DNA Match

- Does the implemented screen match the approved mood?
- Does it use the approved palette?
- Does it use approved type direction?
- Does density match the intended product?
- Does it avoid rejected styles?

### 2. Layout Quality

- Is hierarchy clear?
- Is spacing consistent?
- Is the viewport used intelligently?
- Are cards used only where appropriate?
- Does the layout feel native to the product category?
- Does it avoid generic AI layout patterns?

### 3. Component Quality

- Buttons have clear affordance.
- Inputs have labels and states.
- Tables/lists are scannable.
- Modals are focused.
- Empty states are useful.
- Error states are calm and actionable.

### 4. Responsiveness

Check:

- mobile
- tablet
- desktop
- wide desktop where relevant

No text overlap. No clipped controls. No layout jumps that break comprehension.

### 5. Accessibility

Check:

- contrast
- keyboard focus
- semantic structure
- labels
- touch targets
- reduced motion

### 6. Motion and Interaction

- Motion supports comprehension.
- Motion does not create distraction.
- Hover/focus/pressed states exist.
- Loading states are clear.
- Animations respect reduced motion.

### 7. Trust and Perceived Quality

Ask:

- Would a serious user trust this product?
- Would an enterprise buyer feel confidence?
- Would a competitor recognize the quality bar?
- Does it look specific or generated?

## Visual QA Output

Produce:

```text
reviews/visual-qa-[screen].md
```

With:

- screenshots reviewed
- pass/fail by dimension
- P0/P1/P2/P3 findings
- required fixes
- final approval status

## P0 Blockers

- core flow unusable on mobile
- unreadable text
- inaccessible core action
- visual direction contradicts approved Design DNA
- layout overlap or clipping in primary viewport

## P1 Blockers

- weak hierarchy
- inconsistent components
- poor empty/error states
- missing responsive polish
- motion that distracts
- visual quality below product ambition

