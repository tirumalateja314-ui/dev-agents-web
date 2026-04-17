import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MagnifyingGlass, CaretDown } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { faq, searchFaq } from '../../data/faq';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'setup', label: 'Setup' },
  { id: 'usage', label: 'Usage' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
];

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden"
         style={{ border: `1px solid ${open ? 'var(--color-border-active, #383D4F)' : 'var(--color-border)'}`, background: 'var(--color-layer-1)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
        style={{ background: 'transparent' }}
      >
        <p className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
          {item.question}
        </p>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }}>
          <CaretDown size={14} style={{ color: 'var(--color-tertiary)', flexShrink: 0 }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ overflow: 'hidden' }}
          >
            <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: 'var(--color-secondary)', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Troubleshooting() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = (query.trim() ? searchFaq(query) : faq)
    .filter((item) => category === 'all' || item.category === category);

  return (
    <div className="py-10 max-w-[48rem]">
      <Link to="/guide" className="inline-flex items-center gap-1.5 text-xs no-underline mb-8"
            style={{ color: 'var(--color-tertiary)' }}>
        <ArrowLeft size={12} weight="bold" />
        User Guide
      </Link>

      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider mb-3"
           style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          User Guide
        </p>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          Troubleshooting & FAQ
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Answers to common questions. Search or filter by category.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2"
                          style={{ color: 'var(--color-tertiary)' }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions…"
          className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none"
          style={{
            background: 'var(--color-layer-1)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-primary)',
            fontFamily: 'inherit',
          }}
        />
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-150"
            style={{
              background: category === c.id ? 'var(--color-accent-muted)' : 'var(--color-layer-1)',
              border: `1px solid ${category === c.id ? 'rgba(240,147,26,0.3)' : 'var(--color-border)'}`,
              color: category === c.id ? 'var(--color-accent)' : 'var(--color-secondary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* FAQ list */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <p className="text-sm py-6 text-center" style={{ color: 'var(--color-tertiary)' }}>
            No results for "{query}"
          </p>
        ) : (
          filtered.map((item) => <FaqItem key={item.id} item={item} />)
        )}
      </div>

      {/* Still stuck */}
      <div className="mt-8 rounded-xl p-5"
           style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}>
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>Still stuck?</p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Say <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-layer-3)', color: 'var(--color-accent)' }}>"What's the status?"</code> in Copilot Chat at any time. The Coordinator will read all context files and give you a full progress report.
        </p>
      </div>
    </div>
  );
}

