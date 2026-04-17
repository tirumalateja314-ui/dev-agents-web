import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CaretDown, ChatCircle, Warning, Lightbulb, CheckCircle } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTION_TYPES = [
  {
    id: 'clarification',
    icon: ChatCircle,
    color: 'var(--color-agent-analyst)',
    label: 'Clarification',
    title: 'Agent needs more detail',
    when: 'Your task description had an ambiguous part. The agent surfaced it rather than guessing.',
    example: {
      agent: 'Story Analyst',
      message: 'You mentioned "update the dashboard" — should this apply to all user roles, or only admins? I want to make sure the acceptance criteria are scoped correctly.',
    },
    howToAnswer: [
      'Answer directly and concisely — one sentence is usually enough.',
      'If you don\'t know, say "go with your recommendation" — the agent will pick the sensible default.',
      'You can ask "what are my options?" and the agent will list them for you.',
    ],
    goodAnswers: ['Admins only.', 'All roles — keep it consistent.', "I'm not sure, go with your recommendation."],
    badAnswers: ['Maybe?', 'Just figure it out.', '(no reply, waiting for the agent to move on)'],
  },
  {
    id: 'missing-info',
    icon: Warning,
    color: 'var(--color-agent-tester)',
    label: 'Missing info',
    title: 'Agent can\'t proceed without an answer',
    when: 'A required detail is genuinely missing — e.g. which API endpoint to call, a credential, a business rule only you know.',
    example: {
      agent: 'Architect',
      message: 'The spec requires calling an external payment provider, but I don\'t see a provider name or endpoint in the context files. Which payment provider should I design for?',
    },
    howToAnswer: [
      'Provide the specific value the agent needs.',
      'If you don\'t have it, say "mark it as TODO and continue" — the agent will leave a placeholder.',
      'If it\'s a credential, say "use an environment variable named [X]" — never paste real secrets.',
    ],
    goodAnswers: ['Stripe. Use their API v3.', "I don't have that yet — use a TODO placeholder.", 'Use env var PAYMENT_API_KEY.'],
    badAnswers: ['Some payment thing.', 'Check the code.'],
  },
  {
    id: 'risk-confirmation',
    icon: Warning,
    color: '#D44458',
    label: 'Risk confirmation',
    title: 'Agent found something risky',
    when: 'An agent identified a HIGH risk — a potentially breaking change, a security issue, or data loss scenario. It stops and asks before proceeding.',
    example: {
      agent: 'Developer',
      message: '[HIGH RISK] The requested change would modify the users table schema. In a production environment, this requires a migration and could lock the table during deployment.\n\nOptions:\n1. Add a migration file (recommended)\n2. Proceed without migration (risky)\n\nWhich should I use?',
    },
    howToAnswer: [
      'Read the risk description carefully — this is important.',
      'Pick the numbered option or say "use your recommendation".',
      'You can ask "what would go wrong with option 2?" to understand the risk better.',
    ],
    goodAnswers: ['Option 1 — add the migration.', 'Use your recommendation.', 'What would go wrong with option 2?'],
    badAnswers: ['Just do it.', 'Skip it.'],
  },
  {
    id: 'approval-style',
    icon: CheckCircle,
    color: 'var(--color-agent-developer)',
    label: 'Presenting results',
    title: 'Agent showing work before continuing',
    when: 'Not a question — an agent is presenting completed work (a plan, code summary, test results) and waiting for your go-ahead. These are approval gates.',
    example: {
      agent: 'Architect',
      message: 'Implementation Plan — Phase 3:\n\nFiles to create:\n  • src/services/emailValidator.js\n  • src/services/__tests__/emailValidator.test.js\n\nFiles to modify:\n  • src/routes/auth.js (add validator middleware)\n\nApproach: zod schema validation. All new, no existing code touched.\n\nApprove to proceed?',
    },
    howToAnswer: [
      'Say "yes", "approve", "looks good" or "LGTM" to continue.',
      'Ask questions before approving if anything looks off.',
      'Say what you want changed — the agent will revise and present again.',
    ],
    goodAnswers: ['yes', 'looks good', 'LGTM', 'Before you proceed — can you also handle empty strings?'],
    badAnswers: ['ok I guess', '(silent — the agent will wait indefinitely)'],
  },
];

function QuestionCard({ qtype }) {
  const [open, setOpen] = useState(false);
  const Icon = qtype.icon;

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid var(--color-border)', background: 'var(--color-layer-1)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left"
        style={{ background: 'transparent' }}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: qtype.color + '18' }}
        >
          <Icon size={16} style={{ color: qtype.color }} weight="duotone" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="text-xs font-semibold px-1.5 py-0.5 rounded"
              style={{ background: qtype.color + '18', color: qtype.color, fontFamily: 'var(--font-mono)' }}
            >
              {qtype.label}
            </span>
          </div>
          <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
            {qtype.title}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-tertiary)' }}>{qtype.when}</p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }} className="flex-shrink-0">
          <CaretDown size={14} style={{ color: 'var(--color-tertiary)' }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 pb-5 space-y-5" style={{ borderTop: '1px solid var(--color-border)' }}>
              {/* Example message */}
              <div className="pt-4">
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
                  EXAMPLE
                </p>
                <div
                  className="rounded-lg px-4 py-3 space-y-1"
                  style={{ background: 'var(--color-layer-2)', border: '1px solid var(--color-border)' }}
                >
                  <p className="text-xs font-semibold" style={{ color: qtype.color, fontFamily: 'var(--font-mono)' }}>
                    [{qtype.example.agent}]
                  </p>
                  <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.76rem' }}>
                    {qtype.example.message}
                  </p>
                </div>
              </div>

              {/* How to answer */}
              <div>
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
                  HOW TO ANSWER
                </p>
                <ul className="space-y-1.5">
                  {qtype.howToAnswer.map((tip, i) => (
                    <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--color-secondary)' }}>
                      <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>→</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Good / bad examples */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg px-4 py-3" style={{ background: 'rgba(46,189,120,0.06)', border: '1px solid rgba(46,189,120,0.15)' }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: '#2EBD78', fontFamily: 'var(--font-mono)' }}>SAY THIS</p>
                  <ul className="space-y-1">
                    {qtype.goodAnswers.map((a, i) => (
                      <li key={i}>
                        <code className="text-xs" style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-mono)' }}>"{a}"</code>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg px-4 py-3" style={{ background: 'rgba(212,68,88,0.06)', border: '1px solid rgba(212,68,88,0.15)' }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: '#D44458', fontFamily: 'var(--font-mono)' }}>AVOID</p>
                  <ul className="space-y-1">
                    {qtype.badAnswers.map((a, i) => (
                      <li key={i}>
                        <code className="text-xs" style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>"{a}"</code>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AnsweringQuestions() {
  return (
    <div className="py-10 max-w-[48rem]">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider mb-3"
           style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          User Guide
        </p>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          Answering questions
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Agents ask questions when they need something from you. Here's how to recognise each type and what the best response looks like.
        </p>
      </div>

      {/* Core rule */}
      <div
        className="rounded-xl px-5 py-4 mb-8 flex gap-4"
        style={{ background: 'var(--color-accent-muted)', border: '1px solid rgba(240,147,26,0.2)' }}
      >
        <Lightbulb size={18} weight="duotone" style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-accent)' }}>When in doubt, say "go with your recommendation"</p>
          <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>
            Every agent has a sensible default for any decision. You never have to know the answer — you just have to trust the agent to pick well when you hand it back.
          </p>
        </div>
      </div>

      {/* Question type cards */}
      <div className="space-y-3 mb-10">
        {QUESTION_TYPES.map((qt) => (
          <QuestionCard key={qt.id} qtype={qt} />
        ))}
      </div>

      {/* Quick reference table */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Universal phrases
        </h2>
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
          {[
            { situation: 'You agree with what the agent proposes', say: 'yes / approve / looks good / LGTM' },
            { situation: 'You don\'t know the answer', say: 'go with your recommendation' },
            { situation: 'You want to understand the options', say: 'what are my options?' },
            { situation: 'You want a simpler approach', say: 'keep it simple / use the simplest option' },
            { situation: 'Something looks wrong', say: 'hold on — [describe what\'s wrong]' },
            { situation: 'You want to skip an optional step', say: 'skip this / not needed for now' },
          ].map((row, i, arr) => (
            <div
              key={i}
              className="flex gap-6 px-5 py-3 items-center"
              style={{
                background: 'var(--color-layer-1)',
                borderBottom: i < arr.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              <p className="text-sm flex-1" style={{ color: 'var(--color-secondary)' }}>{row.situation}</p>
              <code
                className="text-xs px-2 py-1 rounded flex-shrink-0"
                style={{ background: 'var(--color-layer-3)', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
              >
                {row.say}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* Nav */}
      <div className="pt-6 flex items-center justify-between" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Link to="/guide/giving-tasks" className="flex items-center gap-2 no-underline">
          <ArrowLeft size={14} weight="bold" style={{ color: 'var(--color-tertiary)' }} />
          <div>
            <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Previous</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Giving Tasks</p>
          </div>
        </Link>
        <Link to="/guide/approvals" className="flex items-center gap-2 no-underline">
          <div className="text-right">
            <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Next</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Approval Gates</p>
          </div>
          <ArrowRight size={14} weight="bold" style={{ color: 'var(--color-tertiary)' }} />
        </Link>
      </div>
    </div>
  );
}
