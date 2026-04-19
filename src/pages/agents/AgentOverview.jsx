import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { agents } from '../../data/agents';

export default function AgentOverview() {
  return (
    <div className="py-10 max-w-[48rem]">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider mb-3"
           style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          Agent Deep Dives
        </p>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          Meet the agents
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          9 AI agents, each an expert at their role. You only ever talk to the Coordinator —
          it orchestrates everything else behind the scenes.
        </p>
      </div>

      {/* Key insight callout */}
      <div
        className="flex gap-3 items-start rounded-lg px-4 py-3 text-sm mb-10"
        style={{ background: 'var(--color-accent-muted)', border: '1px solid rgba(240, 147, 26, 0.2)' }}
      >
        <span className="text-xs font-bold mt-0.5 flex-shrink-0"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
          KEY
        </span>
        <span style={{ color: 'var(--color-secondary)' }}>
          <strong style={{ color: 'var(--color-primary)' }}>You only talk to the Coordinator.</strong> It reads your request, decides which agents to run and in what order, passes information between them, and brings you the results. The other 8 agents work silently in the background.
        </span>
      </div>

      {/* Agent list */}
      <div className="space-y-3">
        {agents.map((agent, i) => (
          <Link
            key={agent.id}
            to={agent.path}
            className="group flex items-start gap-5 p-5 rounded-lg no-underline transition-all duration-150"
            style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}
          >
            {/* Number */}
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
              style={{ background: `${agent.color}18`, color: agent.color, fontFamily: 'var(--font-mono)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                  {agent.name}
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded"
                      style={{ background: 'var(--color-layer-3)', color: 'var(--color-tertiary)' }}>
                  {agent.role}
                </span>
              </div>
              <p className="text-xs mb-1" style={{ color: 'var(--color-tertiary)' }}>
                {agent.phase}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
                {agent.shortDesc}
              </p>
            </div>

            <ArrowRight
              size={14} weight="bold"
              className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-2"
              style={{ color: 'var(--color-accent)' }}
            />
          </Link>
        ))}
      </div>

      {/* How they communicate */}
      <div className="mt-12 pt-10" style={{ borderTop: '1px solid var(--color-border)' }}>
        <h2 className="text-xl font-semibold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
          How they communicate
        </h2>
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-secondary)' }}>
          Agents don't share a live chat. Instead, each agent writes its findings to a
          context file in <code className="text-xs px-1.5 py-0.5 rounded"
          style={{ background: 'var(--color-layer-2)' }}>.github/context/</code>.
          The next agent reads those files before starting work. This is how they stay in sync
          — and why you can close your editor mid-task and pick up exactly where you left off.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Coordinator writes', file: 'task-status.md' },
            { label: 'Analyst writes', file: 'requirements.md' },
            { label: 'Architect writes', file: 'implementation-plan.md' },
            { label: 'Developer writes', file: 'development-log.md' },
          ].map((item) => (
            <div key={item.file} className="rounded-lg p-3"
                 style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--color-tertiary)' }}>{item.label}</p>
              <code className="text-xs" style={{ color: 'var(--color-primary)' }}>{item.file}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

