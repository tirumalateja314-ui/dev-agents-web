import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FolderOpen, Blueprint, FileText, GitBranch } from '@phosphor-icons/react';

const PHASES = [
  {
    step: 1,
    label: 'Initialization',
    agent: 'Codebase Explorer',
    color: '#24A89C',
    title: 'You describe the project',
    userSays: '@Coordinator Initialize a new React + TypeScript project. SaaS dashboard with user auth, Stripe billing, and a team management page. Use Vite, Tailwind, Zustand. Target: production-ready.',
    agentDoes: 'Since there\'s no existing code, Explorer creates the context file structure from scratch — architecture decisions, tech stack, folder conventions, and test patterns all captured before a single line is written.',
  },
  {
    step: 2,
    label: 'Planning',
    agent: 'Architect',
    color: '#D48A2C',
    title: 'You approve the foundation plan',
    agentSays: 'New project plan ready. Proposed structure:\n  src/\n    components/   — shared UI\n    features/     — auth/, billing/, team/\n    hooks/        — shared hooks\n    stores/       — zustand slices\n  Tests co-located (*.test.tsx)\n  Auth: Supabase. Billing: Stripe Checkout.\n\n  Estimated: 12 files, 3 feature slices.\n  Approve structure?',
    userSays: 'yes, looks good',
    agentDoes: 'The Architect locks the structure into a planning doc before any code is written. Changes are free at this stage.',
  },
  {
    step: 3,
    label: 'Development',
    agent: 'Developer',
    color: '#2EBD78',
    title: 'Foundation is built',
    agentDoes: 'Developer builds the scaffolding: project setup, routing, auth hooks, Stripe integration stub, base components. Each feature gets its own folder. Tests for all new utilities are created alongside the code.',
  },
  {
    step: 4,
    label: 'Iteration',
    agent: 'Coordinator',
    color: '#F0931A',
    title: 'You add features one at a time',
    userSays: '@Coordinator Add the team management page. List all users, ability to invite by email, remove member. Use the established patterns.',
    agentDoes: '"Use the established patterns" is key — because the project was initialized first, the Developer knows the folder structure, naming conventions, and which hooks to reuse. Each new task is fast because context is already loaded.',
  },
];

const TIPS = [
  {
    icon: Blueprint,
    title: 'Initialize before the first task',
    body: 'Running @Coordinator Initialize this project on a new codebase sets up the context files. Skip this and every subsequent task starts slower.',
  },
  {
    icon: FolderOpen,
    title: '"Use established patterns"',
    body: 'Once initialized, this phrase tells the Developer to follow the conventions already in place. Saves you explaining them each time.',
  },
  {
    icon: FileText,
    title: 'Describe the full scope upfront',
    body: 'For new projects, give the Architect the whole vision first. It\'s much cheaper to plan everything at once than to restructure later.',
  },
  {
    icon: GitBranch,
    title: 'Each feature = a separate task',
    body: 'After initialization, break the project into individual tasks. Each one goes through the full pipeline. Keeps context tight and PRs reviewable.',
  },
];

export default function NewProject() {
  return (
    <div className="py-10 max-w-[48rem]">
      <Link to="/examples" className="inline-flex items-center gap-1.5 text-xs no-underline mb-8"
            style={{ color: 'var(--color-tertiary)' }}>
        <ArrowLeft size={12} weight="bold" />
        All examples
      </Link>

      <div className="mb-8">
        <span
          className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3"
          style={{ background: 'rgba(240,147,26,0.12)', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          Full project
        </span>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          Example: New project from scratch
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Starting a project with DevAgent is different from adding features to an existing one. There's no code to scan — so initialization creates the context from your description alone. The Architect plans the full structure before any code is written.
        </p>
      </div>

      {/* How it flows */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
          How it flows
        </h2>
        <div className="space-y-3">
          {PHASES.map((p) => (
            <div
              key={p.step}
              className="rounded-xl p-5"
              style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: p.color + '20', color: p.color, fontFamily: 'var(--font-mono)' }}
                >
                  {p.step}
                </div>
                <span className="text-xs font-semibold" style={{ color: p.color, fontFamily: 'var(--font-mono)' }}>
                  {p.label}  ·  {p.agent}
                </span>
              </div>
              <p className="text-sm font-semibold mb-3" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                {p.title}
              </p>

              {p.userSays && (
                <div className="rounded-lg px-4 py-2.5 mb-2"
                     style={{ background: 'var(--color-layer-2)', border: '1px solid var(--color-border)' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>YOU</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-mono)' }}>{p.userSays}</p>
                </div>
              )}
              {p.agentSays && (
                <div className="rounded-lg px-4 py-2.5 mb-2"
                     style={{ background: 'var(--color-layer-2)', border: '1px solid var(--color-border)' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: p.color, fontFamily: 'var(--font-mono)' }}>[{p.agent}]</p>
                  <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-mono)' }}>{p.agentSays}</p>
                </div>
              )}

              <p className="text-sm mt-3" style={{ color: 'var(--color-tertiary)' }}>{p.agentDoes}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
          Tips for new projects
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {TIPS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl p-5"
              style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon size={15} weight="duotone" style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>{title}</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nav */}
      <div className="pt-6 flex items-center justify-between" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Link to="/examples/bug-fix" className="flex items-center gap-2 no-underline">
          <ArrowLeft size={14} weight="bold" style={{ color: 'var(--color-tertiary)' }} />
          <div>
            <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Previous</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Bug Fix</p>
          </div>
        </Link>
        <Link to="/examples/requirement-change" className="flex items-center gap-2 no-underline">
          <div className="text-right">
            <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Next</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Requirement Change</p>
          </div>
          <ArrowRight size={14} weight="bold" style={{ color: 'var(--color-tertiary)' }} />
        </Link>
      </div>
    </div>
  );
}

