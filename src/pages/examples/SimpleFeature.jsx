import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import ChatSimulator from '../../components/interactive/ChatSimulator';
import { chatExamples } from '../../data/chatExamples';

const example = chatExamples.find((e) => e.id === 'simple-feature');

const PHASE_NOTES = [
  { phase: 1, note: 'Story Analyst asks minimal questions because the task description was specific. "Go with recommendations" skips all of them.' },
  { phase: 3, note: 'The plan shows exactly what files will be created and modified. This is your last chance to change direction before code is written.' },
  { phase: 4, note: 'Development follows the approved plan exactly. No surprises.' },
];

export default function SimpleFeature() {
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
          style={{ background: 'rgba(46,189,120,0.12)', color: 'var(--color-agent-developer)', fontFamily: 'var(--font-mono)' }}
        >
          Full pipeline
        </span>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          {example?.title}
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          {example?.description}. Walk through Requirements → Planning → Development.
          Press <strong style={{ color: 'var(--color-primary)' }}>Play</strong> to watch it unfold, or{' '}
          <strong style={{ color: 'var(--color-primary)' }}>Step</strong> through one message at a time.
        </p>
      </div>

      {/* Interactive simulator */}
      <div className="mb-8">
        <ChatSimulator
          messages={example?.messages || []}
          title="GitHub Copilot Chat — @Coordinator"
        />
      </div>

      {/* Annotations */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          What's happening
        </h2>
        <div className="space-y-3">
          {PHASE_NOTES.map((n) => (
            <div key={n.phase} className="flex gap-4 rounded-lg p-4"
                 style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
              >
                {n.phase}
              </div>
              <p className="text-sm leading-relaxed pt-1" style={{ color: 'var(--color-secondary)' }}>
                {n.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Nav */}
      <div className="pt-6 flex justify-end" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Link to="/examples/bug-fix" className="flex items-center gap-2 no-underline">
          <div className="text-right">
            <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Next example</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
              Fixing a Bug
            </p>
          </div>
          <ArrowRight size={14} weight="bold" style={{ color: 'var(--color-tertiary)' }} />
        </Link>
      </div>
    </div>
  );
}

