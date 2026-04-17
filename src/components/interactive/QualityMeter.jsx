import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LEVELS = [
  {
    label: 'Bad',
    color: 'var(--color-danger)',
    bg: 'rgba(212,68,82,0.12)',
    border: 'rgba(212,68,82,0.3)',
    example: 'Make a login',
    annotation: 'No context. What kind of login? What fields? What framework?',
  },
  {
    label: 'OK',
    color: 'var(--color-warning)',
    bg: 'rgba(232,160,48,0.12)',
    border: 'rgba(232,160,48,0.3)',
    example: 'Build a login page with email and password',
    annotation: 'Minimal context. Better, but no edge cases, no design, no acceptance criteria.',
  },
  {
    label: 'Good',
    color: 'var(--color-success)',
    bg: 'rgba(46,189,120,0.12)',
    border: 'rgba(46,189,120,0.3)',
    example:
      'Build a login page with email and password, a "Forgot Password" link, and rate limiting after 5 failed attempts.',
    annotation: 'Includes functional requirements and an edge case. Story Analyst needs fewer questions.',
  },
  {
    label: 'Great',
    color: '#3B8FE8',
    bg: 'rgba(59,143,232,0.12)',
    border: 'rgba(59,143,232,0.3)',
    example:
      'Build a login page with email/password, forgot password, and rate limiting after 5 failed attempts. Follow the existing auth pattern in src/auth/. Redirect to /dashboard on success. Return 429 for rate-limited requests.',
    annotation:
      'References existing code, specifies behavior, includes error responses. Agents produce great code with near-zero questions.',
  },
];

export default function QualityMeter({ defaultLevel = 1 }) {
  const [selected, setSelected] = useState(defaultLevel);
  const level = LEVELS[selected];

  return (
    <div className="rounded-xl overflow-hidden"
         style={{ border: '1px solid var(--color-border)', background: 'var(--color-layer-1)' }}>
      {/* Header */}
      <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <p className="text-xs font-semibold" style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
          TASK DESCRIPTION QUALITY
        </p>
      </div>

      {/* Level selector */}
      <div className="px-5 pt-4 pb-3 grid grid-cols-4 gap-2">
        {LEVELS.map((l, i) => (
          <button
            key={l.label}
            onClick={() => setSelected(i)}
            className="rounded-lg px-3 py-2 text-xs font-bold cursor-pointer transition-all duration-200"
            style={{
              background: selected === i ? l.bg : 'var(--color-layer-2)',
              color: selected === i ? l.color : 'var(--color-tertiary)',
              border: `1px solid ${selected === i ? l.border : 'var(--color-border)'}`,
            }}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Quality bar */}
      <div className="px-5 pb-4">
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-layer-3)' }}>
          <motion.div
            className="h-full rounded-full"
            animate={{ width: `${((selected + 1) / LEVELS.length) * 100}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ background: level.color }}
          />
        </div>
      </div>

      {/* Example */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="px-5 pb-5"
        >
          {/* Example text */}
          <div
            className="rounded-lg px-4 py-3 mb-3"
            style={{ background: level.bg, border: `1px solid ${level.border}` }}
          >
            <p className="text-sm font-medium mb-0.5" style={{ color: level.color, fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.06em' }}>
              [{level.label.toUpperCase()}] EXAMPLE
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-primary)' }}>
              "{level.example}"
            </p>
          </div>

          {/* Annotation */}
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
            {level.annotation}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
