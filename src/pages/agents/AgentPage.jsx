import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from '@phosphor-icons/react';
import { agents } from '../../data/agents';

// ── Per-agent rich content ────────────────────────────────────────────────────
const AGENT_CONTENT = {
  coordinator: {
    analogy: 'Like a project manager who runs your standup, assigns work, chases blockers, and gives you a single daily summary — you never have to talk to each team member separately.',
    inputs: ['Your task description (text, Jira link, or both)', 'Your approval/rejection at each gate', 'Error reports from subagents'],
    outputs: ['Phase-by-phase progress updates', 'Approval gate prompts with what to review', 'Final task summary with all deliverables'],
    sampleOutput: `[Phase 3/8: PLANNING] ✓ Complete

Architect has produced the implementation plan. Here's a summary:

Files to CREATE (3):
  src/auth/jwtService.ts      — JWT generation and validation
  src/auth/refreshService.ts  — Refresh token rotation logic
  src/middleware/authGuard.ts — Route protection middleware

Files to MODIFY (2):
  src/routes/index.ts         — Add protected routes
  src/app.ts                  — Register auth middleware

[APPROVAL GATE 1] Does this plan look right?
Type "approve" to proceed to development, or describe changes.`,
    tips: [
      "Always use the phase indicator [Phase X/8] to know exactly where you are.",
      "Say \"What's the status?\" at any time for a full progress report.",
      "Say \"Go with your recommendations\" to fast-track Q&A sessions.",
      "If you close VS Code mid-task, the Coordinator picks up where it left off — just say \"Where did we leave off?\"",
    ],
    edgeCases: [
      { scenario: 'You ask a vague question mid-task', response: 'Coordinator answers without disrupting the pipeline, then continues from the current phase.' },
      { scenario: 'A subagent fails or gets stuck', response: 'Coordinator reports the error to you, offers options (retry, skip, change approach), never silently fails.' },
      { scenario: 'You want to change requirements mid-development', response: 'Coordinator routes back to Story Analyst for impact analysis, then Architect for plan revision — you approve the revision before development continues.' },
    ],
  },
  'story-analyst': {
    analogy: 'Like a business analyst who joins your call, asks the right questions, writes the spec in clean English, and hands a structured brief to the engineering team — so no one codes the wrong thing.',
    inputs: ['Jira story URL (via MCP)', 'Plain-text task description', 'Any extra context you provide'],
    outputs: ['Structured requirements with acceptance criteria', 'Identified edge cases and constraints', 'Clarifying questions with expert recommendations'],
    sampleOutput: `# Requirements: Email Validation Utility
Phase 1/8: REQUIREMENTS

## Functional Requirements
1. Validate email format against RFC 5322 pattern
2. Return structured result: { valid: boolean, reason?: string }

## Acceptance Criteria
- validateEmail("user@domain.com") → { valid: true }
- validateEmail("notanemail") → { valid: false, reason: "invalid format" }
- validateEmail("") → { valid: false, reason: "empty input" }

## Questions (with recommendations)
1. Should MX validation be on by default?
   Rec: No — adds latency, opt-in only.`,
    tips: [
      "The more specific your task description, the fewer questions you'll be asked.",
      "Mention edge cases upfront: \"Also handle empty input and SQL injection attempts.\"",
      "Provide acceptance criteria: \"It should return 400 for invalid email\" saves back-and-forth.",
      "Say \"Go with your recommendations\" to accept all suggestions at once.",
    ],
    edgeCases: [
      { scenario: 'Jira story is vague', response: "Asks targeted questions with recommendations — you answer or say \"go with recommendations.\"" },
      { scenario: 'Requirements conflict', response: 'Flags the conflict explicitly and asks you to resolve it before proceeding.' },
      { scenario: 'You change your mind mid-requirements', response: 'Updates the requirements document and confirms the change before moving on.' },
    ],
  },
  'codebase-explorer': {
    analogy: "Like a new senior developer spending their first day reading every file in the project — understanding the conventions, patterns, and architecture — so they never write code that doesn't fit.",
    inputs: ["Your project's source files", 'Existing patterns and conventions', 'Tech stack and dependencies'],
    outputs: ['Comprehensive codebase profile', 'Identified patterns to follow', 'Relevant existing code to reference'],
    sampleOutput: `# Codebase Intelligence Report
Phase 2/8: EXPLORATION

## Tech Stack
- Framework: React 18 + TypeScript
- Build: Vite 4.x
- Styling: Tailwind CSS 3.x
- Testing: Vitest + React Testing Library

## Conventions Detected
- Functional components only (no class components)
- Custom hooks for business logic (src/hooks/)
- Named exports (not default exports)
- Co-located tests (*.test.tsx beside the component)

## Relevant Files for This Task
- src/utils/validators.ts  — Existing validation utilities
- src/hooks/useForm.ts     — Uses validation in form handling`,
    tips: [
      'The codebase-intel.md file persists across tasks — once explored, the agent does not re-scan unless the project changes significantly.',
      'You can read the file directly: .github/context/codebase-intel.md',
      'If the scan missed something important, tell the Coordinator: "Also note that we use [X] pattern for [Y]."',
    ],
    edgeCases: [
      { scenario: 'Large monorepo', response: 'Focuses on the relevant module/package based on the task scope.' },
      { scenario: 'No established conventions', response: 'Notes the absence and proposes sensible defaults based on the tech stack.' },
      { scenario: 'Conflicting patterns found', response: 'Documents both patterns and flags it — Architect decides which to follow.' },
    ],
  },
  researcher: {
    analogy: 'Like a research assistant who, when anyone on the team hits a wall, goes and finds the answer from official docs, Stack Overflow, CVE databases, and changelogs — then hands back a verified, sourced answer that matches your exact tech stack.',
    inputs: ['A specific question from any agent (error, comparison, API docs, etc.)', 'Our tech stack context from codebase-intel.md', 'Existing research from research-findings.md (cache check)'],
    outputs: ['Sourced findings with reliability ratings (🟢🟡🟠🔴)', 'Comparison tables for technology choices', 'Security vulnerability alerts (flagged immediately)'],
    sampleOutput: `RESEARCH: Node.js 18 fetch not available in Jest
REQUESTED BY: Developer
DEPTH: QUICK
TYPE: Error Resolution

## Summary
Node.js 18's native fetch is not available in the Jest test
environment by default. You need to polyfill with whatwg-fetch
or configure Jest globals.

## Finding
- Source: https://jestjs.io/docs/configuration#globals
- Date: 2026
- Reliability: 🟢 OFFICIAL
- Fix: Add to jest.config: globals: { fetch: global.fetch }
  or install whatwg-fetch as a dev dependency.

## Sources
1. jestjs.io/docs/configuration — 🟢 OFFICIAL`,
    tips: [
      'The Researcher uses 3 depth levels: QUICK (1-2 searches), MODERATE (3-5), DEEP (5-10). Most requests are QUICK.',
      'Every finding comes with a source URL and reliability rating — nothing is unsourced.',
      'It checks existing research first, so the same question won\'t be researched twice with different answers.',
      'Security findings skip the normal queue and go straight to you as CRITICAL alerts.',
    ],
    edgeCases: [
      { scenario: 'No reliable answer found', response: 'Honestly reports: "Could not find a reliable answer after N searches. Queries tried: [list]. Suggest: [alternative]."' },
      { scenario: 'Sources contradict each other', response: 'Presents both sides with evidence and reliability ratings. Flags as RESOLVED, UNRESOLVED, or EVOLVING.' },
      { scenario: 'Found solution is for wrong version', response: 'Flags the mismatch: "⚠️ This is for v3, we use v4" and continues searching for a version-matched answer.' },
    ],
  },
  architect: {
    analogy: 'Like a senior engineer whiteboarding the entire solution before anyone writes a single line of code — every file, every interface, every dependency mapped out so the Developer just executes the plan.',
    inputs: ['requirements.md from Story Analyst', 'codebase-intel.md from Codebase Explorer', 'Your preferences if provided'],
    outputs: ['File-by-file implementation plan', 'Design pattern selection with rationale', 'Risk flags and recommendations'],
    sampleOutput: `# Implementation Plan
Phase 3/8: PLANNING

## Approach
Extend the existing validation utilities (src/utils/validators.ts).
Follow the existing pattern: pure functions, TypeScript, co-located tests.

## Files

### CREATE: src/utils/emailValidator.ts
Exports: validateEmail(email: string): ValidationResult
Pattern: Follow existing src/utils/urlValidator.ts structure

### CREATE: src/utils/emailValidator.test.ts
Coverage: format validation, edge cases, error messages

### MODIFY: src/utils/validators.ts
Change: Re-export validateEmail for convenience
Impact: Non-breaking, additive change

## Risks
- RFC 5322 regex complexity → use validator.js (already in package.json)`,
    tips: [
      'Provide architecture preferences upfront: "Use repository pattern" or "Follow hexagonal architecture."',
      'Reference specific files: "Follow the pattern in src/services/userService.ts."',
      'Ask for alternatives: "Show me two approaches before deciding."',
      'If the plan looks wrong, say specifically what to change: "Use a class instead of functions."',
    ],
    edgeCases: [
      { scenario: 'Multiple valid approaches exist', response: 'Presents options with trade-offs and makes a recommendation — you choose.' },
      { scenario: 'Requirements conflict with existing architecture', response: 'Flags the conflict and proposes the least-invasive resolution.' },
      { scenario: 'Plan would be very large', response: 'Suggests breaking the task into phases and completing one at a time.' },
    ],
  },
  developer: {
    analogy: 'Like a developer pair-programming with the implementation plan open — every file they create matches the plan, every pattern they use matches your codebase, every decision was already approved.',
    inputs: ['implementation-plan.md from Architect', 'codebase-intel.md conventions', 'requirements.md acceptance criteria'],
    outputs: ['Production-ready code in all specified files', 'Development log with decisions made', 'Notes on anything that deviated from the plan'],
    sampleOutput: `# Development Log
Phase 4/8: DEVELOPMENT

## Files Created

### src/utils/emailValidator.ts ✓
Implemented validateEmail() using validator.js as planned.
Added TypeScript interface ValidationResult for strong typing.
Handles: empty string, null/undefined, unicode, subaddressing.

### src/utils/emailValidator.test.ts ✓
32 test cases written covering:
- Valid RFC 5322 addresses
- Invalid format cases (all acceptance criteria)
- Edge cases: emoji domains, trailing dots, consecutive dots

## Deviations from Plan
None — plan was complete and unambiguous.`,
    tips: [
      'Reference existing files in your task: "Follow the pattern in src/services/userService.ts" — Developer will match it exactly.',
      "The Developer waits for an approved plan. Reject the plan with feedback and the code changes accordingly.",
      "Don't ask the Developer to also refactor X mid-task — open a new task for refactoring.",
    ],
    edgeCases: [
      { scenario: "A referenced pattern doesn't exist", response: 'Reports it to the Coordinator — does not guess or invent.' },
      { scenario: 'A dependency is missing from package.json', response: 'Notes it in the development log — does not npm install without a plan.' },
      { scenario: 'Plan is ambiguous about a specific detail', response: 'Uses the safest interpretation and logs the decision for Reviewer to check.' },
    ],
  },
  tester: {
    analogy: 'Like a QA engineer who reads every acceptance criterion and writes a test for each one — plus a test for every edge case mentioned in requirements, plus a security probe for any sensitive operation.',
    inputs: ['requirements.md acceptance criteria', 'development-log.md of what was built', 'codebase-intel.md for test framework conventions'],
    outputs: ['Unit tests for all new code', 'Integration tests where needed', 'Test results summary with coverage'],
    sampleOutput: `# Test Results
Phase 5/8: TESTING

## Tests Written: 32

### Unit Tests (28)
✓ validateEmail("user@domain.com") → valid
✓ validateEmail("") → invalid, "empty input"
✓ validateEmail("notanemail") → invalid, "invalid format"
✓ validateEmail("user+tag@domain.com") → valid (subaddressing)

### Edge Case Tests (4)
✓ Null input handled without throwing
✓ Undefined input handled without throwing
✓ Very long email (512 chars) handled
✓ SQL injection attempt → invalid

## Coverage: 98.4% (lines), 100% (branches)
## All 32 tests: PASSED`,
    tips: [
      'Specify test scenarios upfront: "Make sure to test empty input, null, and SQL injection attempts."',
      'Describe the user journey in your task — Tester writes tests from the user perspective.',
      'Ask for specific test types: "Include integration tests, not just unit tests."',
    ],
    edgeCases: [
      { scenario: 'No test framework detected', response: 'Flags it and asks which framework to use before writing tests.' },
      { scenario: 'A test fails', response: 'Reports the failure to the Coordinator — the Reviewer will decide if it is a blocker.' },
      { scenario: 'Acceptance criteria are ambiguous', response: 'Tests the most conservative interpretation and notes the ambiguity.' },
    ],
  },
  reviewer: {
    analogy: 'Like a senior developer doing a thorough pull request review — checking not just "does it work" but "is it correct, secure, maintainable, and does it match what was asked for."',
    inputs: ['development-log.md', 'test-results.md', 'requirements.md', 'implementation-plan.md'],
    outputs: ['Code review verdict: APPROVED or CHANGES REQUESTED', 'Specific issues with severity and fix suggestions', 'Security findings if any'],
    sampleOutput: `# Code Review Report
Phase 6/8: REVIEW

## Verdict: APPROVED ✓

## Summary
Implementation matches the plan and requirements exactly.
Tests are comprehensive (98.4% coverage, all passing).
No security issues found.

## Observations (Non-blocking)
1. [STYLE] emailValidator.ts line 34: extract the regex
   to a named constant for readability.
   Severity: LOW — does not block approval.

## Security Check
- Input sanitization: ✓
- Injection vulnerabilities: ✓ (validator.js handles safely)
- Error message leakage: ✓ (no stack traces in output)`,
    tips: [
      'Mention security requirements in your task — Reviewer gives extra scrutiny.',
      'If Reviewer flags issues, say "Fix all issues" or "Fix only the HIGH severity ones" to be selective.',
      'You can ask: "Why did you flag issue #2?" for explanation before deciding.',
    ],
    edgeCases: [
      { scenario: 'Critical security issue found', response: 'Blocks approval and sends back to Developer with detailed fix instructions. Never allows insecure code through.' },
      { scenario: 'Minor style issues only', response: 'Notes them as non-blocking and still approves — you can fix them in a follow-up.' },
      { scenario: "Code doesn't match requirements", response: "Blocks approval, documents exactly what's missing, sends back to Developer." },
    ],
  },
  'git-manager': {
    analogy: 'Like a release engineer who creates the branch, writes descriptive commits, pushes cleanly, and opens a well-documented Merge Request — so the human reviewer has all the context they need.',
    inputs: ['development-log.md', 'requirements.md', 'review-report.md', 'Your push/MR approval'],
    outputs: ['Feature branch with clean commits', 'Pushed code on remote', 'GitLab Merge Request with full description'],
    sampleOutput: `# Git Operations Log
Phase 7/8: GIT PUSH

## Branch Created
feature/add-email-validation-utility

## Commits (3)
a1b2c3d feat: add validateEmail utility function
d4e5f6g test: add comprehensive tests for validateEmail
g7h8i9j chore: re-export validateEmail from validators index

## Push Status: ✓ Pushed to origin/feature/add-email-validation-utility

[APPROVAL GATE 3] Approve push? Type "approve" to create MR.`,
    tips: [
      'Specify commit granularity preferences: "I want one commit per file" or "Squash into one commit."',
      'Say "skip git" at any point to handle version control yourself.',
      'The Git Manager uses glab CLI — make sure it is configured if you want this phase.',
    ],
    edgeCases: [
      { scenario: 'Branch already exists', response: 'Reports it and asks whether to push to existing branch or create a new one.' },
      { scenario: 'Push is rejected (e.g., protected branch)', response: 'Reports the rejection and asks for the correct target branch.' },
      { scenario: 'You say "skip git"', response: 'Writes a summary of what to commit and push, so you can do it yourself.' },
    ],
  },
};

export default function AgentPage() {
  const { agentId } = useParams();
  const agent = agents.find((a) => a.id === agentId);
  const agentIndex = agents.findIndex((a) => a.id === agentId);
  const prevAgent = agentIndex > 0 ? agents[agentIndex - 1] : null;
  const nextAgent = agentIndex < agents.length - 1 ? agents[agentIndex + 1] : null;
  const content = AGENT_CONTENT[agentId];

  if (!agent) {
    return (
      <div className="py-10">
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Agent not found
        </h1>
        <p style={{ color: 'var(--color-secondary)' }}>No agent found with ID "{agentId}".</p>
        <Link to="/agents" className="mt-4 inline-block text-sm" style={{ color: 'var(--color-accent)' }}>
          ← Back to all agents
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-[48rem]">
      {/* Breadcrumb */}
      <Link to="/agents" className="inline-flex items-center gap-1.5 text-xs no-underline mb-8"
            style={{ color: 'var(--color-tertiary)' }}>
        <ArrowLeft size={12} weight="bold" />
        All agents
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold flex-shrink-0"
          style={{ background: `${agent.color}18`, color: agent.color, fontFamily: 'var(--font-mono)' }}
        >
          {String(agentIndex + 1).padStart(2, '0')}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-2 h-2 rounded-full" style={{ background: agent.color }} />
            <p className="text-xs font-semibold uppercase tracking-wider"
               style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
              {agent.role} &nbsp;·&nbsp; {agent.phase}
            </p>
          </div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
            {agent.name}
          </h1>
        </div>
      </div>

      <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--color-secondary)' }}>
        {agent.fullDesc}
      </p>

      {/* Analogy */}
      {content?.analogy && (
        <div className="rounded-lg px-5 py-4 mb-10"
             style={{ background: `${agent.color}0D`, border: `1px solid ${agent.color}30` }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-2"
             style={{ color: agent.color, fontFamily: 'var(--font-mono)' }}>
            In plain English
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
            {content.analogy}
          </p>
        </div>
      )}

      {/* Capabilities */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Capabilities
        </h2>
        <div className="space-y-2.5">
          {agent.capabilities.map((cap, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle size={16} weight="fill" className="flex-shrink-0 mt-0.5"
                           style={{ color: agent.color }} />
              <span className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
                {cap}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Input / Output */}
      {content && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Input → Output
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg p-5"
                 style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3"
                 style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
                What goes in
              </p>
              <ul className="space-y-2">
                {content.inputs.map((inp, i) => (
                  <li key={i} className="text-sm leading-relaxed flex items-start gap-2"
                      style={{ color: 'var(--color-secondary)' }}>
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: 'var(--color-tertiary)' }} />
                    {inp}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg p-5"
                 style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3"
                 style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
                What comes out
              </p>
              <ul className="space-y-2">
                {content.outputs.map((out, i) => (
                  <li key={i} className="text-sm leading-relaxed flex items-start gap-2"
                      style={{ color: 'var(--color-secondary)' }}>
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: agent.color }} />
                    {out}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Context file */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Context file
        </h2>
        <div className="rounded-lg p-4 flex items-center gap-4"
             style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
          <div className="text-xs font-semibold px-2 py-1 rounded flex-shrink-0"
               style={{ background: `${agent.color}18`, color: agent.color, fontFamily: 'var(--font-mono)' }}>
            writes
          </div>
          <code className="text-sm" style={{ color: 'var(--color-primary)' }}>
            .github/context/{agent.contextFile}
          </code>
        </div>
      </section>

      {/* Sample output */}
      {content?.sampleOutput && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            What you'll see
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--color-secondary)' }}>
            A real example of {agent.name}'s output format.
          </p>
          <pre
            className="text-xs leading-relaxed overflow-x-auto rounded-lg p-5"
            style={{
              background: 'var(--color-layer-1)',
              border: '1px solid var(--color-border)',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-secondary)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {content.sampleOutput}
          </pre>
        </section>
      )}

      {/* Edge cases */}
      {content?.edgeCases && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Edge cases
          </h2>
          <div className="space-y-3">
            {content.edgeCases.map((ec, i) => (
              <div key={i} className="rounded-lg p-4"
                   style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1"
                       style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
                      Scenario
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-primary)' }}>{ec.scenario}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1"
                       style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
                      What happens
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>{ec.response}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tips */}
      {content?.tips && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Tips for best results
          </h2>
          <div className="space-y-2.5">
            {content.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg px-4 py-3"
                   style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
                <span className="text-xs font-bold flex-shrink-0 mt-0.5"
                      style={{ color: agent.color, fontFamily: 'var(--font-mono)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>{tip}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Prev / Next navigation */}
      <div className="pt-8" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="flex items-center justify-between gap-4">
          {prevAgent ? (
            <Link to={prevAgent.path} className="group flex items-center gap-2 no-underline">
              <ArrowLeft size={14} weight="bold" style={{ color: 'var(--color-tertiary)' }} />
              <div>
                <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Previous</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                  {prevAgent.name}
                </p>
              </div>
            </Link>
          ) : <div />}
          {nextAgent ? (
            <Link to={nextAgent.path} className="group flex items-center gap-2 text-right no-underline ml-auto">
              <div>
                <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Next</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                  {nextAgent.name}
                </p>
              </div>
              <ArrowRight size={14} weight="bold" style={{ color: 'var(--color-tertiary)' }} />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

