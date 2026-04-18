import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Eye, ChatCircle } from '@phosphor-icons/react';

const GATES_PLAIN = [
  {
    gate: 'Gate 1 — Plan',
    question: 'Does the approach match what I asked for?',
    focus: 'Read the list of files that will be created or changed. Does the scope feel right? Too much? Too little?',
    notRequired: "You don't need to understand the code files — just whether the scope makes sense.",
  },
  {
    gate: 'Gate 2 — Code',
    question: 'Does the summary match my requirements?',
    focus: 'Read the "what was built" summary. Does it match your original request? Any surprises?',
    notRequired: "You don't need to read the actual code. The summary is written for non-technical review.",
  },
  {
    gate: 'Gate 3 — Push',
    question: 'Does the branch name look right?',
    focus: 'Check the branch name follows your team convention. Check commit messages describe what was done.',
    notRequired: "If you're unsure, just approve. The Reviewer already checked the code.",
  },
  {
    gate: 'Gate 4 — MR',
    question: 'Does the description capture what was built?',
    focus: 'Read the MR title and description. Does it clearly explain what changed and why?',
    notRequired: 'Approving creates a draft MR — your team won\'t be notified until you manually mark it ready.',
  },
];

const PHRASES = [
  { situation: "When agents ask questions you don't understand", say: '"Can you explain that in simpler terms?"' },
  { situation: 'When something looks wrong but you\'re not sure', say: '"I\'m not sure about this — can you clarify?"' },
  { situation: 'When you want to skip the Q&A', say: '"Go with your recommendations"' },
  { situation: 'When you want to know what\'s happening', say: '"What\'s the status?"' },
  { situation: 'When you want to change your answer', say: '"Actually, change X to Y"' },
  { situation: 'When you want to approve anything quickly', say: '"approve"' },
];

export default function NonTechPlaybook() {
  return (
    <div className="py-10 max-w-[48rem]">
      <Link to="/hacks" className="inline-flex items-center gap-1.5 text-xs no-underline mb-8"
            style={{ color: 'var(--color-tertiary)' }}>
        <ArrowLeft size={12} weight="bold" />
        Best Practices
      </Link>

      <div className="mb-10">
        <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3"
              style={{ background: 'rgba(139,92,230,0.12)', color: '#8B5CE6', fontFamily: 'var(--font-mono)' }}>
          No code required
        </span>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          Non-Tech User Playbook
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          You don't need to understand code to use DevAgent effectively. The agents explain everything in plain language. Here's what to focus on.
        </p>
      </div>

      {/* Core message */}
      <div className="rounded-xl p-5 mb-10"
           style={{ background: 'var(--color-accent-muted)', border: '1px solid rgba(240,147,26,0.2)' }}>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          <strong style={{ color: 'var(--color-primary)' }}>The rule:</strong> You only talk to the Coordinator. All 8 other agents work behind the scenes. You only need to review summaries, answer questions, and approve checkpoints — no code reading required.
        </p>
      </div>

      {/* Gates in plain English */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          What to do at each approval gate
        </h2>
        <p className="text-sm mb-5" style={{ color: 'var(--color-secondary)' }}>
          Each gate has one question to answer. That's all.
        </p>
        <div className="space-y-3">
          {GATES_PLAIN.map((gate) => (
            <div key={gate.gate} className="rounded-xl p-5"
                 style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
                {gate.gate}
              </p>
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
                Ask yourself: {gate.question}
              </p>
              <div className="flex gap-2 items-start mb-2">
                <Eye size={13} style={{ color: 'var(--color-accent)', marginTop: '2px', flexShrink: 0 }} />
                <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>{gate.focus}</p>
              </div>
              <div className="flex gap-2 items-start">
                <CheckCircle size={13} weight="fill" style={{ color: 'var(--color-agent-developer)', marginTop: '2px', flexShrink: 0 }} />
                <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>{gate.notRequired}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Useful phrases */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Phrases that always work
        </h2>
        <div className="space-y-2">
          {PHRASES.map(({ situation, say }) => (
            <div key={situation} className="flex gap-4 rounded-lg px-4 py-3 items-start"
                 style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
              <div className="flex-1">
                <p className="text-xs mb-1" style={{ color: 'var(--color-tertiary)' }}>{situation}</p>
                <p className="text-sm font-medium" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>{say}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

