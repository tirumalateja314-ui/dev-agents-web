import { Link } from 'react-router-dom';
import { ArrowRight, PencilSimple, Lightning, User, Crown } from '@phosphor-icons/react';

const SECTIONS = [
  {
    to: '/guide/giving-tasks',
    icon: PencilSimple,
    title: 'Writing Better Task Descriptions',
    description: 'The CRISP framework, quality scale with examples, and before/after comparisons.',
    color: 'var(--color-accent)',
    badge: 'Start here',
  },
  {
    to: '/hacks/non-tech',
    icon: User,
    title: 'Non-Tech User Playbook',
    description: "You don't need to understand code. Here's exactly what to focus on at each approval gate.",
    color: 'var(--color-agent-analyst)',
    badge: 'No code required',
  },
  {
    to: '/hacks/power-user',
    icon: Crown,
    title: 'Power User Playbook',
    description: 'Read context files directly, provide architecture preferences, specify test types, challenge the agents.',
    color: 'var(--color-agent-developer)',
    badge: 'Advanced',
  },
];

const ANTI_PATTERNS = [
  { avoid: 'Vague one-word tasks: "Make login"', doInstead: 'Be specific: "Build login with email/password, forgot password link, and rate limit after 5 failed attempts"' },
  { avoid: 'Skipping all approval gates', doInstead: 'At minimum, read the plan at Gate 1 — it takes 30 seconds and prevents hours of rework' },
  { avoid: 'Changing requirements after code is written', doInstead: 'Get requirements right in Phase 1. Changes after development start cause rework.' },
  { avoid: 'Ignoring agent questions', doInstead: 'Answer or say "go with your recommendations" — agents ask for a reason' },
  { avoid: 'Editing context files manually', doInstead: 'Let agents manage their own files — manual edits break the pipeline' },
  { avoid: 'Assuming the first attempt is final', doInstead: 'The review-fix cycle is normal and healthy. Rejection leads to better code.' },
];

export default function BestPractices() {
  return (
    <div className="py-10 max-w-[48rem]">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider mb-3"
           style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          Best Practices
        </p>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          Hacks & Best Practices
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          From beginner to power user. Learn the patterns that get the best results and the anti-patterns that waste time.
        </p>
      </div>

      {/* Section cards */}
      <div className="space-y-3 mb-12">
        {SECTIONS.map(({ to, icon: Icon, title, description, color, badge }) => (
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
              <div className="flex items-center gap-2 mb-1">
                <p className="text-base font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                  {title}
                </p>
                <span className="text-xs px-1.5 py-0.5 rounded-full"
                      style={{ background: color + '18', color, fontFamily: 'var(--font-mono)' }}>
                  {badge}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
                {description}
              </p>
            </div>
            <ArrowRight size={15} weight="bold" className="flex-shrink-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: 'var(--color-accent)' }} />
          </Link>
        ))}
      </div>

      {/* Anti-patterns */}
      <section>
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Anti-patterns — what not to do
        </h2>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          These patterns look harmless but consistently lead to worse results.
        </p>
        <div className="space-y-2">
          {ANTI_PATTERNS.map(({ avoid, doInstead }) => (
            <div key={avoid} className="grid grid-cols-2 gap-0 rounded-xl overflow-hidden"
                 style={{ border: '1px solid var(--color-border)' }}>
              <div className="p-4" style={{ background: 'rgba(212,68,82,0.05)', borderRight: '1px solid var(--color-border)' }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                   style={{ color: 'var(--color-agent-tester)', fontFamily: 'var(--font-mono)' }}>Avoid</p>
                <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>{avoid}</p>
              </div>
              <div className="p-4" style={{ background: 'rgba(46,189,120,0.05)' }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                   style={{ color: 'var(--color-agent-developer)', fontFamily: 'var(--font-mono)' }}>Instead</p>
                <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>{doInstead}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

