import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardText, CheckSquare, ArrowsClockwise, Lightning, Question } from '@phosphor-icons/react';

const SECTIONS = [
  {
    to: '/guide/giving-tasks',
    icon: ClipboardText,
    title: 'Giving Tasks',
    description: 'How to describe tasks effectively. Quality scale, magic phrases, and Jira integration.',
    color: 'var(--color-accent)',
  },
  {
    to: '/guide/approvals',
    icon: CheckSquare,
    title: 'Answering Questions & Approvals',
    description: 'When agents ask questions, how to respond. What to look for at each approval gate.',
    color: 'var(--color-agent-developer)',
  },
  {
    to: '/guide/scenarios',
    icon: ArrowsClockwise,
    title: 'Common Scenarios',
    description: 'Visual flowcharts for happy path, bug found in testing, reviewer rejects, mid-task change, and more.',
    color: 'var(--color-agent-analyst)',
  },
  {
    to: '/guide/troubleshooting',
    icon: Question,
    title: 'Troubleshooting & FAQ',
    description: 'Agent stuck? Confused by a question? Closing VS Code mid-task? Find answers here.',
    color: 'var(--color-agent-tester)',
  },
];

export default function UserGuide() {
  return (
    <div className="py-10 max-w-[48rem]">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider mb-3"
           style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          User Guide
        </p>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          Using DevAgent day-to-day
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Practical guides for every interaction. From describing your first task to handling mid-task changes — everything you need to work effectively with DevAgent.
        </p>
      </div>

      <div className="space-y-3">
        {SECTIONS.map(({ to, icon: Icon, title, description, color }) => (
          <Link
            key={to}
            to={to}
            className="group flex items-start gap-5 p-5 rounded-xl no-underline transition-all duration-150"
            style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                 style={{ background: color + '18' }}>
              <Icon size={20} weight="bold" style={{ color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold mb-1" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                {title}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
                {description}
              </p>
            </div>
            <ArrowRight
              size={15}
              weight="bold"
              className="flex-shrink-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: 'var(--color-accent)' }}
            />
          </Link>
        ))}
      </div>

      {/* Quick tip */}
      <div className="mt-8 rounded-xl p-5"
           style={{ background: 'var(--color-accent-muted)', border: '1px solid rgba(240, 147, 26, 0.2)' }}>
        <p className="text-xs font-semibold uppercase tracking-wider mb-2"
           style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
          Quick start
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          New to DevAgent? Start with <Link to="/guide/giving-tasks" style={{ color: 'var(--color-accent)' }} className="no-underline font-medium">Giving Tasks</Link> to learn how to describe what you want, then read <Link to="/guide/approvals" style={{ color: 'var(--color-accent)' }} className="no-underline font-medium">Approvals</Link> to understand what you'll see at each checkpoint.
        </p>
      </div>
    </div>
  );
}

