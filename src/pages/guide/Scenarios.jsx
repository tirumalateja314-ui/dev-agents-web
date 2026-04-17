import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, ArrowCounterClockwise, Warning, GitBranch } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

const SCENARIOS = [
  {
    id: 'happy-path',
    label: 'Happy Path',
    badge: 'Most common',
    badgeColor: 'var(--color-agent-developer)',
    description: 'Everything goes smoothly. Requirements are clear, code passes review, tests pass, and the MR is created without issues.',
    steps: [
      { label: 'You describe the task', actor: 'You', color: 'var(--color-accent)' },
      { label: 'Story Analyst writes requirements', actor: 'Story Analyst', color: '#8B5CE6' },
      { label: 'Codebase Explorer scans project', actor: 'Codebase Explorer', color: '#24A89C' },
      { label: 'Architect creates plan', actor: 'Architect', color: '#D48A2C' },
      { label: 'You approve the plan (Gate 1)', actor: 'You', color: 'var(--color-accent)', isGate: true },
      { label: 'Developer writes code', actor: 'Developer', color: '#2EBD78' },
      { label: 'You approve the code (Gate 2)', actor: 'You', color: 'var(--color-accent)', isGate: true },
      { label: 'Tester runs all tests — pass', actor: 'Tester', color: '#D44458' },
      { label: 'Reviewer approves code quality', actor: 'Reviewer', color: '#B84FA0' },
      { label: 'You approve push (Gate 3)', actor: 'You', color: 'var(--color-accent)', isGate: true },
      { label: 'Git Manager creates MR', actor: 'Git Manager', color: '#C96420' },
      { label: 'Task complete', actor: null, color: '#2EBD78', isEnd: true },
    ],
  },
  {
    id: 'bug-in-testing',
    label: 'Bug Found in Testing',
    badge: 'Common',
    badgeColor: 'var(--color-agent-tester)',
    description: 'Tester finds a failing test. Coordinator loops back to Developer for a targeted fix, then re-runs testing. No full restart needed.',
    steps: [
      { label: 'Development complete', actor: 'Developer', color: '#2EBD78' },
      { label: 'You approve code (Gate 2)', actor: 'You', color: 'var(--color-accent)', isGate: true },
      { label: 'Tester finds failing tests', actor: 'Tester', color: '#D44458', isWarning: true },
      { label: 'Coordinator notifies you of failures', actor: 'Coordinator', color: 'var(--color-accent)' },
      { label: 'Developer fixes the specific issue', actor: 'Developer', color: '#2EBD78', isLoop: true },
      { label: 'Tester re-runs — all pass', actor: 'Tester', color: '#D44458' },
      { label: 'Continue to review', actor: 'Reviewer', color: '#B84FA0' },
    ],
  },
  {
    id: 'reviewer-rejects',
    label: 'Reviewer Rejects Code',
    badge: 'Occasional',
    badgeColor: 'var(--color-agent-reviewer)',
    description: 'Reviewer finds a quality or security issue. Developer fixes the specific concern. Review runs again — no full restart.',
    steps: [
      { label: 'Testing passes', actor: 'Tester', color: '#D44458' },
      { label: 'Reviewer finds a quality issue', actor: 'Reviewer', color: '#B84FA0', isWarning: true },
      { label: 'You see the rejection reason', actor: 'You', color: 'var(--color-accent)' },
      { label: 'Developer addresses reviewer concerns', actor: 'Developer', color: '#2EBD78', isLoop: true },
      { label: 'Reviewer re-reviews — approved', actor: 'Reviewer', color: '#B84FA0' },
      { label: 'Continue to git operations', actor: 'Git Manager', color: '#C96420' },
    ],
  },
  {
    id: 'requirement-change',
    label: 'Requirement Change Mid-Task',
    badge: 'Possible',
    badgeColor: '#8B5CE6',
    description: 'You change a requirement after the plan is approved but before development. Story Analyst analyzes impact, Architect revises the plan, you re-approve.',
    steps: [
      { label: 'Plan approved (Gate 1)', actor: 'You', color: 'var(--color-accent)', isGate: true },
      { label: 'You say "Change X to Y"', actor: 'You', color: 'var(--color-accent)', isChange: true },
      { label: 'Story Analyst analyzes impact', actor: 'Story Analyst', color: '#8B5CE6', isLoop: true },
      { label: 'Architect revises the plan', actor: 'Architect', color: '#D48A2C', isLoop: true },
      { label: 'You approve revised plan', actor: 'You', color: 'var(--color-accent)', isGate: true },
      { label: 'Development continues from revised plan', actor: 'Developer', color: '#2EBD78' },
    ],
    note: 'The earlier you change requirements, the less rework is needed. Changes after development begins cost more.',
  },
  {
    id: 'skip-git',
    label: 'Skipping Git Operations',
    badge: 'Optional',
    badgeColor: '#C96420',
    description: 'You want to handle git yourself. Tell the Coordinator "skip git" at any point. The task completes after review.',
    steps: [
      { label: 'Reviewer approves code', actor: 'Reviewer', color: '#B84FA0' },
      { label: 'You say "skip git"', actor: 'You', color: 'var(--color-accent)' },
      { label: 'Coordinator wraps up: task complete summary', actor: 'Coordinator', color: 'var(--color-accent)' },
      { label: 'Code is in your working directory', actor: null, color: '#2EBD78', isEnd: true },
      { label: 'You handle git manually', actor: 'You', color: 'var(--color-accent)' },
    ],
  },
];

function FlowStep({ step, index, total }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.2 }}
      className="flex items-start gap-3"
    >
      {/* Line + dot */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: '16px' }}>
        <div
          className="w-3 h-3 rounded-full border-2 flex-shrink-0 z-10"
          style={{
            borderColor: step.isGate ? 'var(--color-accent)' : step.color,
            background: step.isGate || step.isEnd ? step.color : 'var(--color-layer-0)',
          }}
        />
        {index < total - 1 && (
          <div className="w-px flex-1 mt-0.5" style={{ background: 'var(--color-border)', minHeight: '20px' }} />
        )}
      </div>

      {/* Content */}
      <div className="pb-4 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-sm"
            style={{
              color: step.isEnd ? step.color : 'var(--color-primary)',
              fontWeight: step.isGate || step.isEnd ? 600 : 400,
            }}
          >
            {step.label}
          </span>
          {step.isGate && (
            <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                  style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
              gate
            </span>
          )}
          {step.isLoop && (
            <span className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{ background: 'rgba(139,92,230,0.12)', color: '#8B5CE6', fontFamily: 'var(--font-mono)' }}>
              fix cycle
            </span>
          )}
          {step.isWarning && (
            <Warning size={12} weight="fill" style={{ color: '#E8A030' }} />
          )}
          {step.isChange && (
            <span className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{ background: 'rgba(240,147,26,0.12)', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
              change
            </span>
          )}
        </div>
        {step.actor && (
          <span className="text-xs" style={{ color: step.color, fontFamily: 'var(--font-mono)' }}>
            {step.actor}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Scenarios() {
  const [active, setActive] = useState('happy-path');
  const current = SCENARIOS.find((s) => s.id === active);

  return (
    <div className="py-10 max-w-[48rem]">
      <Link to="/guide" className="inline-flex items-center gap-1.5 text-xs no-underline mb-8"
            style={{ color: 'var(--color-tertiary)' }}>
        <ArrowLeft size={12} weight="bold" />
        User Guide
      </Link>

      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider mb-3"
           style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          User Guide
        </p>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          Common scenarios
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Step-by-step flows for situations you'll encounter. Select a scenario to see exactly what happens and when.
        </p>
      </div>

      {/* Scenario selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
            style={{
              background: active === s.id ? s.badgeColor + '18' : 'var(--color-layer-1)',
              border: `1px solid ${active === s.id ? s.badgeColor + '40' : 'var(--color-border)'}`,
              color: active === s.id ? s.badgeColor : 'var(--color-secondary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Active scenario */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
        >
          <div className="rounded-xl p-6 mb-6"
               style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: current.badgeColor + '18', color: current.badgeColor, fontFamily: 'var(--font-mono)' }}
              >
                {current.badge}
              </span>
              <h2 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                {current.label}
              </h2>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-secondary)' }}>
              {current.description}
            </p>

            {/* Flow */}
            <div>
              {current.steps.map((step, i) => (
                <FlowStep key={i} step={step} index={i} total={current.steps.length} />
              ))}
            </div>

            {current.note && (
              <div className="flex gap-2 items-start rounded-lg px-3 py-2.5 mt-2"
                   style={{ background: 'rgba(232,160,48,0.08)', border: '1px solid rgba(232,160,48,0.2)' }}>
                <Warning size={13} weight="fill" style={{ color: '#E8A030', marginTop: '2px', flexShrink: 0 }} />
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-secondary)' }}>{current.note}</p>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="pt-6 flex items-center justify-between" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Link to="/guide/approvals" className="flex items-center gap-2 no-underline">
          <ArrowLeft size={14} weight="bold" style={{ color: 'var(--color-tertiary)' }} />
          <div>
            <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Previous</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Approvals</p>
          </div>
        </Link>
        <Link to="/guide/troubleshooting" className="flex items-center gap-2 no-underline">
          <div className="text-right">
            <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Next</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Troubleshooting</p>
          </div>
          <ArrowRight size={14} weight="bold" style={{ color: 'var(--color-tertiary)' }} />
        </Link>
      </div>
    </div>
  );
}

