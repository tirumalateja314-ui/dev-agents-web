import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';

const EXAMPLES = [
  {
    to: '/examples/simple-feature',
    title: 'Building a Feature',
    description: 'A product manager asks for email validation. Walk through all 8 phases with approval gates.',
    badge: 'Full pipeline',
    color: 'var(--color-agent-developer)',
  },
  {
    to: '/examples/bug-fix',
    title: 'Fixing a Bug',
    description: 'A 500 error on /api/users when the database times out. Diagnosis, fix, tests, review, and push.',
    badge: 'Bug fix',
    color: 'var(--color-agent-tester)',
  },
  {
    to: '/examples/requirement-change',
    title: 'Requirement Change Mid-Task',
    description: 'You change the token expiry mid-task. See how the system re-analyzes impact and revises the plan.',
    badge: 'Mid-task change',
    color: 'var(--color-agent-analyst)',
  },
];

export default function Examples() {
  return (
    <div className="py-10 max-w-[48rem]">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider mb-3"
           style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          Examples
        </p>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          Learn by watching
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Interactive conversation walkthroughs. Press Play on any example to watch a real session unfold, one message at a time.
        </p>
      </div>

      <div className="space-y-3">
        {EXAMPLES.map((ex) => (
          <Link
            key={ex.to}
            to={ex.to}
            className="group flex items-start gap-4 p-5 rounded-xl no-underline transition-all duration-150"
            style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: ex.color + '18', color: ex.color, fontFamily: 'var(--font-mono)' }}
                >
                  {ex.badge}
                </span>
              </div>
              <p className="text-base font-semibold mb-1" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                {ex.title}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
                {ex.description}
              </p>
            </div>
            <ArrowRight
              size={16}
              weight="bold"
              className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: 'var(--color-accent)' }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

