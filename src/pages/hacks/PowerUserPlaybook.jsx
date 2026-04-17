import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Blueprint, TestTube, FolderOpen } from '@phosphor-icons/react';

const TIPS = [
  {
    category: 'Input quality',
    icon: Blueprint,
    color: '#D48A2C',
    items: [
      { tip: 'Reference existing files', detail: '"Follow the pattern in src/services/userService.ts" → Developer matches your conventions precisely.' },
      { tip: 'Provide architecture preferences upfront', detail: '"Use hexagonal architecture" or "Follow the repository pattern we already use" → Architect incorporates it automatically.' },
      { tip: 'Mention non-functional requirements', detail: '"Must handle 1000 concurrent users" or "Response time under 200ms" → Architect plans for performance.' },
      { tip: 'Share design links', detail: '"Figma: [url]" → Agents can read web pages and extract design details.' },
    ],
  },
  {
    category: 'Testing control',
    icon: TestTube,
    color: '#D44458',
    items: [
      { tip: 'Specify test scenarios upfront', detail: '"Make sure to test empty input and SQL injection attempts" → Tester includes them in the test plan.' },
      { tip: 'Request specific test types', detail: '"Include integration tests, not just unit tests" → Tester prioritizes integration coverage.' },
      { tip: 'Mention acceptance criteria', detail: '"It should return 400 for invalid email" → Tester writes that exact assertion.' },
    ],
  },
  {
    category: 'Context files',
    icon: FolderOpen,
    color: '#24A89C',
    items: [
      { tip: 'Read context files directly', detail: 'Open .github/context/ in VS Code — codebase-intel.md, requirements.md, implementation-plan.md are all readable.' },
      { tip: 'Check what agents know', detail: '"Show me the current requirements" → Coordinator reads requirements.md and shows you exactly what agents are working from.' },
      { tip: 'codebase-intel.md persists', detail: 'This file survives between tasks. If your project changes significantly, say "Re-scan the codebase" to update it.' },
    ],
  },
  {
    category: 'Workflow control',
    icon: Code,
    color: '#2EBD78',
    items: [
      { tip: 'Challenge agent decisions', detail: '"Why did you choose this approach over X?" → Agent explains its reasoning. Push back if you disagree.' },
      { tip: 'Ask for alternatives', detail: '"Show me 3 different approaches" → Get informed options before committing to a plan.' },
      { tip: 'Specify commit granularity', detail: '"I want atomic commits per feature area" → Git Manager follows your convention.' },
      { tip: 'Break complex tasks yourself', detail: '"Let\'s do this in 3 parts: first [A], then [B], then [C]" → Coordinator runs them sequentially.' },
    ],
  },
];

const SPEED_HACKS = [
  { hack: '"Go with your recommendations"', effect: 'Skip all Story Analyst Q&A when the task is clear' },
  { hack: '"approve"', effect: 'Single-word approval for any gate' },
  { hack: '"skip git"', effect: 'Handle version control yourself after review' },
  { hack: '"Process [Jira link]"', effect: 'One command starts the full pipeline with ticket context' },
  { hack: '"Initialize and then build [X]"', effect: 'Combine first-time setup with your first task' },
  { hack: '"Approve all, proceed to git"', effect: 'Batch approval at the review stage' },
];

export default function PowerUserPlaybook() {
  return (
    <div className="py-10 max-w-[48rem]">
      <Link to="/hacks" className="inline-flex items-center gap-1.5 text-xs no-underline mb-8"
            style={{ color: 'var(--color-tertiary)' }}>
        <ArrowLeft size={12} weight="bold" />
        Best Practices
      </Link>

      <div className="mb-10">
        <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3"
              style={{ background: 'rgba(46,189,120,0.12)', color: 'var(--color-agent-developer)', fontFamily: 'var(--font-mono)' }}>
          Advanced
        </span>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          Power User Playbook
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Techniques that go beyond the basics. Get better output, move faster, and understand exactly what the agents are doing.
        </p>
      </div>

      {/* Speed hacks */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Speed hacks</h2>
        <p className="text-sm mb-4" style={{ color: 'var(--color-secondary)' }}>Phrases that skip steps or batch actions:</p>
        <div className="space-y-2">
          {SPEED_HACKS.map(({ hack, effect }) => (
            <div key={hack} className="flex gap-4 items-start rounded-lg px-4 py-3"
                 style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
              <code className="text-xs px-2 py-1 rounded flex-shrink-0"
                    style={{ background: 'var(--color-layer-3)', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
                {hack}
              </code>
              <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>{effect}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Power tips by category */}
      {TIPS.map(({ category, icon: Icon, color, items }) => (
        <section key={category} className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Icon size={16} weight="bold" style={{ color }} />
            <h2 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              {category}
            </h2>
          </div>
          <div className="space-y-2">
            {items.map(({ tip, detail }) => (
              <div key={tip} className="rounded-xl p-4"
                   style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>{tip}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>{detail}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

