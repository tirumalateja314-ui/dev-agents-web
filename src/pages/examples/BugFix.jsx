import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import ChatSimulator from '../../components/interactive/ChatSimulator';
import { chatExamples } from '../../data/chatExamples';

const example = chatExamples.find((e) => e.id === 'bug-fix');

const PHASE_NOTES = [
  { label: 'Requirements', note: 'Story Analyst documents the bug clearly — expected behavior + acceptance criteria — even though no Jira link was provided. Bug reports work just as well as feature requests.' },
  { label: 'Exploration', note: 'Codebase Explorer finds the exact file causing the issue and notes the existing error-handling pattern to follow.' },
  { label: 'Planning', note: 'The plan is surgical — one file modified, one specific change. No scope creep.' },
  { label: 'Testing', note: 'Tester writes regression tests specifically for the bug scenario, plus tests that the happy path still works.' },
];

export default function BugFix() {
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
          style={{ background: 'rgba(212,68,82,0.12)', color: 'var(--color-agent-tester)', fontFamily: 'var(--font-mono)' }}
        >
          Bug fix
        </span>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          {example?.title}
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          A production API returns 500 on database timeout. Watch the full fix: diagnosis, code change, regression tests, review, and push to GitLab.
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

      <div className="pt-6 flex items-center justify-between" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Link to="/examples/simple-feature" className="flex items-center gap-2 no-underline">
          <ArrowLeft size={14} weight="bold" style={{ color: 'var(--color-tertiary)' }} />
          <div>
            <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Previous</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Building a Feature</p>
          </div>
        </Link>
        <Link to="/examples/requirement-change" className="flex items-center gap-2 no-underline">
          <div className="text-right">
            <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Next</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Requirement Change</p>
          </div>
          <ArrowRight size={14} weight="bold" style={{ color: 'var(--color-tertiary)' }} />
        </Link>
      </div>
    </div>
  );
}

