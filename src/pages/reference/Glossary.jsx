import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MagnifyingGlass } from '@phosphor-icons/react';
import { glossary, searchGlossary } from '../../data/glossary';

export default function Glossary() {
  const [query, setQuery] = useState('');
  const terms = query.trim() ? searchGlossary(query) : [...glossary].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="py-10 max-w-[48rem]">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider mb-3"
           style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          Reference
        </p>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          Glossary
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Technical terms explained in plain English.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2"
                          style={{ color: 'var(--color-tertiary)' }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms…"
          className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none"
          style={{
            background: 'var(--color-layer-1)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-primary)',
            fontFamily: 'inherit',
          }}
        />
      </div>

      {terms.length === 0 ? (
        <p className="text-sm text-center py-6" style={{ color: 'var(--color-tertiary)' }}>No results for "{query}"</p>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
          {terms.map((item, i) => (
            <div
              key={item.term}
              className="flex gap-6 px-5 py-4"
              style={{
                background: 'var(--color-layer-1)',
                borderBottom: i < terms.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              <p
                className="text-sm font-semibold flex-shrink-0"
                style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)', minWidth: '140px' }}
              >
                {item.term}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
                {item.definition}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="pt-8 flex justify-start" style={{ borderTop: '1px solid var(--color-border)', marginTop: '2.5rem' }}>
        <Link to="/reference/cheatsheet" className="flex items-center gap-2 no-underline">
          <ArrowLeft size={14} weight="bold" style={{ color: 'var(--color-tertiary)' }} />
          <div>
            <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Previous</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Cheat Sheet</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

