import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Warning } from '@phosphor-icons/react';
import QualityMeter from '../../components/interactive/QualityMeter';

const MAGIC_PHRASES = [
  { phrase: 'Go with your recommendations', effect: 'Skips all clarification questions from Story Analyst — great when the task is clear.' },
  { phrase: 'Jira: ABC-123', effect: 'Loads full ticket description, acceptance criteria, and subtasks automatically.' },
  { phrase: 'Focus on backend only', effect: "Scopes the Architect's plan — prevents frontend changes you don't want." },
  { phrase: 'No new dependencies', effect: 'Constrains both Architect and Developer to existing packages.' },
  { phrase: 'Draft PR', effect: 'Git Manager creates a draft MR instead of marking it ready for review.' },
  { phrase: 'Explain each step', effect: 'Agents add "Why:" annotations to every major decision. Useful for learning.' },
];

const JIRA_TIPS = [
  'Include acceptance criteria in the ticket — Story Analyst will use them verbatim.',
  'Tag the ticket with the tech stack (e.g. "backend", "python") to guide Codebase Explorer.',
  'Subtasks become individual plan items — break big tickets into subtasks for clearer plans.',
];

export default function GivingTasks() {
  return (
    <div className="py-10 max-w-[48rem]">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider mb-3"
           style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          User Guide
        </p>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          Giving tasks
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          The quality of your task description directly affects how many clarifying questions you get and how accurate the plan is. Better descriptions mean fewer interruptions.
        </p>
      </div>

      {/* Quality meter */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Task description quality
        </h2>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Drag or click the scale to see examples of each quality level. Aim for Good or Great.
        </p>
        <div className="rounded-xl p-5"
             style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
          <QualityMeter initial={1} />
        </div>
      </section>

      {/* Magic phrases */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Magic phrases
        </h2>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          These phrases in your task message trigger specific agent behaviors:
        </p>
        <div className="space-y-2">
          {MAGIC_PHRASES.map(({ phrase, effect }) => (
            <div key={phrase} className="rounded-lg p-4"
                 style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
              <p className="text-xs font-semibold mb-1"
                 style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
                "{phrase}"
              </p>
              <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>
                {effect}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Jira tips */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Using Jira tickets
        </h2>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Paste a Jira link or use <code className="text-xs px-1.5 py-0.5 rounded"
          style={{ background: 'var(--color-layer-2)' }}>Jira: TICKET-ID</code> and the system will pull the full ticket automatically.
        </p>
        <div className="space-y-2">
          {JIRA_TIPS.map((tip) => (
            <div key={tip} className="flex gap-3 items-start text-sm py-2">
              <CheckCircle size={14} weight="fill" style={{ color: 'var(--color-agent-developer)', marginTop: '2px', flexShrink: 0 }} />
              <span style={{ color: 'var(--color-secondary)' }}>{tip}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="pt-6 flex justify-end" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Link to="/guide/approvals" className="flex items-center gap-2 no-underline">
          <div className="text-right">
            <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Next</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Answering Questions</p>
          </div>
          <ArrowRight size={14} weight="bold" style={{ color: 'var(--color-tertiary)' }} />
        </Link>
      </div>
    </div>
  );
}

