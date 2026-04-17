// Global rules data — the 10 rules all agents follow

export const rules = [
  {
    number: 1,
    title: 'Never Lie or Fabricate Information',
    shortDesc: 'Agents never make things up. If unsure, they say so.',
    fullDesc: 'If an agent doesn\'t know something, it says "I don\'t know." It never invents file paths, function names, API endpoints, or behaviors. Everything is verified by reading actual files.',
    example: 'Instead of guessing a function exists, the agent reads the actual file to confirm it.',
  },
  {
    number: 2,
    title: 'Always Update Context Files',
    shortDesc: 'Every piece of work is recorded in shared context files.',
    fullDesc: 'After meaningful work, each agent updates its designated context file in .github/context/. This is how agents stay synchronized and how you can track what happened.',
    example: 'After analyzing requirements, Story Analyst writes requirements.md with all findings.',
  },
  {
    number: 3,
    title: 'Respect the Phase Sequence',
    shortDesc: 'Phases run in order. No skipping ahead.',
    fullDesc: 'Requirements before planning. Planning before coding. Coding before testing. This prevents building the wrong thing, missing edge cases, or writing untestable code.',
    example: 'The Developer waits for an approved plan before writing any code.',
  },
  {
    number: 4,
    title: 'Respect Approval Gates',
    shortDesc: 'Nothing proceeds without your explicit approval.',
    fullDesc: 'At 4 key checkpoints, the workflow pauses and waits for you to review and approve. No agent can bypass a gate. You are always in control.',
    example: 'After the Architect creates a plan, you must say "approve" before coding begins.',
  },
  {
    number: 5,
    title: 'Write to Your Own Context File Only',
    shortDesc: 'Each agent has one file. No stepping on each other.',
    fullDesc: 'Story Analyst writes requirements.md, Developer writes development-log.md, etc. Agents read any context file but only write to their own. This prevents conflicts.',
    example: 'The Reviewer reads development-log.md but writes its findings to review-report.md.',
  },
  {
    number: 6,
    title: 'Read Before You Write',
    shortDesc: 'Agents check existing context before starting work.',
    fullDesc: 'Before doing anything, agents read all relevant context files from previous phases. This ensures continuity and prevents duplicate or contradictory work.',
    example: 'The Developer reads requirements.md, codebase-analysis.md, and implementation-plan.md before writing code.',
  },
  {
    number: 7,
    title: 'Ask, Don\'t Assume',
    shortDesc: 'When in doubt, agents ask you with a recommendation.',
    fullDesc: 'If an agent encounters ambiguity, it asks a clarifying question with its expert recommendation. It never silently makes assumptions that could lead the project astray.',
    example: '"Should we use JWT or session-based auth? Recommendation: JWT, because your existing API is stateless."',
  },
  {
    number: 8,
    title: 'Report Errors Immediately',
    shortDesc: 'Problems are surfaced, never hidden.',
    fullDesc: 'If an agent encounters an error, conflict, or blocker, it reports it immediately through the Coordinator. No silent failures, no ignored warnings.',
    example: 'If the Developer can\'t find a referenced module, it reports the issue instead of guessing.',
  },
  {
    number: 9,
    title: 'Communicate at Every Phase',
    shortDesc: 'You always know what\'s happening and where you are.',
    fullDesc: 'Every agent message includes the current phase indicator (e.g., [Phase 3/8: PLANNING]). Agents explain what they\'re doing and why, in plain language.',
    example: '[Phase 4/8: DEVELOPMENT] Writing the authentication middleware as specified in the plan.',
  },
  {
    number: 10,
    title: 'Quality Over Speed',
    shortDesc: 'Getting it right matters more than getting it fast.',
    fullDesc: 'Agents prioritize correctness, security, and maintainability over speed. They follow the plan, write tests, review code, and only proceed when confident in quality.',
    example: 'The Reviewer flags a security issue even though fixing it means going back to development.',
  },
];

export function getRuleByNumber(num) {
  return rules.find((r) => r.number === num);
}
