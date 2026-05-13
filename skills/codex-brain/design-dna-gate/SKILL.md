---
name: design-dna-gate
description: Use before frontend implementation to define product-specific visual direction, references, UI density, components, tokens, motion, accessibility, and do-not-use rules.
version: 0.1.0
---

# Design DNA Gate

Create the visual and interaction contract before building UI. Use this skill to prevent generic frontend output and align design with the product's audience, trust model, and workflow.

## When to Use

- A user-facing product, dashboard, landing page, onboarding flow, or app shell is about to be designed or implemented.
- The user shares screenshots, URLs, brands, competitors, palettes, or visual preferences.
- A project needs page-level reference mapping, tokens, component rules, or visual QA criteria.
- Frontend work is blocked until aesthetic direction is approved.

## Do Not Use

- The task is backend-only and has no user-facing surface.
- The design direction is already approved and the current task only implements it.
- The user explicitly asks for a quick internal throwaway UI.

## Core Workflow

1. **Classify the product surface.** SaaS, CRM, creator tool, operational dashboard, consumer app, marketplace, game, editorial site, admin, or landing page.
2. **Gather references.** Use screenshots, URLs, competitor patterns, existing brand assets, palettes, and rejected examples.
3. **Extract taste signals.** Identify density, mood, shape, typography, spacing, navigation, motion, color, empty states, and trust cues.
4. **Decide design principles.** Define what the product should feel like and what it must not become.
5. **Create tokens.** Produce palette, typography, spacing, radius, shadows, borders, and motion direction.
6. **Map pages to references.** Say which reference informs each major page or component, without copying.
7. **Set implementation rules.** Include responsive behavior, accessibility baseline, text overflow rules, visual assets, and verification.
8. **Require approval.** Do not proceed to serious frontend implementation until the direction is accepted or deliberately waived.

## Required Decisions

- design adjectives
- audience and trust posture
- color palette
- typography direction
- spacing density
- component style
- layout principles
- page-level reference mapping
- motion rules
- accessibility baseline
- visual asset policy
- do-not-use list
- visual QA checks

## Output Contract

Return a Design DNA brief with:

- target feeling
- reference inventory
- liked and rejected patterns
- tokens
- component rules
- layout rules
- motion rules
- accessibility requirements
- page-specific guidance
- anti-patterns
- implementation unblock status

## Quality Bar

- Avoid one-hue generic palettes unless the brand explicitly requires it.
- Avoid decorative blobs, vague gradients, and marketing-style cards for operational products.
- Do not put cards inside cards.
- Match type scale to container size.
- Verify text does not overflow.
- Use real or generated visual assets when the product needs inspection or emotional signal.
- Design for the domain, not for a generic template.

## Examples

### Example: Enterprise Dashboard

```text
Direction: quiet, dense, scannable, high-trust.
Avoid: oversized hero sections, decorative illustration cards, broad gradients.
Require: clear sidebar, compact tables, status chips, audit/history surfaces, restrained palette.
```

### Example: Creator Media Tool

```text
Direction: expressive workspace with strong previews.
Require: asset browser, canvas, timeline or queue, clear generation states, cost visibility, approval before publishing.
```

## Trust Level

T1 - Instructions only. This skill defines design direction and does not edit code or assets by itself.
