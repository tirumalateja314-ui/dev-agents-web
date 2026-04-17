import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, UsersFour, Lightbulb, Eye, GitBranch, Gear, Terminal } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { agents } from '../data/agents';
import SectionWrapper from '../components/layout/SectionWrapper';
import TerminalMockup from '../components/interactive/TerminalMockup';

export default function Home() {
  return (
    <div>
      {/* Hero — left-aligned split layout */}
      <section className="max-w-[80rem] mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          {/* Left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <span
                className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full mb-6"
                style={{
                  background: 'var(--color-accent-muted)',
                  color: 'var(--color-accent)',
                  border: '1px solid rgba(240, 147, 26, 0.2)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <Terminal size={12} weight="bold" />
                v1.0 &nbsp;&middot;&nbsp; 8 agents &nbsp;&middot;&nbsp; VS Code
              </span>
            </motion.div>

            <motion.h1
              className="text-[2.6rem] lg:text-[3.4rem] font-bold leading-[1.05] mb-5"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.035em', color: 'var(--color-primary)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              Your AI dev team,<br />
              <span style={{ color: 'var(--color-accent)' }}>already at work.</span>
            </motion.h1>

            <motion.p
              className="text-base leading-relaxed mb-9 max-w-[30rem]"
              style={{ color: 'var(--color-secondary)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              8 AI agents that work like a real dev team — analyst, architect, developer,
              tester, reviewer. You describe what you want. They build it, test it, and
              review it. You approve and move on.
            </motion.p>

            <motion.div
              className="flex items-center gap-3 mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
            >
              <Link
                to="/getting-started"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold no-underline transition-all duration-150"
                style={{ background: 'var(--color-accent)', color: '#fff' }}
              >
                Get started
                <ArrowRight size={14} weight="bold" />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium no-underline transition-all duration-150"
                style={{
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-secondary)',
                  background: 'transparent',
                }}
              >
                See how it works
              </Link>
            </motion.div>

            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.2 }}
            >
              {['5 approval gates', 'Works with any project', 'No coding required'].map((s) => (
                <span key={s} className="text-xs" style={{ color: 'var(--color-tertiary)' }}>
                  {s}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: terminal animation */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <TerminalMockup />
          </motion.div>
        </div>
      </section>

      {/* Agents grid */}
      <SectionWrapper>
        <div
          className="border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div className="max-w-[80rem] mx-auto px-6 py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-1.5" style={{ fontFamily: 'var(--font-heading)' }}>
                  Meet the team
                </h2>
                <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>
                  8 agents, each expert at their role. You only ever talk to the Coordinator.
                </p>
              </div>
              <Link
                to="/agents"
                className="text-sm no-underline hidden sm:flex items-center gap-1.5"
                style={{ color: 'var(--color-accent)' }}
              >
                All agents <ArrowRight size={13} weight="bold" />
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

      {/* How it's different */}
      <SectionWrapper>
        <div className="border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="max-w-[80rem] mx-auto px-6 py-16">
            <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
              <div>
                <h2 className="text-xl font-semibold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  Not just another AI assistant
                </h2>
                <p className="text-sm leading-relaxed max-w-[30rem]" style={{ color: 'var(--color-secondary)' }}>
                  Most AI coding tools are a single chat window. DevAgent is a structured
                  pipeline — from requirements to deployment — with quality gates at every step.
                </p>
              </div>
              <ComparisonPanel />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* How it works — numbered steps */}
      <SectionWrapper>
        <div className="border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="max-w-[80rem] mx-auto px-6 py-16">
            <h2 className="text-xl font-semibold mb-10" style={{ fontFamily: 'var(--font-heading)' }}>
              How it works
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {STEPS.map((step, i) => (
                <StepCard key={step.title} step={step} index={i} />
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <div className="border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="max-w-[80rem] mx-auto px-6 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-1.5" style={{ fontFamily: 'var(--font-heading)' }}>
                Start your first task
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>
                Copy the agent files to your repo. Open VS Code. Type "Initialize".
              </p>
            </div>
            <Link
              to="/getting-started"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold no-underline flex-shrink-0 transition-all duration-150"
              style={{ background: 'var(--color-accent)', color: '#fff' }}
            >
              Get started
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}

/* ---------- sub-components ---------- */

function AgentCard({ agent, index }) {
  return (
    <Link
      to={agent.path}
      className="group block p-4 rounded-lg no-underline transition-all duration-150"
      style={{
        background: 'var(--color-layer-1)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold"
          style={{ background: `${agent.color}22`, color: agent.color, fontFamily: 'var(--font-mono)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
        <ArrowRight
          size={14}
          weight="bold"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 mt-0.5"
          style={{ color: 'var(--color-tertiary)' }}
        />
      </div>
      <p
        className="text-sm font-semibold mb-0.5"
        style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}
      >
        {agent.name}
      </p>
      <p className="text-xs mb-2" style={{ color: 'var(--color-tertiary)' }}>
        {agent.role}
      </p>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
        {agent.shortDesc}
      </p>
    </Link>
  );
}

function ComparisonPanel() {
  const rows = [
    ['Feature', 'Chat AI', 'DevAgent'],
    ['Requirements', '—', 'Story Analyst'],
    ['Architecture plan', '—', 'Architect'],
    ['Code review', '—', 'Reviewer'],
    ['Tests written', 'Sometimes', 'Always'],
    ['Approval gates', '—', '5 gates'],
    ['Context memory', 'Lost on restart', 'Context files'],
  ];
  return (
    <div
      className="rounded-lg overflow-hidden text-xs"
      style={{ border: '1px solid var(--color-border)' }}
    >
      {rows.map(([feature, chat, da], i) => (
        <div
          key={feature}
          className="grid grid-cols-3 px-4 py-2.5"
          style={{
            background: i === 0 ? 'var(--color-layer-2)' : i % 2 === 0 ? 'var(--color-layer-1)' : 'transparent',
            borderBottom: i < rows.length - 1 ? '1px solid var(--color-border)' : 'none',
          }}
        >
          <span style={{ color: i === 0 ? 'var(--color-tertiary)' : 'var(--color-secondary)', fontFamily: i === 0 ? 'var(--font-mono)' : 'inherit' }}>
            {feature}
          </span>
          <span
            className="text-center"
            style={{ color: i === 0 ? 'var(--color-tertiary)' : chat === '—' ? 'var(--color-danger)' : 'var(--color-secondary)', fontFamily: i === 0 ? 'var(--font-mono)' : 'inherit' }}
          >
            {chat}
          </span>
          <span
            className="text-center"
            style={{ color: i === 0 ? 'var(--color-tertiary)' : 'var(--color-accent)', fontFamily: i === 0 ? 'var(--font-mono)' : 'var(--font-heading)', fontWeight: i === 0 ? 400 : 600 }}
          >
            {da}
          </span>
        </div>
      ))}
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div
      className="p-5 rounded-lg"
      style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}
    >
      <div className="text-sm font-semibold flex items-center gap-2.5 mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
        <span style={{ color: 'var(--color-accent)' }}>{icon}</span>
        {title}
      </div>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
        {description}
      </p>
    </div>
  );
}

function StepCard({ step, index }) {
  return (
    <div
      className="p-6 rounded-lg"
      style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}
    >
      <div
        className="text-xs font-bold mb-4"
        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}
      >
        STEP {String(index + 1).padStart(2, '0')}
      </div>
      <h3 className="text-base font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
        {step.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
        {step.description}
      </p>
    </div>
  );
}

/* ---------- static data ---------- */

const FEATURES = [
  {
    icon: <ShieldCheck size={16} weight="bold" />,
    title: 'Approval at every gate',
    description: '5 mandatory checkpoints. Nothing ships without your explicit sign-off.',
  },
  {
    icon: <UsersFour size={16} weight="bold" />,
    title: 'Plain-language first',
    description: 'No tech jargon. Every agent explains its work and gives recommendations.',
  },
  {
    icon: <Lightbulb size={16} weight="bold" />,
    title: 'Built-in quality',
    description: 'Tests, code review, and security analysis run automatically — every task.',
  },
  {
    icon: <Eye size={16} weight="bold" />,
    title: 'Full transparency',
    description: 'Decisions are logged in context files. Ask for a status update any time.',
  },
  {
    icon: <Gear size={16} weight="bold" />,
    title: 'Any codebase',
    description: 'Reads your project structure first. Adapts to your conventions and stack.',
  },
  {
    icon: <GitBranch size={16} weight="bold" />,
    title: 'Git, your way',
    description: 'Full GitLab MR workflow built in. Or skip git and handle it yourself.',
  },
];

const STEPS = [
  {
    title: 'Describe your task',
    description: 'Tell the Coordinator what you want to build, fix, or change. Use plain English, a Jira link, or both.',
  },
  {
    title: 'Review and approve',
    description: "Agents plan, code, test, and review. You approve at each gate. Reject and redirect if anything's off.",
  },
  {
    title: 'Get working software',
    description: 'Tested, reviewed, documented code. Optionally a GitLab merge request ready to ship.',
  },
];

