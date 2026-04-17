import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Lock, CheckCircle, XCircle, ArrowCounterClockwise } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

const GATES = [
  {
    number: 1,
    name: 'Plan Approval',
    phase: 'After Phase 3 — Planning',
    color: 'var(--color-agent-architect)',
    whatYouSee: 'The Architect presents an implementation plan: which files will be created or modified, what each change does, estimated complexity, and any risks.',
    whatToCheck: [
      'Does the approach match what you asked for?',
      'Does the file list make sense for the scope?',
      'Are there any files you didn\'t expect to be touched?',
      'Are the risks acceptable?',
    ],
    sayToApprove: ['yes', 'approve', 'looks good', 'LGTM', 'proceed'],
    sayToReject: 'Change [X] to [Y] / Go back and [adjust something]',
    whatHappensOnReject: 'Architect revises the plan based on your feedback and presents it again. No code has been written yet — changes at this stage cost nothing.',
    tip: 'This is your most powerful gate. A good plan leads to good code. Take 30 seconds to read the file list.',
  },
  {
    number: 2,
    name: 'Code Approval',
    phase: 'After Phase 4 — Development',
    color: 'var(--color-agent-developer)',
    whatYouSee: 'The Developer presents a summary of what was built: files changed, key decisions made, any deviations from the plan (with reasons), and a brief "what to test" section.',
    whatToCheck: [
      'Does the summary match your original requirements?',
      'Were there any surprises (unexpected decisions)?',
      'Does the scope seem right — not too much, not too little?',
    ],
    sayToApprove: ['yes', 'approve', 'looks good', 'proceed to testing'],
    sayToReject: 'Revert [X] / Change [Y] / I didn\'t want [Z]',
    whatHappensOnReject: 'Developer revises the specific part you flagged. You don\'t need to restart the whole task.',
    tip: "You don't need to read the code itself. The summary is written specifically for non-technical review.",
  },
  {
    number: 3,
    name: 'Push Approval',
    phase: 'After Phase 7 — Git: Push',
    color: 'var(--color-agent-git)',
    whatYouSee: 'Git Manager shows you the branch name, commit count, commit messages, and which files are included. This is before anything is pushed to the remote repository.',
    whatToCheck: [
      'Does the branch name follow your team\'s naming convention?',
      'Do the commit messages describe what was done?',
      'Is the file list correct — nothing missing, nothing extra?',
    ],
    sayToApprove: ['yes', 'approve', 'push it', 'go ahead'],
    sayToReject: 'Rename the branch to [X] / Change commit message [N] to [Y]',
    whatHappensOnReject: 'Git Manager makes the adjustment and shows you the updated preview.',
    tip: 'If you\'re unsure about branch names, just approve. The Reviewer has already verified the code quality.',
  },
  {
    number: 4,
    name: 'Merge Request Approval',
    phase: 'After Phase 8 — Git: MR',
    color: 'var(--color-agent-coordinator)',
    whatYouSee: 'Git Manager shows you the full MR preview: title, description, target branch, assignee, labels, and a summary of changes. This is created as a Draft MR by default.',
    whatToCheck: [
      'Does the MR title clearly describe what was built?',
      'Does the description capture the key changes?',
      'Is the target branch correct (usually main or develop)?',
    ],
    sayToApprove: ['yes', 'create it', 'approve', 'submit the MR'],
    sayToReject: 'Change the title to [X] / Add [Y] to the description',
    whatHappensOnReject: 'Git Manager updates the MR details before creating it.',
    tip: 'MRs are created as drafts by default, so human reviewers on your team won\'t be notified until you mark it ready.',
  },
  {
    number: 5,
    name: 'Risk Decision Gate',
    phase: 'Triggered whenever a HIGH risk is found',
    color: 'var(--color-agent-tester)',
    whatYouSee: 'An agent surfaces a high-severity risk: a security concern, a potential data loss scenario, a breaking change, or a complex technical decision. It presents options with its recommendation.',
    whatToCheck: [
      'Do you understand the risk described?',
      'Are the options clear?',
      'Does the recommendation make sense for your context?',
    ],
    sayToApprove: ['go with your recommendation', 'use option [N]', 'proceed with caution'],
    sayToReject: 'Explain [X] more / What are the implications of option [N]?',
    whatHappensOnReject: 'The agent explains further until you feel comfortable making a decision.',
    tip: 'Say "Can you explain that in simpler terms?" if the risk description is too technical.',
  },
];

function GateCard({ gate, isActive, onToggle }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: `1px solid ${isActive ? gate.color + '40' : 'var(--color-border)'}`, background: 'var(--color-layer-1)' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 py-4 text-left"
        style={{ background: 'transparent' }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: gate.color + '18', color: gate.color, fontFamily: 'var(--font-mono)' }}
        >
          {gate.number}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
              {gate.name}
            </p>
            <span className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--color-layer-3)', color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
              {gate.phase}
            </span>
          </div>
        </div>
        <Lock size={14} weight={isActive ? 'fill' : 'regular'} style={{ color: isActive ? gate.color : 'var(--color-tertiary)', flexShrink: 0 }} />
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 pb-5 space-y-4" style={{ borderTop: '1px solid var(--color-border)' }}>
              <div className="pt-4">
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
                  {gate.whatYouSee}
                </p>
              </div>

              {/* What to check */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2"
                   style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
                  What to check
                </p>
                <div className="space-y-1.5">
                  {gate.whatToCheck.map((item) => (
                    <div key={item} className="flex gap-2 items-start text-sm">
                      <CheckCircle size={13} weight="fill" style={{ color: 'var(--color-agent-developer)', marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ color: 'var(--color-secondary)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Approve / Reject */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg p-3" style={{ background: 'rgba(46,189,120,0.06)', border: '1px solid rgba(46,189,120,0.15)' }}>
                  <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--color-agent-developer)', fontFamily: 'var(--font-mono)' }}>
                    To approve
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {gate.sayToApprove.map((s) => (
                      <span key={s} className="text-xs px-1.5 py-0.5 rounded"
                            style={{ background: 'var(--color-layer-3)', color: 'var(--color-secondary)', fontFamily: 'var(--font-mono)' }}>
                        "{s}"
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg p-3" style={{ background: 'rgba(212,68,82,0.06)', border: '1px solid rgba(212,68,82,0.15)' }}>
                  <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--color-agent-tester)', fontFamily: 'var(--font-mono)' }}>
                    To reject / revise
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-mono)' }}>
                    {gate.sayToReject}
                  </p>
                </div>
              </div>

              {/* What happens on reject */}
              <div className="flex gap-2 items-start rounded-lg px-3 py-2.5"
                   style={{ background: 'var(--color-layer-2)' }}>
                <ArrowCounterClockwise size={13} style={{ color: 'var(--color-tertiary)', marginTop: '2px', flexShrink: 0 }} />
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
                  <strong style={{ color: 'var(--color-primary)' }}>If you reject: </strong>
                  {gate.whatHappensOnReject}
                </p>
              </div>

              {/* Tip */}
              <div className="flex gap-2 items-start rounded-lg px-3 py-2.5"
                   style={{ background: 'var(--color-accent-muted)', border: '1px solid rgba(240, 147, 26, 0.15)' }}>
                <span className="text-xs font-bold flex-shrink-0" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>TIP</span>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-secondary)' }}>{gate.tip}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Approvals() {
  const [active, setActive] = useState(null);

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
          Questions & Approvals
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          DevAgent has 5 approval gates — checkpoints where the workflow pauses for your review. Here's what to expect at each one and how to respond.
        </p>
      </div>

      {/* Answering agent questions */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
          When agents ask you questions
        </h2>
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-secondary)' }}>
          Agents (especially Story Analyst) ask clarifying questions during the requirements phase. They always include their expert recommendation so you never have to guess.
        </p>
        <div className="rounded-xl p-5 mb-4 space-y-3"
             style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
          <div style={{ color: '#8B5CE6' }}>
            <span className="font-semibold">[Story Analyst]</span>
            <p className="mt-1 ml-4" style={{ color: 'var(--color-secondary)' }}>
              I have 2 questions about the authentication feature:
            </p>
            <p className="mt-1 ml-4" style={{ color: 'var(--color-secondary)' }}>
              1. Should we use JWT or session-based authentication?<br />
              &nbsp;&nbsp;&nbsp;<span style={{ color: '#2EBD78' }}>→ Recommendation: JWT — your API is stateless and already uses tokens.</span>
            </p>
            <p className="mt-1 ml-4" style={{ color: 'var(--color-secondary)' }}>
              2. What should the token expiry be?<br />
              &nbsp;&nbsp;&nbsp;<span style={{ color: '#2EBD78' }}>→ Recommendation: 24 hours for access token, 7 days for refresh token.</span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Accept all', value: '"Go with your recommendations"', desc: 'Fastest. Trust the agents.' },
            { label: 'Mix & match', value: '"1: yes, 2: make it 1 hour"', desc: 'Answer some, accept rest.' },
            { label: 'Ask more', value: '"Explain option 1 more"', desc: 'Get clarification first.' },
          ].map((r) => (
            <div key={r.label} className="rounded-lg p-3" style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>{r.label}</p>
              <p className="text-xs mb-1" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>{r.value}</p>
              <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gates */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          The 5 approval gates
        </h2>
        <p className="text-sm mb-5" style={{ color: 'var(--color-secondary)' }}>
          Click any gate to see what to look for and what to say.
        </p>
        <div className="space-y-2">
          {GATES.map((gate) => (
            <GateCard
              key={gate.number}
              gate={gate}
              isActive={active === gate.number}
              onToggle={() => setActive(active === gate.number ? null : gate.number)}
            />
          ))}
        </div>
      </section>

      <div className="pt-6 flex items-center justify-between" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Link to="/guide/giving-tasks" className="flex items-center gap-2 no-underline">
          <ArrowLeft size={14} weight="bold" style={{ color: 'var(--color-tertiary)' }} />
          <div>
            <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Previous</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Giving Tasks</p>
          </div>
        </Link>
        <Link to="/guide/scenarios" className="flex items-center gap-2 no-underline">
          <div className="text-right">
            <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Next</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Common Scenarios</p>
          </div>
          <ArrowRight size={14} weight="bold" style={{ color: 'var(--color-tertiary)' }} />
        </Link>
      </div>
    </div>
  );
}

