# World-Class Quality Bar

This framework defines what "good enough" means when the user asks for a product that could compete with top companies.

Passing tests is necessary. It is not sufficient.

## The Ten Quality Lenses

### 1. Product Sharpness

- The target user is specific.
- The pain is clear.
- The product promise is simple.
- The workflow maps to a real job-to-be-done.
- The product avoids feature soup.

### 2. Strategic Differentiation

- The product has a reason to exist beyond "AI wrapper" or "better UI."
- The wedge is defensible.
- The system explains why users switch.
- The product has a path to compounding advantage.

### 3. Technical Architecture

- The architecture fits the ambition.
- Key choices have rationale.
- Components are separable.
- The system can evolve without rewrite.
- Complexity is intentional.

### 3.5 Intelligence System Shape

- AI-core products are not reduced to prompt boxes unless that is the right maturity level.
- The first closed intelligence loop is explicit.
- Memory, sensing, routines, approvals, evals, and learning are designed when relevant.
- Autonomy is bounded by permissions, rollback, and quality gates.

### 3.6 Agent Engineering and Skill System

- Production agents have explicit system design, tool contracts, retrieval design, reliability controls, security/safety boundaries, evals/observability, and product trust UX.
- Multi-model systems have a routing policy with fallbacks, cost/latency expectations, and data-sensitivity boundaries.
- Procedural knowledge is captured as reviewed skill candidates, not left in chat.
- Skills have trust levels, evals, approval requirements, and install/promotion rules.

### 4. Data and Scale

- The database choice matches access patterns.
- Data ownership is explicit.
- Tenant boundaries are explicit where relevant.
- Hot paths are known.
- Scaling pressure has an answer.

### 5. Security and Trust

- Auth and authorization are clear.
- Sensitive data is protected.
- Logs do not leak secrets.
- Abuse paths are considered.
- Trust signals exist for users.

### 6. Privacy and Compliance

- Personal data is inventoried.
- GDPR obligations are considered when relevant.
- Deletion/export/retention are not afterthoughts.
- Third-party processors are known.

### 7. Frontend Experience

- Design DNA is approved before UI build.
- The product looks specific, not generated.
- The layout supports the user's workflow.
- The UI is responsive.
- Accessibility is built in.
- Motion supports comprehension rather than decoration.

### 8. Reliability and Operations

- Errors are observable.
- Critical flows have monitoring.
- Deployments can roll back.
- Health checks exist.
- Incident response is defined for serious products.

### 9. Business Mechanics

- Pricing and packaging are considered when relevant.
- Billing edge cases are defined.
- Upgrade/downgrade/cancel/refund flows are not vague.
- Unit economics are not ignored for commercial products.

### 10. Learning and Evolution

- The project captures lessons.
- Lessons become future gates.
- Post-launch feedback creates PRDs.
- The brain improves after every project.

## Top-Tier Gate

For Full mode, Codex should ask:

- Would a serious investor believe the plan?
- Would a senior engineer trust the architecture?
- Would the agentic maturity level match the real user job?
- Would a security reviewer know where to look?
- Would a designer see a real aesthetic direction?
- Would an enterprise buyer understand trust and compliance?
- Would an agent engineer trust the tool contracts, retrieval, reliability, evals, traces, and skill trust levels?
- Would a future team be able to maintain this?
- Would the product survive 10x more users?

If the answer is no, the gap must be documented before execution.

## Anti-Patterns

- "Let's just build and fix later."
- "We can add GDPR at the end."
- "The database is obvious."
- "Design can be polished later."
- "Security is just middleware."
- "The AI will figure it out."
- "Users will understand once they try it."

These sentences usually mean the brain is being bypassed.
