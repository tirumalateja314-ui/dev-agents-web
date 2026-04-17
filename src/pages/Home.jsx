import { Link } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, Eye,
  GitBranch, Gear, Terminal, CheckCircle,
  Cpu, ClipboardText, TestTube, MagnifyingGlass, GitPullRequest, Warning, ArrowSquareOut,
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { agents } from '../data/agents';
import SectionWrapper from '../components/layout/SectionWrapper';
import TerminalMockup from '../components/interactive/TerminalMockup';
import DevAgentLogo from '../components/utility/DevAgentLogo';

const PAIN_POINTS = [
  {
    icon: <ClipboardText size={18} weight="duotone" />,
    pain: 'Writing tickets nobody reads',
    fix: 'Story Analyst turns your sentence into full requirements — acceptance criteria, edge cases, out-of-scope.',
  },
  {
    icon: <Cpu size={18} weight="duotone" />,
    pain: 'Architecture debates that slow everything down',
    fix: 'Architect Planner proposes a concrete plan with risks. You approve or redirect in one message.',
  },
  {
    icon: <TestTube size={18} weight="duotone" />,
    pain: '"I\'ll write tests later" — and later never comes',
    fix: 'Tester writes tests before you even review the code. It\'s not optional. It\'s the pipeline.',
  },
  {
    icon: <MagnifyingGlass size={18} weight="duotone" />,
    pain: 'Code reviews that take 3 days',
    fix: 'Reviewer runs a full review — security, logic, edge cases — before the PR even opens.',
  },
  {
    icon: <GitPullRequest size={18} weight="duotone" />,
    pain: 'Losing context between sessions',
    fix: 'Context files persist everything. Restart VS Code, pick up exactly where you left off.',
  },
  {
    icon: <Warning size={18} weight="duotone" />,
    pain: 'Changes that break things quietly',
    fix: '4 approval gates. Nothing moves forward without your explicit "go ahead".',
  },
];

const SCENARIOS = [
  {
    persona: 'Solo dev',
    before: "You're writing the ticket, doing the architecture, coding, testing, reviewing, and making the PR — all alone.",
    after: 'You write one sentence. The pipeline handles everything between that and a reviewed PR.',
  },
  {
    persona: 'Non-technical founder',
    before: 'You describe a feature in plain English. Your developer interprets it (sometimes wrong). You review it 2 weeks later.',
    after: 'You type what you want. Story Analyst surfaces every ambiguity upfront. No surprises at the end.',
  },
  {
    persona: 'Team lead',
    before: 'Junior devs need constant review, questions, and hand-holding on every task.',
    after: 'DevAgent acts as a senior pair — architecture, tests, review. Your juniors ship production-quality work.',
  },
];

const STEPS = [
  {
    n: '01',
    title: 'Describe what you want',
    body: "One sentence, a Jira link, or a paragraph. Story Analyst clarifies ambiguities before a line of code is written.",
    example: '"Add a user profile page with avatar upload and bio editing"',
  },
  {
    n: '02',
    title: 'Approve the plan',
    body: 'Architect Planner proposes the approach, files to change, and risks. You approve, adjust, or redirect. Nothing starts without your sign-off.',
    example: 'You see: files, approach, risks. You say: "Go with your recommendations."',
  },
  {
    n: '03',
    title: 'Get working, reviewed code',
    body: 'Developer writes it. Tester writes tests. Reviewer runs a full review. Optionally, Git Manager opens a PR — all automated.',
    example: 'Tested. Reviewed. PR ready. You approved 3 decisions total.',
  },
];

const COMPARISON = [
  ['What you need', 'Copilot / Chat AI', 'DevAgent'],
  ['Requirements analysis', '—', '✓ Story Analyst'],
  ['Architecture plan + risks', '—', '✓ Architect'],
  ['Code written', '✓', '✓ Developer'],
  ['Tests always written', 'Manual', '✓ Always'],
  ['Code review', 'Manual', '✓ Reviewer'],
  ['Context across sessions', '✗ Lost', '✓ Context files'],
  ['Approval gates', '—', '✓ 4 gates'],
  ['Git / PR automation', '—', '✓ Git Manager'],
];

const STATS = [
  { value: '9', label: 'AI agents' },
  { value: '4', label: 'Approval gates' },
  { value: '~5 min', label: 'To install' },
  { value: '0', label: 'Config needed' },
];

export default function Home() {
  return (
    <div>

      {/* HERO */}
      <section className="max-w-[60rem] mx-auto px-6 pt-16 pb-12">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full mb-6"
                style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)', border: '1px solid rgba(240, 147, 26, 0.25)', fontFamily: 'var(--font-mono)' }}>
                <Terminal size={12} weight="bold" />
                9 agents &nbsp;·&nbsp; inside VS Code &nbsp;·&nbsp; free to use
              </span>
            </motion.div>

            <motion.h1 className="text-[2rem] lg:text-[2.6rem] font-bold leading-[1.08] mb-5"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.038em', color: 'var(--color-primary)' }}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay: 0.05 }}>
              Stop doing<br />
              <span style={{ color: 'var(--color-accent)' }}>everyone's job.</span>
            </motion.h1>

            <motion.p className="text-base leading-relaxed mb-4 max-w-[30rem]"
              style={{ color: 'var(--color-secondary)' }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}>
              You're already the product manager, the architect, the developer, the QA, and the reviewer — all at once.
              DevAgent gives you a full AI team so you can <strong style={{ color: 'var(--color-primary)' }}>just build.</strong>
            </motion.p>

            <motion.p className="text-sm leading-relaxed mb-9 max-w-[30rem]"
              style={{ color: 'var(--color-tertiary)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, delay: 0.15 }}>
              Describe a task. 9 agents handle requirements, architecture, code, tests, and review — inside VS Code, with your approval at every gate.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-3 mb-10"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.18 }}>
              <Link to="/getting-started"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold no-underline transition-all duration-150 hover:brightness-110"
                style={{ background: 'var(--color-accent)', color: '#fff' }}>
                Set it up — 5 minutes
                <ArrowRight size={14} weight="bold" />
              </Link>
              <Link to="/how-it-works"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium no-underline transition-all duration-150 hover:bg-[var(--color-layer-2)]"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-secondary)' }}>
                See how it works
              </Link>
            </motion.div>

            <motion.div className="flex flex-wrap items-center gap-5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.25 }}>
              {['No npm install', 'No plugins', 'Works on any codebase', 'Free to use'].map((s) => (
                <span key={s} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-tertiary)' }}>
                  <CheckCircle size={12} weight="fill" style={{ color: 'var(--color-success)' }} />
                  {s}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
            <TerminalMockup />
          </motion.div>
        </div>
      </section>

      {/* STATS BAR */}
      <SectionWrapper>
        <div className="max-w-[60rem] mx-auto px-6">
          <div className="rounded-xl border py-5 px-8"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-layer-1)' }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col items-center text-center">
                  <span className="text-2xl font-bold leading-none mb-1"
                    style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>{s.value}</span>
                  <span className="text-xs" style={{ color: 'var(--color-tertiary)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* PAIN SECTION */}
      <SectionWrapper>
        <div className="border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="max-w-[60rem] mx-auto px-6 py-14">
            <div className="max-w-[34rem] mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>THE REAL COST</p>
              <h2 className="text-xl lg:text-2xl font-bold mb-3 leading-tight"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                Every feature ships with invisible overhead you pay alone
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
                You're not slow. The process is broken. Writing tickets, planning architecture, writing tests,
                doing code review — these are full-time jobs. DevAgent does them.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PAIN_POINTS.map(({ icon, pain, fix }) => (
                <div key={pain} className="rounded-xl p-5"
                  style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span style={{ color: 'var(--color-danger)' }}>{icon}</span>
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>{pain}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={14} weight="fill" style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: 2 }} />
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-secondary)' }}>{fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* SCENARIOS */}
      <SectionWrapper>
        <div className="border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="max-w-[60rem] mx-auto px-6 py-14">
            <div className="max-w-[34rem] mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>SOUND FAMILIAR?</p>
              <h2 className="text-xl lg:text-2xl font-bold leading-tight"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>This is how it changes</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {SCENARIOS.map(({ persona, before, after }) => (
                <div key={persona} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
                  <div className="px-5 py-3" style={{ background: 'var(--color-layer-2)', borderBottom: '1px solid var(--color-border)' }}>
                    <span className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>{persona}</span>
                  </div>
                  <div className="p-5 space-y-4" style={{ background: 'var(--color-layer-1)' }}>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5"
                        style={{ color: 'var(--color-danger)', fontFamily: 'var(--font-mono)' }}>Before</p>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--color-secondary)' }}>{before}</p>
                    </div>
                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                      <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5"
                        style={{ color: 'var(--color-success)', fontFamily: 'var(--font-mono)' }}>With DevAgent</p>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--color-secondary)' }}>{after}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* HOW IT WORKS */}
      <SectionWrapper>
        <div className="border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="max-w-[60rem] mx-auto px-6 py-14">
            <div className="max-w-[34rem] mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>THE PIPELINE</p>
              <h2 className="text-xl lg:text-2xl font-bold leading-tight"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                One sentence in. Reviewed code out.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {STEPS.map((step, i) => (
                <div key={step.n} className="relative">
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-full w-6 h-px z-10"
                      style={{ background: 'var(--color-border)' }} />
                  )}
                  <div className="rounded-xl p-6 h-full"
                    style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
                    <div className="text-xs font-bold mb-5 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ color: 'var(--color-accent)', background: 'var(--color-accent-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                      {step.n}
                    </div>
                    <h3 className="text-base font-semibold mb-2"
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>{step.title}</h3>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--color-secondary)' }}>{step.body}</p>
                    <div className="rounded-lg px-3 py-2 text-xs leading-relaxed"
                      style={{ background: 'var(--color-layer-2)', border: '1px solid var(--color-border)', color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)', fontStyle: 'italic' }}>
                      {step.example}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/how-it-works" className="inline-flex items-center gap-2 text-sm no-underline"
                style={{ color: 'var(--color-accent)' }}>
                Full pipeline walkthrough <ArrowRight size={13} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* AGENTS */}
      <SectionWrapper>
        <div className="border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="max-w-[60rem] mx-auto px-6 py-14">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>THE TEAM</p>
                <h2 className="text-xl font-bold leading-tight mb-2"
                  style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                  9 specialists. You talk to one.
                </h2>
                <p className="text-sm max-w-[28rem]" style={{ color: 'var(--color-secondary)' }}>
                  You only ever message the Coordinator. It assigns the right agent for each task automatically.
                </p>
              </div>
              <Link to="/agents" className="text-sm no-underline hidden sm:flex items-center gap-1.5 flex-shrink-0"
                style={{ color: 'var(--color-accent)' }}>
                Deep dives <ArrowRight size={13} weight="bold" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {agents.map((agent, i) => (
                <AgentCard key={agent.id} agent={agent} index={i} />
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* COMPARISON */}
      <SectionWrapper>
        <div className="border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="max-w-[60rem] mx-auto px-6 py-14">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>THE DIFFERENCE</p>
                <h2 className="text-xl lg:text-2xl font-bold leading-tight mb-4"
                  style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                  Not a chat window. A pipeline.
                </h2>
                <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--color-secondary)' }}>
                  Chat AI gives you a box to type in. DevAgent gives you a structured workflow —
                  analyst, architect, developer, tester, reviewer — each running at the right time,
                  in the right order. Quality is built in.
                </p>
                <div className="space-y-3">
                  {[
                    { icon: <ShieldCheck size={15} weight="bold" />, text: '4 mandatory approval gates — nothing ships without your say' },
                    { icon: <Eye size={15} weight="bold" />, text: 'Every decision logged in context files — full transparency' },
                    { icon: <Gear size={15} weight="bold" />, text: 'Reads your codebase first — adapts to your stack and conventions' },
                    { icon: <GitBranch size={15} weight="bold" />, text: 'Optional GitLab MR automation built in from day one' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-start gap-3">
                      <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 2 }}>{icon}</span>
                      <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <ComparisonTable />
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* QUOTE */}
      <SectionWrapper>
        <div className="border-b" style={{ borderColor: 'var(--color-border)', background: 'var(--color-layer-1)' }}>
          <div className="max-w-[60rem] mx-auto px-6 py-12 text-center">
            <div className="max-w-[40rem] mx-auto">
              <p className="text-xl lg:text-2xl font-bold leading-snug mb-5"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em', color: 'var(--color-primary)' }}>
                "You type one sentence. DevAgent handles everything between that sentence and a reviewed, tested PR."
              </p>
              <div className="flex items-center justify-center gap-3">
                <DevAgentLogo size={24} />
                <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                  DevAgent
                </span>
                <span className="text-sm" style={{ color: 'var(--color-tertiary)' }}>— the whole point</span>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <div className="max-w-[60rem] mx-auto px-6 py-14">
          <div className="rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
            style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
            <div className="max-w-[32rem]">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>READY?</p>
              <h2 className="text-xl lg:text-2xl font-bold mb-3 leading-tight"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                Set it up in 5 minutes.<br />Run your first task today.
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
                Copy one folder to your project. Open VS Code. Type "Initialize" to @Coordinator.
                That's your entire setup.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link to="/getting-started"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold no-underline transition-all duration-150 hover:brightness-110"
                style={{ background: 'var(--color-accent)', color: '#fff' }}>
                Get started
                <ArrowRight size={14} weight="bold" />
              </Link>
              <a href="https://github.com/tirumalateja314-ui/dev-agents" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium no-underline transition-all duration-150 hover:bg-[var(--color-layer-2)]"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-secondary)' }}>
                View on GitHub
                <ArrowSquareOut size={13} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </SectionWrapper>

    </div>
  );
}

function AgentCard({ agent, index }) {
  return (
    <Link to={agent.path} className="group block p-4 rounded-lg no-underline transition-all duration-150"
      style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold"
          style={{ background: `${agent.color}22`, color: agent.color, fontFamily: 'var(--font-mono)' }}>
          {String(index + 1).padStart(2, '0')}
        </div>
        <ArrowRight size={14} weight="bold"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 mt-0.5"
          style={{ color: 'var(--color-tertiary)' }} />
      </div>
      <p className="text-sm font-semibold mb-0.5"
        style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>{agent.name}</p>
      <p className="text-xs mb-2" style={{ color: 'var(--color-tertiary)' }}>{agent.role}</p>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--color-secondary)' }}>{agent.shortDesc}</p>
    </Link>
  );
}

function ComparisonTable() {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
      {COMPARISON.map(([feature, chat, da], i) => (
        <div key={feature} className="grid grid-cols-3"
          style={{
            background: i === 0 ? 'var(--color-layer-2)' : i % 2 === 0 ? 'var(--color-layer-1)' : 'transparent',
            borderBottom: i < COMPARISON.length - 1 ? '1px solid var(--color-border)' : 'none',
          }}>
          <div className="px-4 py-3">
            <span className="text-xs" style={{ color: i === 0 ? 'var(--color-tertiary)' : 'var(--color-secondary)', fontFamily: i === 0 ? 'var(--font-mono)' : 'inherit' }}>
              {feature}
            </span>
          </div>
          <div className="px-4 py-3 text-center border-x" style={{ borderColor: 'var(--color-border)' }}>
            <span className="text-xs" style={{
              color: i === 0 ? 'var(--color-tertiary)' : (chat === '—' || chat === '✗ Lost') ? 'var(--color-danger)' : 'var(--color-secondary)',
              fontFamily: i === 0 ? 'var(--font-mono)' : 'inherit',
            }}>{chat}</span>
          </div>
          <div className="px-4 py-3 text-center">
            <span className="text-xs font-semibold" style={{
              color: i === 0 ? 'var(--color-tertiary)' : 'var(--color-accent)',
              fontFamily: i === 0 ? 'var(--font-mono)' : 'var(--font-heading)',
            }}>{da}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
