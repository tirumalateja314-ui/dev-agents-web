import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CaretDown } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { rules } from '../../data/rules';

function RuleCard({ rule }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden"
         style={{ border: '1px solid var(--color-border)', background: 'var(--color-layer-1)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left"
        style={{ background: 'transparent' }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          {rule.number}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
            {rule.title}
          </p>
          <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>{rule.shortDesc}</p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }}>
          <CaretDown size={14} style={{ color: 'var(--color-tertiary)' }} />
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
            <div className="px-5 pb-5 space-y-3" style={{ borderTop: '1px solid var(--color-border)' }}>
              <p className="text-sm leading-relaxed pt-4" style={{ color: 'var(--color-secondary)' }}>
                {rule.fullDesc}
              </p>
              <div className="rounded-lg px-4 py-3"
                   style={{ background: 'var(--color-layer-2)', border: '1px solid var(--color-border)' }}>
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
                  EXAMPLE
                </p>
                <p className="text-sm" style={{ color: 'var(--color-secondary)', fontStyle: 'italic' }}>
                  {rule.example}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GlobalRules() {
  return (
    <div className="py-10 max-w-[48rem]">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider mb-3"
           style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          Reference
        </p>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          The 10 global rules
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
          Every agent follows these rules at all times. Understanding them explains why agents behave the way they do. Click any rule to expand the full explanation.
        </p>
      </div>

      <div className="space-y-2 mb-10">
        {rules.map((rule) => (
          <RuleCard key={rule.number} rule={rule} />
        ))}
      </div>

      <div className="pt-6 flex justify-end" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Link to="/reference/cheatsheet" className="flex items-center gap-2 no-underline">
          <div className="text-right">
            <p className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Next</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Command Cheat Sheet</p>
          </div>
          <ArrowRight size={14} weight="bold" style={{ color: 'var(--color-tertiary)' }} />
        </Link>
      </div>
    </div>
  );
}

