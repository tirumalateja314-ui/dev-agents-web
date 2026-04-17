import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Lock, Eye as EyeIcon, ClipboardText, FolderOpen, Blueprint, Code, TestTube, GitBranch, GitMerge } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { phases } from '../data/phases';
import { agents } from '../data/agents';
import PhaseTimeline from '../components/interactive/PhaseTimeline';
import FlowDiagram from '../components/interactive/FlowDiagram';

// ── Context files catalogue ───────────────────────────────────────────────────
const CONTEXT_FILES = [
  { file: 'codebase-intel.md', writtenBy: 'Codebase Explorer', readBy: ['Architect Planner', 'Developer', 'Tester', 'Reviewer'], persists: true, desc: 'Project structure, patterns, conventions, and tech stack. This file survives across tasks.' },
  { file: 'requirements.md', writtenBy: 'Story Analyst', readBy: ['Architect Planner', 'Developer', 'Tester', 'Reviewer'], persists: false, desc: 'Structured requirements with acceptance criteria extracted from your task description.' },
  { file: 'implementation-plan.md', writtenBy: 'Architect Planner', readBy: ['Developer', 'Tester', 'Reviewer'], persists: false, desc: 'File-by-file plan: what to create, what to modify, which patterns to use.' },
  { file: 'development-log.md', writtenBy: 'Developer', readBy: ['Tester', 'Reviewer', 'Coordinator'], persists: false, desc: 'What was built: files created/modified, decisions made, edge cases handled.' },
  { file: 'test-results.md', writtenBy: 'Tester', readBy: ['Reviewer', 'Coordinator'], persists: false, desc: 'All tests written, coverage summary, edge cases tested, any failures found.' },
  { file: 'review-report.md', writtenBy: 'Reviewer', readBy: ['Coordinator', 'Developer'], persists: false, desc: 'Code review verdict: issues found (if any), severity, fix suggestions.' },
  { file: 'git-operations.md', writtenBy: 'Git Manager', readBy: ['Coordinator'], persists: false, desc: 'Branch name, commits, push status, MR link and description.' },
  { file: 'task-status.md', writtenBy: 'Coordinator', readBy: ['All agents'], persists: false, desc: 'Current phase, pending approvals, overall task progress. Your dashboard.' },
];

// ── Approval gates ────────────────────────────────────────────────────────────
const GATES = [
  {
    n: 1,
    name: 'Plan Approval',
    when: 'After Phase 3: Architecture Planning',
    whatYouSee: 'A file-by-file implementation plan: what will be created, modified, and why.',
    whatToCheck: 'Does the approach match what you asked for? Does the file list make sense?',
    approve: '"Approve" / "Looks good" / "LGTM"',
    reject: '"Change the approach to use [X]" or "Add [Y] to the plan"',
    color: 'var(--color-agent-architect)',
  },
  {
    n: 2,
    name: 'Code Approval',
    when: 'After Phase 6: Code Review',
    whatYouSee: 'A summary of what was built, the review verdict, and any issues found.',
    whatToCheck: "Does the summary match your requirements? Are there any review issues flagged?",
    approve: '"Approve" — the review passed',
    reject: '"Fix the [issue]" — sends back to Developer',
    color: 'var(--color-agent-reviewer)',
  },
  {
    n: 3,
    name: 'Push Approval',
    when: 'After Phase 7: Git Push (Optional)',
    whatYouSee: 'Branch name, commit messages, and what will be pushed.',
    whatToCheck: 'Does the branch name look right? Are the commit messages descriptive?',
    approve: '"Approve the push"',
    reject: '"Skip git" to handle version control yourself',
    color: 'var(--color-agent-git)',
  },
  {
    n: 4,
    name: 'MR Approval',
    when: 'After Phase 8: Merge Request (Optional)',
    whatYouSee: 'A preview of the Merge Request: title, description, assignees, labels.',
    whatToCheck: "Does the MR description capture what was built? Is the title clear?",
    approve: '"Approve the MR"',
    reject: '"Change the description to include [X]"',
    color: 'var(--color-agent-git)',
  },
];

const PHASE_ICONS = {
  1: ClipboardText,
  2: FolderOpen,
  3: Blueprint,
  4: Code,
  5: TestTube,
  6: EyeIcon,
  7: GitBranch,
  8: GitMerge,
};

function PhaseRow({ phase, isActive, onToggle }) {
  const Icon = PHASE_ICONS[phase.number];
  const agent = agents.find((a) => a.id === phase.agentId);

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: `1px solid ${isActive ? 'var(--color-border-active)' : 'var(--color-border)'}`, background: isActive ? 'var(--color-layer-2)' : 'var(--color-layer-1)' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 py-4 text-left cursor-pointer"
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: agent ? `${agent.color}18` : 'var(--color-layer-3)' }}
        >
          {Icon && <Icon size={18} weight="duotone" style={{ color: agent ? agent.color : 'var(--color-tertiary)' }} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold" style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
              PHASE {phase.number}
            </span>
            {phase.optional && (
              <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-layer-3)', color: 'var(--color-tertiary)' }}>
                optional
              </span>
            )}
            {phase.gate && (
              <span className="text-xs px-1.5 py-0.5 rounded flex items-center gap-1"
                    style={{ background: 'rgba(240, 147, 26, 0.1)', color: 'var(--color-accent)' }}>
                <Lock size={10} weight="bold" />
                Gate {phase.gate.number}
              </span>
            )}
          </div>
          <span className="text-sm font-semibold block" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
            {phase.name}
          </span>
        </div>
        <span className="text-xs flex-shrink-0" style={{ color: 'var(--color-tertiary)' }}>
          {agent?.name}
        </span>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0" style={{ borderTop: '1px solid var(--color-border)' }}>
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                     style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
                    What happens
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
                    {phase.description}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                     style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
                    Your action
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
                    {phase.userAction}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                     style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
                    Context file
                  </p>
                  <code className="text-xs px-2 py-1 rounded" style={{ background: 'var(--color-layer-3)', color: 'var(--color-primary)' }}>
                    .github/context/{phase.contextFile}
                  </code>
                </div>
                {phase.gate && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                       style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
                      Approval gate
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>
                      {phase.gate.question}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContextFileCard({ cf }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-lg overflow-hidden cursor-pointer"
      style={{ border: '1px solid var(--color-border)', background: 'var(--color-layer-1)' }}
      onClick={() => setOpen(!open)}
    >
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <EyeIcon size={14} weight="duotone" style={{ color: 'var(--color-tertiary)', flexShrink: 0 }} />
          <code className="text-xs truncate" style={{ color: 'var(--color-primary)' }}>{cf.file}</code>
          {cf.persists && (
            <span className="text-xs px-1.5 py-0.5 rounded flex-shrink-0"
                  style={{ background: 'rgba(46, 189, 120, 0.1)', color: 'var(--color-success)' }}>
              persists
            </span>
          )}
        </div>
        <span className="text-xs flex-shrink-0" style={{ color: 'var(--color-tertiary)' }}>
          {open ? '−' : '+'}
        </span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4" style={{ borderTop: '1px solid var(--color-border)' }}>
              <p className="text-sm mt-3 mb-3 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
                {cf.desc}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1"
                     style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
                    Written by
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-primary)' }}>{cf.writtenBy}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1"
                     style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
                    Read by
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-secondary)' }}>{cf.readBy.join(', ')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GateCard({ gate }) {
  return (
    <div className="rounded-lg p-5"
         style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: `${gate.color}20`, color: gate.color, fontFamily: 'var(--font-mono)' }}
        >
          {gate.n}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider"
             style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
            Gate {gate.n}
          </p>
          <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
            {gate.name}
          </p>
        </div>
      </div>
      <p className="text-xs mb-4 leading-relaxed" style={{ color: 'var(--color-tertiary)' }}>
        {gate.when}
      </p>
      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-1"
             style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
            What you see
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>{gate.whatYouSee}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-1"
             style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
            To approve
          </p>
          <code className="text-xs px-2 py-1 rounded" style={{ background: 'var(--color-layer-3)', color: 'var(--color-primary)' }}>
            {gate.approve}
          </code>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-1"
             style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
            To request changes
          </p>
          <code className="text-xs px-2 py-1 rounded" style={{ background: 'var(--color-layer-3)', color: 'var(--color-primary)' }}>
            {gate.reject}
          </code>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [activePhase, setActivePhase] = useState(null);

  return (
    <div className="py-10 max-w-[48rem]">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider mb-3"
           style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          How It Works
        </p>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          The 8-phase pipeline
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Every task — from a simple fix to a new feature — flows through the same structured pipeline.
          8 phases, 8 agents, 4 approval gates. You're in control at every step.
        </p>
      </div>

      {/* Big picture stats */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        {[
          { n: '8', label: 'Phases' },
          { n: '8', label: 'Agents' },
          { n: '4', label: 'Approval gates' },
        ].map((s) => (
          <div key={s.label} className="rounded-lg p-4 text-center"
               style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
            <p className="text-2xl font-bold mb-0.5" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>
              {s.n}
            </p>
            <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Section: The 8 Phases */}
      <section id="phases" className="mb-12">
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          The 8 phases
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--color-secondary)' }}>
          Click any phase to see what happens, who runs it, and what you need to do.
        </p>

        {/* Visual phase timeline */}
        <div className="rounded-xl p-5 mb-6"
             style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
          <PhaseTimeline />
        </div>

        {/* Flow diagram */}
        <div className="rounded-xl px-5 pt-4 pb-3 mb-6"
             style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-3"
             style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
            Full pipeline at a glance
          </p>
          <FlowDiagram />
        </div>

        {/* Accordion for detailed info */}
        <p className="text-xs mb-3" style={{ color: 'var(--color-tertiary)' }}>
          Detailed accordion view:
        </p>
        <div className="space-y-2">
          {phases.map((phase) => (
            <PhaseRow
              key={phase.number}
              phase={phase}
              isActive={activePhase === phase.number}
              onToggle={() => setActivePhase(activePhase === phase.number ? null : phase.number)}
            />
          ))}
        </div>
      </section>

      <div className="mb-12" style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* Section: Context Files */}
      <section id="context-files" className="mb-12">
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Context files — the shared brain
        </h2>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Agents don't share a chat memory. Instead, each agent writes its findings to a dedicated
          file in <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-layer-2)' }}>.github/context/</code>.
          Other agents read those files when they start. This is how the system maintains context
          across phases — and across sessions.
        </p>
        <div
          className="flex gap-3 items-start rounded-lg px-4 py-3 text-sm mb-5"
          style={{ background: 'var(--color-accent-muted)', border: '1px solid rgba(240, 147, 26, 0.2)' }}
        >
          <Lock size={14} weight="bold" style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
          <span style={{ color: 'var(--color-secondary)' }}>
            <strong style={{ color: 'var(--color-primary)' }}>Rule:</strong> Each agent writes to exactly one file. It reads any file, but only writes to its own. This prevents conflicts.
          </span>
        </div>
        <div className="space-y-1.5">
          {CONTEXT_FILES.map((cf) => (
            <ContextFileCard key={cf.file} cf={cf} />
          ))}
        </div>
      </section>

      <div className="mb-12" style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* Section: Approval gates */}
      <section id="approval-gates" className="mb-12">
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Approval gates — you're always in control
        </h2>
        <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          The pipeline pauses at 4 checkpoints and waits for you. No agent can bypass a gate.
          You can approve, request changes, or redirect entirely.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {GATES.map((gate) => (
            <GateCard key={gate.n} gate={gate} />
          ))}
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
            { to: '/agents', label: 'Meet the Agents', desc: 'Detailed profiles for all 8 agents.' },
            { to: '/guide/approvals', label: 'Approval Gates Guide', desc: "What to check and what to say at each gate." },
            { to: '/guide/giving-tasks', label: 'Giving Tasks', desc: 'How to describe tasks for best results.' },
            { to: '/examples/simple-feature', label: 'See a Full Example', desc: 'Watch a complete task from start to finish.' },
          ].map((item) => (
            <Link key={item.to} to={item.to}
              className="group block p-4 rounded-lg no-underline transition-all duration-150"
              style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                  {item.label}
                </span>
                <ArrowRight size={13} weight="bold"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--color-accent)' }} />
              </div>
              <span className="text-xs" style={{ color: 'var(--color-secondary)' }}>{item.desc}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

