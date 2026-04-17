import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check } from '@phosphor-icons/react';
import { commands } from '../../data/commands';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="flex-shrink-0 p-1 rounded transition-opacity"
      style={{ background: 'transparent', opacity: 0.6 }}
    >
      {copied
        ? <Check size={12} weight="bold" style={{ color: 'var(--color-agent-developer)' }} />
        : <Copy size={12} style={{ color: 'var(--color-tertiary)' }} />}
    </button>
  );
}

export default function CheatSheet() {
  return (
    <div className="py-10 max-w-[48rem]">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider mb-3"
           style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          Reference
        </p>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          Command cheat sheet
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Every phrase the Coordinator understands, grouped by purpose. Click the copy icon to copy any command.
        </p>
      </div>

      <div className="space-y-8">
        {commands.map((group) => (
          <section key={group.category}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3"
               style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
              {group.category}
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
              {group.items.map((item, i) => (
                <div
                  key={item.command}
                  className="flex items-start gap-4 px-5 py-3"
                  style={{
                    background: 'var(--color-layer-1)',
                    borderBottom: i < group.items.length - 1 ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  <div className="flex items-center gap-2 w-56 flex-shrink-0">
                    <code
                      className="text-xs px-2 py-1 rounded"
                      style={{ background: 'var(--color-layer-3)', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}
                    >
                      {item.command}
                    </code>
                    <CopyButton text={item.command} />
                  </div>
                  <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="pt-8 flex items-center justify-between" style={{ borderTop: '1px solid var(--color-border)', marginTop: '2.5rem' }}>
        <Link to="/reference/rules" className="flex items-center gap-2 no-underline">
          <ArrowLeft size={14} weight="bold" style={{ color: 'var(--color-tertiary)' }} />
          <div>
            <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Previous</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Global Rules</p>
          </div>
        </Link>
        <Link to="/reference/glossary" className="flex items-center gap-2 no-underline">
          <div className="text-right">
            <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Next</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Glossary</p>
          </div>
          <ArrowRight size={14} weight="bold" style={{ color: 'var(--color-tertiary)' }} />
        </Link>
      </div>
    </div>
  );
}

