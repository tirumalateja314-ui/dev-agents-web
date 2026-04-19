import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Robot,
  ListChecks,
  GitBranch,
  FileText,
  Eye,
  TreeStructure,
  MagnifyingGlass,
  Terminal,
  Warning,
  Lightning,
} from '@phosphor-icons/react';

// ── Script data ───────────────────────────────────────────────────────────────
const SCRIPTS = [
  {
    id: 'convention-scanner',
    name: 'convention-scanner.js',
    title: 'Convention Scanner',
    icon: TreeStructure,
    color: 'var(--color-agent-explorer)',
    usedBy: 'Codebase Explorer',
    usedByPath: '/agents/codebase-explorer',
    purpose: 'Auto-detects project conventions by scanning source files, configs, and git history. Outputs structured JSON covering language, naming patterns, test framework, imports, error handling, and git commit style.',
    trigger: 'After initial codebase scan (CE1)',
    outputs: ['Language and framework detection', 'Naming convention patterns (camelCase, snake_case, etc.)', 'Test framework and patterns', 'Git commit format and branch naming', 'Import style conventions'],
    flags: ['--focus <section>', '--output <path>'],
    example: 'node .github/scripts/convention-scanner.js --output .github/context/conventions.json',
  },
  {
    id: 'pre-impl-check',
    name: 'pre-impl-check.js',
    title: 'Pre-Implementation Check',
    icon: ShieldCheck,
    color: 'var(--color-agent-developer)',
    usedBy: 'Developer',
    usedByPath: '/agents/developer',
    purpose: 'Pre-flight check before coding starts. Verifies the plan is approved, all referenced files exist, scope is compliant, and dependencies are available. Prevents building on wrong assumptions.',
    trigger: 'Before starting code (D1)',
    outputs: ['Plan approval status', 'Missing file detection', 'Scope compliance check', 'Dependency verification', 'Ready/not-ready verdict with blockers'],
    flags: [],
    example: 'node .github/scripts/pre-impl-check.js',
  },
  {
    id: 'requirements-tracker',
    name: 'requirements-tracker.js',
    title: 'Requirements Tracker',
    icon: ListChecks,
    color: 'var(--color-agent-tester)',
    usedBy: 'Tester & Reviewer',
    usedByPath: '/agents/tester',
    purpose: 'Builds a traceability matrix linking acceptance criteria to tests, code changes, and plan steps. Identifies gaps in test coverage and plan compliance.',
    trigger: 'Before writing tests (T1), during review (R12)',
    outputs: ['AC-to-test mapping', 'Coverage gaps', 'Orphan test detection', 'Plan compliance status', 'Traceability matrix'],
    flags: [],
    example: 'node .github/scripts/requirements-tracker.js',
  },
  {
    id: 'git-safety-check',
    name: 'git-safety-check.js',
    title: 'Git Safety Check',
    icon: GitBranch,
    color: 'var(--color-agent-git)',
    usedBy: 'Git Manager',
    usedByPath: '/agents/git-manager',
    purpose: 'Automates the 20+ step manual git safety procedure. Checks repo state, uncommitted changes, remote status, merge conflicts, and detached HEAD. Returns a safe/unsafe verdict.',
    trigger: 'Before any git operations (G1)',
    outputs: ['Safe/unsafe verdict', 'Uncommitted change categorization', 'Remote ahead/behind status', 'Edge case detection (detached HEAD, conflicts)', 'Rollback information'],
    flags: [],
    example: 'node .github/scripts/git-safety-check.js',
  },
  {
    id: 'briefing-gen',
    name: 'briefing-gen.js',
    title: 'Briefing Generator',
    icon: FileText,
    color: 'var(--color-agent-coordinator)',
    usedBy: 'Coordinator',
    usedByPath: '/agents/coordinator',
    purpose: 'Generates pre-formatted delegation briefings tailored to each agent type. Reads all context files and assembles a concise summary filtered by agent needs and current phase.',
    trigger: 'Before delegating to any subagent (C-CONTEXT-2)',
    outputs: ['Agent-specific briefing JSON', 'What/Why/Context sections', 'Profile-filtered content', 'Iteration tracking'],
    flags: ['--agent <name>', '--phase <N>'],
    example: 'node .github/scripts/briefing-gen.js --agent developer --phase 4',
  },
  {
    id: 'review-prep',
    name: 'review-prep.js',
    title: 'Review Prep',
    icon: Eye,
    color: 'var(--color-agent-reviewer)',
    usedBy: 'Reviewer',
    usedByPath: '/agents/reviewer',
    purpose: 'Pre-scans changed files for security vulnerabilities (OWASP patterns), performance anti-patterns, convention violations, plan compliance, and test quality before the full review.',
    trigger: 'Before starting review (R5)',
    outputs: ['Security scan (8 languages, SQL injection, XSS, SSRF, etc.)', 'Performance scan (N+1, unbounded queries)', 'Convention violations', 'Plan compliance gaps', 'Test quality assessment'],
    flags: [],
    example: 'node .github/scripts/review-prep.js',
  },
  {
    id: 'codebase-diff',
    name: 'codebase-diff.js',
    title: 'Codebase Diff',
    icon: MagnifyingGlass,
    color: 'var(--color-agent-explorer)',
    usedBy: 'Codebase Explorer',
    usedByPath: '/agents/codebase-explorer',
    purpose: 'Detects what changed since the last codebase scan so the Explorer only re-scans affected areas. Maps file changes to documentation sections and recommends partial or full refresh.',
    trigger: 'Before re-scanning (CE6)',
    outputs: ['Changed files since last scan', 'Section mapping (Tech Stack, CI/CD, Testing, etc.)', 'Refresh recommendation (skip/partial/full)'],
    flags: [],
    example: 'node .github/scripts/codebase-diff.js',
  },
  {
    id: 'research-cache',
    name: 'research-cache.js',
    title: 'Research Cache',
    icon: MagnifyingGlass,
    color: 'var(--color-agent-researcher)',
    usedBy: 'Researcher',
    usedByPath: '/agents/researcher',
    purpose: 'Checks existing research before starting new searches. Parses research-findings.md, uses fuzzy keyword matching with relevance scoring, and extracts the current tech stack for context.',
    trigger: 'Before any research task',
    outputs: ['Matching cached entries with relevance scores', 'Tech stack context', 'Recommendation (use cache or research fresh)'],
    flags: ['--topic <query>'],
    example: 'node .github/scripts/research-cache.js --topic "Redis session storage"',
  },
];

// ── Enhancement data ──────────────────────────────────────────────────────────
const ENHANCEMENTS = [
  {
    name: 'progress',
    target: 'context-tool.js',
    desc: 'Shows phase-by-phase task status with time elapsed, blockers, decisions, and research count. Used by the Coordinator to show where you left off when resuming.',
    command: 'node .github/scripts/context-tool.js progress',
  },
  {
    name: 'validate (hash tracking)',
    target: 'context-tool.js',
    desc: 'Tracks content hashes of context files across checkpoints. The validate command now compares current hashes against the previous checkpoint to detect unexpected file modifications.',
    command: 'node .github/scripts/context-tool.js validate',
  },
  {
    name: 'init (profile enforcement)',
    target: 'context-tool.js',
    desc: 'Enforces context profile file limits. Minimal creates only 3 files, standard/full creates 9, extended creates 9 plus an architecture-decisions/ folder. Unknown profiles default to standard with a warning.',
    command: 'node .github/scripts/context-tool.js init <name> --profile <profile>',
  },
];

export default function AutomationScripts() {
  return (
    <div className="py-10 max-w-[48rem]">
      {/* Header */}
      <div className="mb-10">
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
        >
          How It Works
        </p>
        <h1
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}
        >
          Automation scripts
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Eight specialized scripts that agents run automatically at key points in the workflow.
          They handle convention scanning, safety checks, requirements tracking, code review prep,
          and more — giving each agent structured data to work with instead of relying on ad-hoc analysis.
        </p>
      </div>

      {/* Overview callout */}
      <div
        className="flex gap-3 items-start rounded-lg px-4 py-3 text-sm mb-10"
        style={{ background: 'var(--color-accent-muted)', border: '1px solid rgba(240, 147, 26, 0.2)' }}
      >
        <Robot size={14} weight="bold" style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
        <span style={{ color: 'var(--color-secondary)' }}>
          <strong style={{ color: 'var(--color-primary)' }}>Zero dependencies.</strong> All scripts use only Node.js built-ins (fs, path, child_process, crypto).
          They return structured JSON that agents parse automatically — you never run them yourself.
        </span>
      </div>

      {/* Script trust guardrail */}
      <div
        className="flex gap-3 items-start rounded-lg px-4 py-3 text-sm mb-10"
        style={{ background: 'var(--color-layer-2)', border: '1px solid var(--color-border)' }}
      >
        <Warning size={14} weight="bold" style={{ color: 'var(--color-agent-tester)', flexShrink: 0, marginTop: '2px' }} />
        <span style={{ color: 'var(--color-secondary)' }}>
          <strong style={{ color: 'var(--color-primary)' }}>Script trust guardrail:</strong> Script output is a starting point, not gospel.
          If output contradicts what an agent sees in the actual codebase, the agent trusts its own analysis and flags the discrepancy.
          Low-confidence results are verified manually.
        </span>
      </div>

      <div className="mb-10" style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* Script cards */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
          The 8 scripts
        </h2>
        <div className="space-y-5">
          {SCRIPTS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                id={s.id}
                className="rounded-xl overflow-hidden"
                style={{ border: '1px solid var(--color-border)' }}
              >
                {/* Script header */}
                <div
                  className="flex items-center gap-3 px-5 py-3"
                  style={{ background: 'var(--color-layer-1)', borderBottom: '1px solid var(--color-border)' }}
                >
                  <Icon size={16} weight="bold" style={{ color: s.color, flexShrink: 0 }} />
                  <div className="flex-1">
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                      {s.title}
                    </span>
                    <code
                      className="text-xs ml-2 px-1.5 py-0.5 rounded"
                      style={{ background: 'var(--color-layer-2)', color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}
                    >
                      {s.name}
                    </code>
                  </div>
                  <Link
                    to={s.usedByPath}
                    className="text-xs no-underline px-2 py-0.5 rounded-full"
                    style={{ background: `${s.color}18`, color: s.color }}
                  >
                    {s.usedBy}
                  </Link>
                </div>

                {/* Script body */}
                <div className="px-5 py-4" style={{ background: 'var(--color-layer-0)' }}>
                  <p className="text-sm mb-3 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
                    {s.purpose}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <Lightning size={11} weight="bold" style={{ color: 'var(--color-accent)' }} />
                    <span className="text-xs" style={{ color: 'var(--color-tertiary)' }}>
                      <strong style={{ color: 'var(--color-secondary)' }}>Trigger:</strong> {s.trigger}
                    </span>
                  </div>

                  {/* Outputs */}
                  <div className="mb-3">
                    <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--color-secondary)' }}>Outputs:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.outputs.map((o) => (
                        <span
                          key={o}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'var(--color-layer-2)', color: 'var(--color-secondary)' }}
                        >
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CLI flags */}
                  {s.flags.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-secondary)' }}>Flags:</p>
                      <div className="flex gap-2">
                        {s.flags.map((f) => (
                          <code
                            key={f}
                            className="text-xs px-1.5 py-0.5 rounded"
                            style={{ background: 'var(--color-layer-2)', color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}
                          >
                            {f}
                          </code>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Example */}
                  <div
                    className="rounded-lg px-3 py-2 font-mono text-xs"
                    style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)', color: 'var(--color-tertiary)' }}
                  >
                    <span style={{ color: 'var(--color-secondary)' }}>$</span> {s.example}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mb-12" style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* Enhancements */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Context tool enhancements
        </h2>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Three enhancements to the core{' '}
          <Link to="/how-it-works/context-management" className="no-underline" style={{ color: 'var(--color-accent)' }}>
            context-tool.js
          </Link>{' '}
          that improve progress tracking, file integrity, and profile enforcement.
        </p>
        <div className="space-y-3">
          {ENHANCEMENTS.map((e) => (
            <div
              key={e.name}
              className="px-5 py-4 rounded-lg"
              style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}
            >
              <div className="flex items-baseline gap-2 mb-2">
                <code
                  className="text-xs font-semibold px-1.5 py-0.5 rounded"
                  style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
                >
                  {e.name}
                </code>
                <span className="text-xs" style={{ color: 'var(--color-tertiary)' }}>in {e.target}</span>
              </div>
              <p className="text-sm mb-2 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
                {e.desc}
              </p>
              <div
                className="rounded-lg px-3 py-2 font-mono text-xs"
                style={{ background: 'var(--color-layer-2)', color: 'var(--color-tertiary)' }}
              >
                <span style={{ color: 'var(--color-secondary)' }}>$</span> {e.command}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mb-12" style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* How scripts integrate */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          How scripts integrate with agents
        </h2>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Each script is wired into the agent that needs it. The agent runs the script automatically
          at the right moment — you never need to trigger them yourself.
        </p>
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
          {[
            { agent: 'Coordinator', script: 'briefing-gen.js', when: 'Before every delegation', rule: 'C-CONTEXT-2', path: '/agents/coordinator' },
            { agent: 'Coordinator', script: 'context-tool.js progress', when: 'When resuming a task', rule: 'C-CONTEXT-0', path: '/agents/coordinator' },
            { agent: 'Developer', script: 'pre-impl-check.js', when: 'Before writing code', rule: 'D1', path: '/agents/developer' },
            { agent: 'Tester', script: 'requirements-tracker.js', when: 'Before and after writing tests', rule: 'T1', path: '/agents/tester' },
            { agent: 'Reviewer', script: 'review-prep.js', when: 'Before starting review', rule: 'R5', path: '/agents/reviewer' },
            { agent: 'Reviewer', script: 'requirements-tracker.js', when: 'Cross-referencing plan compliance', rule: 'R12', path: '/agents/reviewer' },
            { agent: 'Git Manager', script: 'git-safety-check.js', when: 'Before any git operation', rule: 'G1', path: '/agents/git-manager' },
            { agent: 'Codebase Explorer', script: 'codebase-diff.js', when: 'Before re-scanning', rule: 'CE6', path: '/agents/codebase-explorer' },
            { agent: 'Codebase Explorer', script: 'convention-scanner.js', when: 'After initial scan', rule: 'CE1', path: '/agents/codebase-explorer' },
          ].map((row, i, arr) => (
            <div
              key={`${row.agent}-${row.script}`}
              className="flex items-center gap-4 px-5 py-3"
              style={{
                background: 'var(--color-layer-1)',
                borderBottom: i < arr.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              <Link to={row.path} className="text-sm font-semibold no-underline w-36 flex-shrink-0"
                    style={{ color: 'var(--color-primary)' }}>
                {row.agent}
              </Link>
              <code className="text-xs px-1.5 py-0.5 rounded flex-shrink-0"
                    style={{ background: 'var(--color-layer-2)', fontFamily: 'var(--font-mono)', color: 'var(--color-tertiary)' }}>
                {row.script}
              </code>
              <span className="text-sm flex-1" style={{ color: 'var(--color-secondary)' }}>
                {row.when}
              </span>
              <code className="text-xs flex-shrink-0" style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
                {row.rule}
              </code>
            </div>
          ))}
        </div>
      </section>

      <div className="mb-10" style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* Folder structure */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Script files
        </h2>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          All scripts live alongside the core context-tool:
        </p>
        <div
          className="rounded-xl px-5 py-4 font-mono text-xs leading-relaxed"
          style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)', color: 'var(--color-secondary)' }}
        >
          <pre className="m-0 whitespace-pre">
{`.github/scripts/
├── context-tool.js           ← Core CLI (setup, init, validate, progress…)
├── convention-scanner.js     ← Convention detection
├── pre-impl-check.js         ← Pre-implementation readiness
├── requirements-tracker.js   ← AC ↔ test traceability
├── git-safety-check.js       ← Git state safety
├── briefing-gen.js           ← Agent delegation briefings
├── review-prep.js            ← Security & quality pre-scan
├── codebase-diff.js          ← Incremental scan detection
├── research-cache.js         ← Research deduplication
├── integration-test.js       ← Tests for context-tool (127 tests)
└── automation-tests.js       ← Tests for all 8 scripts (116 tests)`}
          </pre>
        </div>
      </section>

      <div className="mb-10" style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* Next steps */}
      <section>
        <h2 className="text-xl font-semibold mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
          Go deeper
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { to: '/how-it-works/context-management', label: 'Context Management', desc: 'The core CLI that manages task lifecycle.' },
            { to: '/how-it-works/phases', label: 'The 8 Phases', desc: 'When each script runs in the pipeline.' },
            { to: '/agents', label: 'Agent Deep Dives', desc: 'See how each agent uses its scripts.' },
            { to: '/reference/cheatsheet', label: 'Command Cheat Sheet', desc: 'Quick reference for all commands.' },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group block p-4 rounded-lg no-underline transition-all duration-150"
              style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-sm font-semibold"
                  style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}
                >
                  {item.label}
                </span>
                <ArrowRight
                  size={13}
                  weight="bold"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--color-accent)' }}
                />
              </div>
              <span className="text-xs" style={{ color: 'var(--color-secondary)' }}>{item.desc}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
