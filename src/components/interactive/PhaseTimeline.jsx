import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Lock } from '@phosphor-icons/react';
import { phases } from '../../data/phases';
import { agents } from '../../data/agents';

// Maps agentId → color
function agentColor(agentId) {
  const a = agents.find((x) => x.id === agentId);
  return a ? a.color : '#F0931A';
}

export default function PhaseTimeline() {
  const [active, setActive] = useState(null); // phase number or null

  return (
    <div>
      {/* Horizontal phase strip */}
      <div className="relative">
        {/* Connecting line */}
        <div
          className="absolute top-6 left-0 right-0 h-px hidden sm:block"
          style={{ background: 'var(--color-border)', marginLeft: 24, marginRight: 24 }}
        />

        {/* Phase nodes */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {phases.map((phase) => {
            const color = agentColor(phase.agentId);
            const isActive = active === phase.number;

            return (
              <button
                key={phase.number}
                onClick={() => setActive(isActive ? null : phase.number)}
                className="flex flex-col items-center gap-2 group cursor-pointer"
                style={{ background: 'none', border: 'none', padding: 0 }}
              >
                {/* Node circle */}
                <div
                  className="relative w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-all duration-200"
                  style={{
                    background: isActive ? color + '22' : 'var(--color-layer-2)',
                    border: `2px solid ${isActive ? color : 'var(--color-border)'}`,
                    color: isActive ? color : 'var(--color-tertiary)',
                    fontFamily: 'var(--font-mono)',
                    boxShadow: isActive ? `0 0 0 4px ${color}18` : 'none',
                  }}
                >
                  {String(phase.number).padStart(2, '0')}
                  {/* Gate indicator */}
                  {phase.gate && (
                    <div
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--color-accent)', border: '1.5px solid var(--color-layer-1)' }}
                    >
                      <Lock size={8} weight="fill" style={{ color: '#fff' }} />
                    </div>
                  )}
                </div>

                {/* Phase name */}
                <span
                  className="text-xs text-center leading-tight px-1"
                  style={{
                    color: isActive ? 'var(--color-primary)' : 'var(--color-tertiary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.02em',
                    transition: 'color 0.2s',
                  }}
                >
                  {phase.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {active !== null && (() => {
          const phase = phases.find((p) => p.number === active);
          if (!phase) return null;
          const color = agentColor(phase.agentId);
          const agent = agents.find((a) => a.id === phase.agentId);

          return (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-4 rounded-xl p-5"
              style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs font-semibold"
                      style={{ color, fontFamily: 'var(--font-mono)' }}
                    >
                      Phase {phase.number}/8
                    </span>
                    {phase.gate && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"
                        style={{
                          background: 'var(--color-accent-muted)',
                          color: 'var(--color-accent)',
                          fontSize: '0.6rem',
                        }}
                      >
                        <Lock size={8} weight="fill" />
                        Gate {phase.gate.number}: {phase.gate.name}
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                  >
                    {phase.name}
                  </h3>
                </div>

                {/* Agent badge */}
                {agent && (
                  <div
                    className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{
                      background: color + '15',
                      color,
                      fontFamily: 'var(--font-mono)',
                      border: `1px solid ${color}30`,
                    }}
                  >
                    {agent.name}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-secondary)' }}>
                {phase.description}
              </p>

              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                {/* User action */}
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                    style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}
                  >
                    What you do
                  </p>
                  <p style={{ color: 'var(--color-secondary)' }}>{phase.userAction}</p>
                </div>

                {/* Context file */}
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                    style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}
                  >
                    Context file created
                  </p>
                  <code
                    className="text-xs px-2 py-1 rounded"
                    style={{ background: 'var(--color-layer-3)', color: 'var(--color-primary)' }}
                  >
                    {phase.contextFile}
                  </code>
                </div>

                {/* Approval gate detail */}
                {phase.gate && (
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                      style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}
                    >
                      Approval gate
                    </p>
                    <p style={{ color: 'var(--color-secondary)' }}>{phase.gate.question}</p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-accent)' }} />
          <span className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Approval gate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-border)' }} />
          <span className="text-xs" style={{ color: 'var(--color-tertiary)' }}>Click any phase to expand</span>
        </div>
      </div>
    </div>
  );
}
