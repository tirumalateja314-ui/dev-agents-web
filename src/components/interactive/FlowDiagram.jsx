import { motion } from 'framer-motion';
import { phases } from '../../data/phases';
import { agents } from '../../data/agents';
import { Lock } from '@phosphor-icons/react';

function agentColor(agentId) {
  const a = agents.find((x) => x.id === agentId);
  return a ? a.color : '#F0931A';
}

export default function FlowDiagram() {
  return (
    <div className="overflow-x-auto py-2">
      <div className="flex items-center gap-0 min-w-max mx-auto">
        {phases.map((phase, i) => {
          const color = agentColor(phase.agentId);
          return (
            <div key={phase.number} className="flex items-center">
              {/* Phase box */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.06 }}
                className="relative flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-center"
                style={{
                  width: 88,
                  background: 'var(--color-layer-1)',
                  border: `1px solid ${color}40`,
                  minWidth: 88,
                }}
              >
                {/* Phase number */}
                <span
                  className="text-xs font-bold"
                  style={{ color, fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}
                >
                  {String(phase.number).padStart(2, '0')}
                </span>

                {/* Phase name */}
                <span
                  className="text-xs leading-tight"
                  style={{
                    color: 'var(--color-secondary)',
                    fontSize: '0.65rem',
                    lineHeight: 1.3,
                  }}
                >
                  {phase.name}
                </span>

                {/* Agent name */}
                <span
                  className="text-xs font-semibold"
                  style={{ color, fontSize: '0.6rem', fontFamily: 'var(--font-mono)' }}
                >
                  {phase.agent.split(' ').slice(-1)[0]}
                </span>

                {/* Gate badge */}
                {phase.gate && (
                  <div
                    className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 text-white"
                    style={{ background: 'var(--color-accent)', fontSize: '0.55rem', fontWeight: 700 }}
                  >
                    <Lock size={7} weight="fill" />
                    G{phase.gate.number}
                  </div>
                )}
              </motion.div>

              {/* Arrow connector */}
              {i < phases.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: i * 0.06 + 0.15 }}
                  className="flex items-center"
                  style={{ width: 20, flexShrink: 0 }}
                >
                  <div
                    className="flex-1 h-px"
                    style={{ background: 'var(--color-border)' }}
                  />
                  <svg width={6} height={9} viewBox="0 0 6 9">
                    <path d="M0 0 L6 4.5 L0 9 Z" fill="var(--color-border)" />
                  </svg>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 justify-center">
        <div className="flex items-center gap-1.5">
          <div
            className="w-4 h-4 rounded flex items-center justify-center"
            style={{ background: 'var(--color-accent)' }}
          >
            <Lock size={8} weight="fill" style={{ color: '#fff' }} />
          </div>
          <span className="text-xs" style={{ color: 'var(--color-tertiary)' }}>
            Approval gate — your review required
          </span>
        </div>
      </div>
    </div>
  );
}
