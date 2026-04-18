import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowCounterClockwise,
  Archive,
  ClockCountdown,
  MagnifyingGlass,
  Play,
  Pause,
  CheckCircle,
  Gear,
  Warning,
  Database,
  TreeStructure,
  Terminal,
} from '@phosphor-icons/react';

// ── State machine states ──────────────────────────────────────────────────────
const STATES = [
  { id: 'idle', label: 'Idle', desc: 'No active task. Ready to accept work.', color: 'var(--color-tertiary)' },
  { id: 'active', label: 'Active', desc: 'Task in progress. Agents working through phases.', color: 'var(--color-agent-developer)' },
  { id: 'suspended', label: 'Suspended', desc: 'Task paused by user. Can resume anytime.', color: 'var(--color-agent-architect)' },
  { id: 'completed', label: 'Completed', desc: 'Phase 8 reached. Ready for archive.', color: 'var(--color-agent-reviewer)' },
  { id: 'abandoned', label: 'Abandoned', desc: 'User chose to discard the task.', color: 'var(--color-agent-tester)' },
];

// ── CLI commands ──────────────────────────────────────────────────────────────
const CLI_COMMANDS = [
  {
    category: 'Bootstrap',
    items: [
      { cmd: 'setup', desc: 'Create folder structure and templates (one-time)', when: 'First time in a project' },
      { cmd: 'init <name> --profile <p>', desc: 'Start a new task with a context profile', when: 'New task accepted' },
      { cmd: 'status', desc: 'Show current task state as JSON', when: 'Every conversation start' },
    ],
  },
  {
    category: 'Lifecycle',
    items: [
      { cmd: 'archive [--abandoned]', desc: 'Archive task, generate manifest, reset to idle', when: 'Phase 8 or abandonment' },
      { cmd: 'suspend <reason>', desc: 'Pause task with auto-checkpoint', when: 'User says stop/pause' },
      { cmd: 'resume', desc: 'Resume suspended task, report staleness', when: 'User returns to paused task' },
    ],
  },
  {
    category: 'Safety',
    items: [
      { cmd: 'validate', desc: 'Check file consistency, staleness, prerequisites', when: 'Before every delegation' },
      { cmd: 'checkpoint <phase>', desc: 'Save full snapshot of all context files', when: 'After each phase gate' },
      { cmd: 'rollback <phase>', desc: 'Restore from a previous checkpoint', when: 'User wants to undo' },
    ],
  },
  {
    category: 'History',
    items: [
      { cmd: 'search <query>', desc: 'Search past tasks by keyword', when: 'User asks about history' },
      { cmd: 'history --last N', desc: 'Show recent task summaries', when: 'User asks what was done' },
    ],
  },
  {
    category: 'Maintenance',
    items: [
      { cmd: 'compact', desc: 'Trim oversized files, split large indexes', when: 'Every 5 archived tasks' },
    ],
  },
];

// ── Context profiles ──────────────────────────────────────────────────────────
const PROFILES = [
  { name: 'minimal', desc: 'Small fixes, typos, config changes', files: 4, risk: 'Fast but less traceable' },
  { name: 'standard', desc: 'Most tasks — balanced context', files: 7, risk: 'Recommended default', recommended: true },
  { name: 'full', desc: 'Complex features — all files', files: 9, risk: 'More overhead, better safety' },
  { name: 'extended', desc: 'Large refactors, multi-system', files: 10, risk: 'Full context + research' },
];

// ── Coordinator trigger rules ─────────────────────────────────────────────────
const TRIGGER_RULES = [
  { rule: 'C-CONTEXT-0', trigger: 'Conversation start', action: 'Check setup, run status', icon: Gear },
  { rule: 'C-CONTEXT-1', trigger: 'New task detected', action: 'Profile selection, then init', icon: Play },
  { rule: 'C-CONTEXT-2', trigger: 'Before delegation', action: 'Run validate', icon: CheckCircle },
  { rule: 'C-CONTEXT-3', trigger: 'Phase gate approved', action: 'Run checkpoint', icon: Database },
  { rule: 'C-CONTEXT-4', trigger: 'Task complete or abandoned', action: 'Run archive', icon: Archive },
  { rule: 'C-CONTEXT-5', trigger: 'User says stop/pause', action: 'Run suspend', icon: Pause },
  { rule: 'C-CONTEXT-6', trigger: 'User resumes', action: 'Run resume', icon: Play },
  { rule: 'C-CONTEXT-7', trigger: 'History question', action: 'Run search or history', icon: MagnifyingGlass },
  { rule: 'C-CONTEXT-8', trigger: 'Undo request', action: 'Run rollback', icon: ArrowCounterClockwise },
  { rule: 'C-CONTEXT-9', trigger: 'Every 5 archives', action: 'Run compact', icon: ClockCountdown },
];

export default function ContextManagement() {
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
          Context management
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Every task follows a strict lifecycle managed by a CLI script. The Coordinator triggers
          commands at the right time — context files are never manually shuffled. This guarantees
          clean boundaries between tasks, full history, and safe resumability.
        </p>
      </div>

      {/* Section: State Machine */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Task lifecycle states
        </h2>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Every task is in exactly one state at any time. The Coordinator detects the current state
          by running <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-layer-2)' }}>context-tool status</code> at
          the start of each conversation.
        </p>
        <div className="space-y-2">
          {STATES.map((state) => (
            <div
              key={state.id}
              className="flex items-center gap-4 px-4 py-3 rounded-lg"
              style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: state.color }}
              />
              <div>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                  {state.label}
                </span>
                <span className="text-sm ml-2" style={{ color: 'var(--color-secondary)' }}>
                  — {state.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div
          className="flex gap-3 items-start rounded-lg px-4 py-3 text-sm mt-4"
          style={{ background: 'var(--color-accent-muted)', border: '1px solid rgba(240, 147, 26, 0.2)' }}
        >
          <TreeStructure size={14} weight="bold" style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
          <span style={{ color: 'var(--color-secondary)' }}>
            <strong style={{ color: 'var(--color-primary)' }}>Transitions:</strong> Idle → Active (new task) → Completed (Phase 8) → Idle (archived).
            Active can also go to Suspended (paused) or Abandoned (discarded).
          </span>
        </div>
      </section>

      <div className="mb-12" style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* Section: Context Profiles */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Context profiles
        </h2>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          When you start a new task, the Coordinator asks which profile to use. The profile controls
          how many context files are created — smaller tasks need less overhead.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {PROFILES.map((p) => (
            <div
              key={p.name}
              className="px-4 py-3 rounded-lg relative"
              style={{
                background: 'var(--color-layer-1)',
                border: p.recommended ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
              }}
            >
              {p.recommended && (
                <span
                  className="absolute -top-2.5 right-3 text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: 'var(--color-accent)', color: 'var(--color-layer-0)' }}
                >
                  Recommended
                </span>
              )}
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className="text-sm font-semibold"
                  style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}
                >
                  {p.name}
                </span>
                <span className="text-xs" style={{ color: 'var(--color-tertiary)' }}>
                  {p.files} files
                </span>
              </div>
              <p className="text-xs mb-1" style={{ color: 'var(--color-secondary)' }}>{p.desc}</p>
              <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>{p.risk}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mb-12" style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* Section: CLI Commands */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          CLI commands
        </h2>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          All context file operations go through a single script:{' '}
          <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-layer-2)' }}>
            node .github/scripts/context-tool.js &lt;command&gt;
          </code>.
          The Coordinator calls these automatically — you never need to run them yourself.
        </p>
        <div className="space-y-6">
          {CLI_COMMANDS.map((group) => (
            <div key={group.category}>
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}
              >
                {group.category}
              </p>
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
                {group.items.map((item, i) => (
                  <div
                    key={item.cmd}
                    className="flex items-start gap-4 px-5 py-3"
                    style={{
                      background: 'var(--color-layer-1)',
                      borderBottom: i < group.items.length - 1 ? '1px solid var(--color-border)' : 'none',
                    }}
                  >
                    <div className="flex-shrink-0 w-48">
                      <code
                        className="text-xs px-1.5 py-0.5 rounded"
                        style={{ background: 'var(--color-layer-2)', color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}
                      >
                        {item.cmd}
                      </code>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>{item.desc}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-tertiary)' }}>When: {item.when}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          className="flex gap-3 items-start rounded-lg px-4 py-3 text-sm mt-4"
          style={{ background: 'var(--color-layer-2)', border: '1px solid var(--color-border)' }}
        >
          <Terminal size={14} weight="bold" style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
          <span style={{ color: 'var(--color-secondary)' }}>
            Every command returns structured JSON. The Coordinator parses it and acts accordingly — you see
            plain-language summaries, never raw output.
          </span>
        </div>
      </section>

      <div className="mb-12" style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* Section: Coordinator Trigger Rules */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          When does this happen?
        </h2>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          The Coordinator has 10 trigger rules (C-CONTEXT-0 through C-CONTEXT-9) that fire automatically.
          You never need to remember these — they run behind the scenes.
        </p>
        <div className="space-y-1.5">
          {TRIGGER_RULES.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.rule}
                className="flex items-center gap-4 px-4 py-2.5 rounded-lg"
                style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}
              >
                <Icon size={14} weight="bold" style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                <code
                  className="text-xs flex-shrink-0 w-28"
                  style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}
                >
                  {r.rule}
                </code>
                <span className="text-sm flex-1" style={{ color: 'var(--color-secondary)' }}>
                  <strong style={{ color: 'var(--color-primary)' }}>{r.trigger}</strong> → {r.action}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mb-12" style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* Section: Recovery */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          What happens when things go wrong?
        </h2>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          The context system is built for resilience. Here is what happens in common failure scenarios.
        </p>
        <div className="space-y-3">
          {[
            {
              scenario: 'You close VS Code mid-task',
              response: 'Next conversation, status detects "active" state — asks you to resume, abandon, or review.',
            },
            {
              scenario: 'A context file is missing or corrupt',
              response: 'validate catches it before delegation. The Coordinator re-invokes the owning agent to regenerate.',
            },
            {
              scenario: 'You want to undo Phase 4 and redo it',
              response: 'rollback restores the Phase 3 checkpoint. All Phase 4 work is removed cleanly.',
            },
            {
              scenario: 'codebase-intel.md grows too large',
              response: 'compact trims stale markers and proportionally shrinks sections. Flags for AI summarization if still too large.',
            },
            {
              scenario: 'Task index exceeds 50 entries',
              response: 'compact splits into recent (20) and cold storage. Search still finds everything.',
            },
          ].map((item) => (
            <div
              key={item.scenario}
              className="px-4 py-3 rounded-lg"
              style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}
            >
              <div className="flex items-start gap-2 mb-1">
                <Warning size={13} weight="bold" style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '3px' }} />
                <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                  {item.scenario}
                </span>
              </div>
              <p className="text-sm ml-5" style={{ color: 'var(--color-secondary)' }}>{item.response}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mb-12" style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* Section: Folder Structure */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Folder structure
        </h2>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Everything lives under <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-layer-2)' }}>.github/context/</code>.
          The structure is self-documenting — agents understand the system by looking at it.
        </p>
        <div
          className="rounded-xl px-5 py-4 font-mono text-xs leading-relaxed"
          style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)', color: 'var(--color-secondary)' }}
        >
          <pre className="m-0 whitespace-pre">
{`.github/
├── scripts/
│   └── context-tool.js          ← CLI script (all mechanics)
└── context/
    ├── _templates/              ← 9 templates (copied per task)
    ├── task-status.md           ← Current task state
    ├── requirements.md          ← Active requirements
    ├── codebase-intel.md        ← Persistent project knowledge
    ├── checkpoints/             ← Phase snapshots
    │   ├── phase-1-complete/
    │   └── phase-3-complete/
    └── archive/                 ← Completed/abandoned tasks
        ├── task-index.md        ← Searchable index
        └── TASK-2026-04-17-fix-nav/
            ├── manifest.md
            └── ...context files`}
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
            { to: '/how-it-works/context-files', label: 'Context Files', desc: 'What each file contains and who writes it.' },
            { to: '/how-it-works/phases', label: 'The 8 Phases', desc: 'How tasks move through the pipeline.' },
            { to: '/agents/coordinator', label: 'Coordinator Agent', desc: 'The agent that triggers all context commands.' },
            { to: '/guide/scenarios', label: 'Common Scenarios', desc: 'See the context system in action.' },
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
