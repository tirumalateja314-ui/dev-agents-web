import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Circle, CaretDown, CaretRight, ArrowRight, Terminal, FolderOpen, BracketsCurly, ArrowSquareOut, Warning } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatSimulator from '../components/interactive/ChatSimulator';
import { initializeScript } from '../data/chatExamples';

// ── Prereq checklist stored in localStorage ──────────────────────────────────
const PREREQS = [
  {
    id: 'vscode',
    label: 'VS Code installed',
    detail: 'Download from code.visualstudio.com — free, works on Windows, Mac, Linux.',
    link: 'https://code.visualstudio.com',
    linkLabel: 'Download VS Code',
  },
  {
    id: 'copilot',
    label: 'GitHub Copilot extension with active subscription',
    detail: 'Install from the VS Code Extensions panel (Ctrl+Shift+X). Search "GitHub Copilot". Requires a Copilot subscription (free tier works for individuals).',
    link: 'https://marketplace.visualstudio.com/items?itemName=GitHub.copilot',
    linkLabel: 'Install Copilot',
  },
  {
    id: 'project',
    label: 'A project folder (new or existing)',
    detail: 'Any folder works — an empty one for new projects, or your existing codebase.',
  },
  {
    id: 'nodejs',
    label: '(Optional) Node.js — for Jira MCP integration',
    detail: 'Only needed if you want to connect DevAgent to Jira. Download from nodejs.org.',
    optional: true,
  },
  {
    id: 'gitlab',
    label: '(Optional) GitLab account + glab CLI — for git automation',
    detail: 'Only needed for the Git phase. DevAgent works fine without it — you can handle git yourself.',
    optional: true,
  },
];

// ── Installation steps ────────────────────────────────────────────────────────
const INSTALL_STEPS = [
  {
    n: 1,
    title: 'Get the DevAgent files',
    body: 'Download or clone the DevAgent repository. You need the .github/ folder — specifically .github/agents/ and .github/prompts/.',
    code: 'git clone https://github.com/tirumalateja314-ui/dev-agents\n# or download the ZIP and extract it',
    callout: null,
  },
  {
    n: 2,
    title: 'Copy .github/ to your project root',
    body: 'Place the entire .github/ folder in the root of your project. The structure should look like this:',
    code: 'your-project/\n├── .github/\n│   ├── agents/\n│   │   ├── coordinator.md\n│   │   ├── story-analyst.md\n│   │   └── ... (9 agents)\n│   ├── prompts/\n│   │   └── process-story.prompt.md\n│   └── context/       ← created automatically\n├── src/\n└── package.json',
    callout: null,
  },
  {
    n: 3,
    title: 'Open the project in VS Code',
    body: 'Open the folder in VS Code (File → Open Folder, or drag and drop). The agents load from .github/agents/ automatically — no extension or plugin install needed.',
    code: 'code your-project/',
    callout: null,
  },
  {
    n: 4,
    title: 'Verify Coordinator appears in Copilot Chat',
    body: 'Open Copilot Chat (Ctrl+Alt+I). Click the "@" button or type "@" to see available agents. You should see "Coordinator" in the list.',
    code: null,
    callout: { type: 'warning', text: 'If Coordinator is missing: make sure .github/agents/coordinator.md exists in your project root, not in a subfolder.' },
  },
];

// First task script lives in chatExamples.js as initializeScript

function Prereqs() {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('devagent-prereqs') || '{}'); }
    catch { return {}; }
  });
  const [expanded, setExpanded] = useState({});

  const toggle = (id) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    localStorage.setItem('devagent-prereqs', JSON.stringify(next));
  };

  const toggleExpand = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div className="space-y-2">
      {PREREQS.map((p) => (
        <div
          key={p.id}
          className="rounded-lg overflow-hidden"
          style={{ border: '1px solid var(--color-border)', background: 'var(--color-layer-1)' }}
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <button
              onClick={() => toggle(p.id)}
              className="flex-shrink-0 cursor-pointer"
              aria-label={checked[p.id] ? 'Uncheck' : 'Check'}
            >
              {checked[p.id]
                ? <CheckCircle size={20} weight="fill" style={{ color: 'var(--color-success)' }} />
                : <Circle size={20} weight="regular" style={{ color: 'var(--color-tertiary)' }} />}
            </button>
            <span
              className="flex-1 text-sm font-medium cursor-pointer select-none"
              style={{ color: checked[p.id] ? 'var(--color-secondary)' : 'var(--color-primary)', textDecoration: checked[p.id] ? 'line-through' : 'none' }}
              onClick={() => toggle(p.id)}
            >
              {p.label}
            </span>
            {p.optional && (
              <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--color-layer-3)', color: 'var(--color-tertiary)' }}>
                optional
              </span>
            )}
            <button onClick={() => toggleExpand(p.id)} className="cursor-pointer" style={{ color: 'var(--color-tertiary)' }}>
              {expanded[p.id]
                ? <CaretDown size={14} weight="bold" />
                : <CaretRight size={14} weight="bold" />}
            </button>
          </div>
          <AnimatePresence>
            {expanded[p.id] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 pt-0 ml-8" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <p className="text-sm mt-3 mb-2 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
                    {p.detail}
                  </p>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium no-underline"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {p.linkLabel}
                      <ArrowSquareOut size={12} weight="bold" />
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function InstallStep({ step }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          {step.n}
        </div>
        <div className="w-px flex-1 mt-2" style={{ background: 'var(--color-border)', minHeight: '24px' }} />
      </div>
      <div className="pb-8 flex-1 min-w-0">
        <h3 className="text-base font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
          {step.title}
        </h3>
        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-secondary)' }}>
          {step.body}
        </p>
        {step.code && (
          <pre className="text-xs leading-relaxed overflow-x-auto rounded-lg p-4 mb-3"
               style={{ background: 'var(--color-layer-2)', border: '1px solid var(--color-border)', fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>
            {step.code}
          </pre>
        )}
        {step.callout && (
          <div
            className="flex gap-3 items-start rounded-lg px-4 py-3 text-sm"
            style={{ background: 'rgba(232, 160, 48, 0.08)', border: '1px solid rgba(232, 160, 48, 0.25)' }}
          >
            <Warning size={16} weight="fill" style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: '2px' }} />
            <span style={{ color: 'var(--color-secondary)' }}>{step.callout.text}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GettingStarted() {
  return (
    <div className="py-10 max-w-[48rem]">
      {/* Page header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider mb-3"
           style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          Getting Started
        </p>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          From zero to first task
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Install takes under 5 minutes. No build steps, no plugins, no configuration.
          Just copy a folder and open VS Code.
        </p>
      </div>

      {/* Section: Prerequisites */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
          Before you start
        </h2>
        <p className="text-sm mb-5" style={{ color: 'var(--color-secondary)' }}>
          Check off what you have. Your progress is saved automatically.
        </p>
        <Prereqs />
      </section>

      {/* Divider */}
      <div className="mb-12" style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* Section: Installation */}
      <section id="install" className="mb-12">
        <div className="flex items-center gap-2.5 mb-2">
          <FolderOpen size={18} weight="duotone" style={{ color: 'var(--color-accent)' }} />
          <h2 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
            Installation
          </h2>
        </div>
        <p className="text-sm mb-8" style={{ color: 'var(--color-secondary)' }}>
          No npm install. No webpack config. Just copy files.
        </p>
        {INSTALL_STEPS.map((step) => (
          <InstallStep key={step.n} step={step} />
        ))}
      </section>

      {/* Divider */}
      <div className="mb-12" style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* Section: First task */}
      <section id="first-task" className="mb-12">
        <div className="flex items-center gap-2.5 mb-2">
          <Terminal size={18} weight="duotone" style={{ color: 'var(--color-accent)' }} />
          <h2 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
            Your first task
          </h2>
        </div>
        <p className="text-sm mb-6" style={{ color: 'var(--color-secondary)' }}>
          Here's exactly what a first conversation looks like. Start with "Initialize" to let DevAgent scan your project.
        </p>

        <div className="mb-6">
          <ChatSimulator
            messages={initializeScript}
            title="GitHub Copilot Chat — @Coordinator"
          />
        </div>

        <div
          className="rounded-lg px-4 py-3 text-sm flex items-start gap-3"
          style={{ background: 'var(--color-accent-muted)', border: '1px solid rgba(240, 147, 26, 0.2)' }}
        >
          <BracketsCurly size={16} weight="bold" style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
          <span style={{ color: 'var(--color-secondary)' }}>
            <strong style={{ color: 'var(--color-primary)' }}>Tip:</strong> Say "Go with your recommendations" whenever an agent asks questions.
            It accepts all the agent's expert suggestions at once and speeds through the Q&A.
          </span>
        </div>
      </section>

      {/* Divider */}
      <div className="mb-10" style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* Next steps */}
      <section>
        <h2 className="text-xl font-semibold mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
          Next steps
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { to: '/how-it-works', label: 'How It Works', desc: 'Understand the 8 phases and how agents collaborate.' },
            { to: '/agents', label: 'Meet the Agents', desc: 'Learn what each of the 9 agents does.' },
            { to: '/guide/giving-tasks', label: 'Giving Tasks', desc: 'How to describe tasks for the best results.' },
            { to: '/reference/cheatsheet', label: 'Command Cheat Sheet', desc: 'Every phrase the Coordinator understands.' },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group block p-4 rounded-lg no-underline transition-all duration-150"
              style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                  {item.label}
                </span>
                <ArrowRight size={13} weight="bold"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--color-accent)' }} />
              </div>
              <span className="text-xs" style={{ color: 'var(--color-secondary)' }}>{item.desc}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

