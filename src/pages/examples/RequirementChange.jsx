import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import ChatSimulator from '../../components/interactive/ChatSimulator';
import { chatExamples } from '../../data/chatExamples';

const example = chatExamples.find((e) => e.id === 'requirement-change');

const PHASE_NOTES = [
  { label: 'Mid-task change', note: 'You changed the token expiry after the plan was approved but before development started. This is the ideal time — no code is wasted.' },
  { label: 'Impact analysis', note: 'Coordinator routes back to Story Analyst to assess impact, then Architect revises the plan. You only approve the revision — no full restart.' },
  { label: 'Key insight', note: 'If you had changed this after development, the Developer would have had to rewrite parts of the code. Earlier changes cost less.' },
];

export default function RequirementChange() {
  return (
    <div className="py-10 max-w-[48rem]">
      <Link to="/examples" className="inline-flex items-center gap-1.5 text-xs no-underline mb-8"
            style={{ color: 'var(--color-tertiary)' }}>
        <ArrowLeft size={12} weight="bold" />
        All examples
      </Link>

      <div className="mb-8">
        <span
          className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3"
          style={{ background: 'rgba(139,92,230,0.12)', color: 'var(--color-agent-analyst)', fontFamily: 'var(--font-mono)' }}
        >
          Mid-task change
        </span>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          Requirement Change Mid-Task
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          You realize the token expiry should be 1 hour, not 24 hours — after the plan was already approved.
          Watch the system re-analyze impact and revise the plan without a full restart.
        </p>
      </div>

      <div className="mb-8">
        <ChatSimulator
          messages={example?.messages || []}
          title="GitHub Copilot Chat — @Coordinator"
        />
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          What's happening
        </h2>
        <div className="space-y-3">
          {PHASE_NOTES.map((n) => (
            <div key={n.label} className="flex gap-4 rounded-lg p-4"
                 style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
              <div
                className="px-2 py-1 rounded text-xs font-semibold flex-shrink-0"
                style={{ background: 'var(--color-layer-3)', color: 'var(--color-secondary)', fontFamily: 'var(--font-mono)', height: 'fit-content' }}
              >
                {n.label}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
                {n.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="pt-6 flex items-center justify-start" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Link to="/examples/bug-fix" className="flex items-center gap-2 no-underline">
          <ArrowLeft size={14} weight="bold" style={{ color: 'var(--color-tertiary)' }} />
          <div>
            <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Previous</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Fixing a Bug</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
