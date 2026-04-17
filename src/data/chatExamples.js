// Chat simulator conversation scripts
// Each message: { role: 'user' | 'agent', agent?: string, text: string }

// ── Getting Started: first initialization ─────────────────────────────────────
export const initializeScript = [
  {
    role: 'user',
    text: '@Coordinator Initialize this project',
  },
  {
    role: 'agent',
    agent: 'Coordinator',
    text: "[Phase 0/8: INITIALIZATION]\nWelcome. I'll scan your codebase and build an intelligence profile. This takes a moment.",
  },
  {
    role: 'agent',
    agent: 'Codebase Explorer',
    text: "[Phase 0/8: INITIALIZATION]\nScan complete. Here's what I found:\n\nTech stack: React 18 + TypeScript + Vite\nTest framework: Vitest + React Testing Library\nStyling: Tailwind CSS 3.x\nState: Zustand (global), React Query (server state)\n\nConventions detected:\n- Functional components only\n- Custom hooks in src/hooks/\n- Named exports (not default) for components\n- Co-located tests (*.test.tsx)\n\nDoes this look correct?",
  },
  {
    role: 'user',
    text: 'Yes, looks correct. Good to go.',
  },
  {
    role: 'agent',
    agent: 'Coordinator',
    text: "Initialization complete. Intelligence profile saved to .github/context/codebase-intel.md.\n\nI'm ready for tasks. Describe what you'd like to build — or paste a Jira story link.",
  },
  {
    role: 'user',
    text: 'Build a utility function that validates email addresses and returns a structured result.',
  },
  {
    role: 'agent',
    agent: 'Coordinator',
    text: "[Phase 1/8: REQUIREMENTS]\nGot it. Routing to Story Analyst to analyze requirements.",
  },
  {
    role: 'agent',
    agent: 'Story Analyst',
    text: "[Phase 1/8: REQUIREMENTS]\nI have two quick questions:\n\n1. Should validation check only the format, or also verify the MX record (DNS lookup)?\n   Recommendation: Format-only by default. MX checks add latency and require network access.\n\n2. What should the return type look like?\n   Recommendation: { valid: boolean, reason?: string } — simple and composable.\n\nReply with your answers, or say \"go with your recommendations\".",
  },
  {
    role: 'user',
    text: 'Go with your recommendations.',
  },
  {
    role: 'agent',
    agent: 'Coordinator',
    text: "[Phase 3/8: PLANNING]\nRequirements confirmed. Architect has produced the implementation plan:\n\nFiles to CREATE:\n  src/utils/emailValidator.ts  — core validation logic\n  src/utils/emailValidator.test.ts — unit tests\n\nFiles to MODIFY:\n  src/utils/validators.ts — re-export for convenience\n\nApproach: use the validator.js library (already in package.json).\n\n[APPROVAL GATE 1] Does this plan look right? Type \"approve\" or describe changes.",
  },
  {
    role: 'user',
    text: 'Approve.',
  },
  {
    role: 'agent',
    agent: 'Coordinator',
    text: "[Phase 4/8: DEVELOPMENT]\nPlan approved. Developer is writing code now...",
  },
];

// ── Full conversation examples ─────────────────────────────────────────────────
export const chatExamples = [
  {
    id: 'simple-feature',
    title: 'Building a Simple Feature',
    description: 'A product manager asks for a login page',
    messages: [
      { role: 'user', text: 'Build a login page with email and password fields, a "Forgot Password" link, and rate limiting after 5 failed attempts.' },
      { role: 'agent', agent: 'Coordinator', text: '[Phase 1/8: REQUIREMENTS]\nGreat, I\'ll start analyzing your requirements. Handing off to Story Analyst.' },
      { role: 'agent', agent: 'Story Analyst', text: '[Phase 1/8: REQUIREMENTS]\nI have a couple of questions:\n\n1. Should the login support OAuth (Google/GitHub) or just email/password?\n   Recommendation: Start with email/password only, add OAuth later.\n\n2. What should happen after successful login — redirect to dashboard or stay on current page?\n   Recommendation: Redirect to /dashboard.' },
      { role: 'user', text: 'Go with your recommendations.' },
      { role: 'agent', agent: 'Coordinator', text: '[Phase 2/8: EXPLORATION]\nRequirements confirmed. Exploring your codebase now...' },
      { role: 'agent', agent: 'Coordinator', text: '[Phase 3/8: PLANNING]\nArchitect has created an implementation plan.\n\nFiles to create:\n- src/pages/Login.jsx\n- src/api/auth.js\n- src/middleware/rateLimit.js\n\nFiles to modify:\n- src/App.jsx (add route)\n- src/api/index.js (add auth endpoints)\n\nDo you approve this plan?' },
      { role: 'user', text: 'Looks good, approve.' },
      { role: 'agent', agent: 'Coordinator', text: '[Phase 4/8: DEVELOPMENT]\nDeveloper is writing code now...' },
    ],
  },
  {
    id: 'bug-fix',
    title: 'Fixing a Bug',
    description: 'A developer reports a broken API endpoint',
    messages: [
      { role: 'user', text: 'Fix the bug where /api/users returns 500 when the database connection times out. It should return a proper error message.' },
      { role: 'agent', agent: 'Coordinator', text: '[Phase 1/8: REQUIREMENTS]\nAnalyzing your bug report. Handing off to Story Analyst.' },
      { role: 'agent', agent: 'Story Analyst', text: "[Phase 1/8: REQUIREMENTS]\nUnderstood. I've documented:\n- Bug: /api/users returns 500 on DB timeout\n- Expected: Proper error response (e.g., 503 Service Unavailable)\n- Acceptance criteria: Returns JSON error with message and retry-after header\n\nNo questions needed. Requirements are clear." },
      { role: 'agent', agent: 'Coordinator', text: '[Phase 2/8: EXPLORATION]\nExploring your codebase to find the relevant files...' },
      { role: 'agent', agent: 'Codebase Explorer', text: '[Phase 2/8: EXPLORATION]\nFound the relevant file:\n  src/routes/users.ts — the route handler\n  src/db/connection.ts — the DB wrapper (no timeout handling present)\n\nConvention: error responses use the existing errorHandler middleware.' },
      { role: 'agent', agent: 'Coordinator', text: '[Phase 3/8: PLANNING]\nArchitect plan:\n\nMODIFY: src/routes/users.ts\n  — Wrap the DB call in a try/catch\n  — Detect connection timeout (error.code === "ETIMEDOUT")\n  — Return 503 with { error: "Service unavailable", retryAfter: 30 }\n\n[APPROVAL GATE 1] Approve this fix plan?' },
      { role: 'user', text: 'Approve.' },
      { role: 'agent', agent: 'Developer', text: '[Phase 4/8: DEVELOPMENT]\nFixed. Added try/catch in users.ts. DB timeout now returns 503 with the correct JSON body and Retry-After header.' },
      { role: 'agent', agent: 'Tester', text: '[Phase 5/8: TESTING]\nTests written:\n✓ Returns 503 when DB times out\n✓ Retry-After header is present (value: 30)\n✓ JSON body matches { error: "Service unavailable", retryAfter: 30 }\n✓ Normal requests still return 200\n\nAll 4 tests: PASSED.' },
      { role: 'agent', agent: 'Reviewer', text: '[Phase 6/8: REVIEW]\nVerdict: APPROVED\nFix is clean, tests are thorough, no security issues. The error message does not leak stack traces.' },
      { role: 'agent', agent: 'Coordinator', text: '[Phase 7/8: GIT]\nReady to commit and push.\nBranch: fix/api-users-timeout-503\nCommit: "fix: return 503 on DB connection timeout in /api/users"\n\n[APPROVAL GATE 3] Approve the push?' },
      { role: 'user', text: 'Approve.' },
      { role: 'agent', agent: 'Coordinator', text: '[Phase 8/8: COMPLETE]\nDone. Bug fixed, tests passing, code reviewed and pushed.\n\nMR: https://gitlab.com/your-org/your-project/-/merge_requests/42\nTitle: "fix: return 503 on DB connection timeout in /api/users"' },
    ],
  },
  {
    id: 'requirement-change',
    title: 'Requirement Change Mid-Task',
    description: 'You change requirements after the plan is approved',
    messages: [
      { role: 'user', text: 'Build a password reset flow — user enters email, gets a reset link, clicks it, enters new password.' },
      { role: 'agent', agent: 'Coordinator', text: '[Phase 1/8: REQUIREMENTS]\nRouting to Story Analyst.' },
      { role: 'agent', agent: 'Story Analyst', text: "[Phase 1/8: REQUIREMENTS]\nRequirements documented. Reset tokens expire in 24 hours (recommendation). Ready to proceed." },
      { role: 'agent', agent: 'Coordinator', text: '[Phase 3/8: PLANNING]\nPlan ready. 3 new files, 1 modified. Reset tokens stored in database. Approve?' },
      { role: 'user', text: 'Actually, change the token expiry to 1 hour — security requirement.' },
      { role: 'agent', agent: 'Coordinator', text: "Understood. Routing back to Story Analyst to update requirements, then Architect will revise the plan." },
      { role: 'agent', agent: 'Story Analyst', text: '[Phase 1/8: REQUIREMENTS]\nUpdated: reset tokens now expire in 1 hour. Requirements document revised.' },
      { role: 'agent', agent: 'Coordinator', text: '[Phase 3/8: PLANNING]\nRevised plan: token expiry set to 3600 seconds. No other changes needed.\n\n[APPROVAL GATE 1] Approve the revised plan?' },
      { role: 'user', text: 'Approve.' },
      { role: 'agent', agent: 'Coordinator', text: '[Phase 4/8: DEVELOPMENT]\nDeveloper writing code with 1-hour token expiry as specified.' },
    ],
  },
];

