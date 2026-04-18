import { Flask } from '@phosphor-icons/react';

export default function ResearchBanner() {
  return (
    <div
      className="flex items-center justify-center gap-2 px-4 py-1.5 text-xs font-medium"
      style={{
        background: 'var(--color-accent-muted)',
        color: 'var(--color-accent)',
        borderBottom: '1px solid rgba(240, 147, 26, 0.15)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <Flask size={12} weight="bold" />
      <span>
        Research Preview — this project is evolving fast.{' '}
        <a
          href="https://github.com/tirumalateja314-ui/dev-agents"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
          style={{ color: 'var(--color-accent)' }}
        >
          Contribute on GitHub
        </a>
      </span>
    </div>
  );
}
