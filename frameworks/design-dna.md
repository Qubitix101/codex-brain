# Design DNA Framework

Frontend design is not polish. It is product strategy, trust, comprehension, and conversion.

For any user-facing product, Design DNA is a hard gate before frontend implementation.

## Why This Exists

AI can generate generic, technically correct UI quickly. Generic UI is not enough for ambitious products.

Users judge:

- trust
- taste
- clarity
- quality
- seriousness
- emotional fit

before they understand the full backend.

## Gate Placement

Design DNA happens after the product is understood and before UI code is written.

Backend, database, auth, API, and tests may proceed earlier when they do not depend on visual direction.

Frontend implementation is blocked until Design DNA is approved.

## Required Artifacts

```text
design/
├── references/
│   ├── landing/
│   ├── dashboard/
│   ├── auth/
│   ├── onboarding/
│   ├── components/
│   └── motion/
├── design-dna.md
├── tokens.json
└── prototype-notes.md
```

## Inputs

Use any combination of:

- user screenshots
- competitor screenshots
- URLs
- Paper/Figma/other design MCP artifacts
- 21st.dev component references
- design galleries
- existing brand assets
- color palettes
- product positioning

References are inspiration, not copy targets.

## Design DNA Questions

Codex should extract and ask:

- What should this product feel like?
- Is it dense and operational, or expressive and editorial?
- Is it premium, playful, technical, calm, bold, clinical, luxury, or utilitarian?
- Should the UI be light, dark, or adaptive?
- Are corners sharp, subtle, or rounded?
- Is motion minimal, subtle, immersive, or absent?
- What references does the user reject?
- What specific elements does the user like: sidebar, hero, card, button, color, motion, table, chart, nav, empty state?

## Required Decisions

Design DNA must include:

- design adjectives
- color palette
- typography direction
- spacing density
- component style
- layout principles
- page-level reference mapping
- motion rules
- accessibility baseline
- do-not-use list

## Mode Requirements

### Light

- 3-5 references
- one design direction
- basic palette
- basic typography
- approved before UI

### Standard

- references by major page type
- `design-dna.md`
- `tokens.json`
- component style rules
- responsive rules
- key screen prototype or wireframe

### Full

- competitive visual audit
- references by workflow
- full design system direction
- interaction and motion spec
- trust/security communication design
- accessibility requirements
- prototype review before frontend execution
- visual QA after every major page

## Frontend Implementation Rules

- Do not use design text in the UI that explains features unless the product UX requires it.
- Use domain-appropriate density. SaaS and operational tools should be scannable and restrained.
- Avoid generic one-hue palettes.
- Avoid decorative gradients or blobs unless the approved Design DNA calls for them.
- Verify responsive behavior.
- Verify text does not overflow.
- Verify contrast.
- Use real or generated visual assets where visual inspection matters.

## Approval

Codex may propose. The user approves.

The state file should include:

```json
{
  "design_dna": {
    "required": true,
    "status": "approved",
    "references_collected": true,
    "tokens_approved": true,
    "frontend_unblocked": true
  }
}
```

