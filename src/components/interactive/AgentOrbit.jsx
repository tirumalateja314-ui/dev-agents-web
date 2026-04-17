import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { agents } from '../../data/agents';

// Layout: 8 agents evenly spaced in a circle around a central "You" node
const RADIUS = 130;       // circle radius
const CX = 180;           // SVG center X
const CY = 180;           // SVG center Y
const SVG_SIZE = 360;
const AGENT_NODE_R = 28;  // agent circle radius
const CENTER_R = 34;      // center circle radius

function getPos(index, total, r) {
  // Start from top (-90°) and go clockwise
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return {
    x: CX + r * Math.cos(angle),
    y: CY + r * Math.sin(angle),
  };
}

// Shorten text to initials for small circles
function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function AgentOrbit() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="flex flex-col items-center select-none">
      <svg
        width={SVG_SIZE}
        height={SVG_SIZE}
        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        style={{ overflow: 'visible' }}
      >
        {/* Orbit ring */}
        <circle
          cx={CX}
          cy={CY}
          r={RADIUS}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={1}
          strokeDasharray="4 6"
        />

        {/* Connection lines from center to each agent */}
        {agents.map((agent, i) => {
          const pos = getPos(i, agents.length, RADIUS);
          return (
            <motion.line
              key={agent.id + '-line'}
              x1={CX}
              y1={CY}
              x2={pos.x}
              y2={pos.y}
              stroke={agent.color}
              strokeWidth={1}
              strokeOpacity={0.25}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
            />
          );
        })}

        {/* Agent nodes */}
        {agents.map((agent, i) => {
          const pos = getPos(i, agents.length, RADIUS);
          return (
            <motion.g
              key={agent.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.07, type: 'spring', stiffness: 200 }}
              style={{ cursor: 'pointer' }}
            >
              {/* Agent circle */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={AGENT_NODE_R}
                fill={agent.color + '18'}
                stroke={agent.color}
                strokeWidth={1.5}
              />

              {/* Agent initials */}
              <text
                x={pos.x}
                y={pos.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={9}
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill={agent.color}
              >
                {initials(agent.name)}
              </text>

              {/* Agent name below circle (on desktop) — show outside the ring */}
              {(() => {
                const angle = (i / agents.length) * 2 * Math.PI - Math.PI / 2;
                const labelR = RADIUS + AGENT_NODE_R + 12;
                const lx = CX + labelR * Math.cos(angle);
                const ly = CY + labelR * Math.sin(angle);
                const anchor = Math.cos(angle) > 0.1 ? 'start' : Math.cos(angle) < -0.1 ? 'end' : 'middle';
                return (
                  <text
                    x={lx}
                    y={ly}
                    textAnchor={anchor}
                    dominantBaseline="middle"
                    fontSize={8.5}
                    fontFamily="var(--font-mono)"
                    fill="var(--color-tertiary)"
                  >
                    {agent.name}
                  </text>
                );
              })()}
            </motion.g>
          );
        })}

        {/* Center "You" node */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, type: 'spring', stiffness: 180 }}
        >
          {/* Outer glow ring */}
          <circle
            cx={CX}
            cy={CY}
            r={CENTER_R + 6}
            fill="var(--color-accent-muted)"
            stroke="rgba(240,147,26,0.2)"
            strokeWidth={1}
          />
          {/* Center circle */}
          <circle
            cx={CX}
            cy={CY}
            r={CENTER_R}
            fill="var(--color-layer-2)"
            stroke="var(--color-accent)"
            strokeWidth={2}
          />
          {/* "You" label */}
          <text
            x={CX}
            y={CY - 5}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={11}
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--color-accent)"
          >
            YOU
          </text>
          <text
            x={CX}
            y={CY + 8}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={7.5}
            fontFamily="var(--font-mono)"
            fill="var(--color-tertiary)"
          >
            @Coordinator
          </text>
        </motion.g>

        {/* Slow orbit animation overlay — a subtle rotating highlight */}
        <motion.circle
          cx={CX}
          cy={CY}
          r={RADIUS}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={1}
          strokeOpacity={0.08}
          strokeDasharray={`${RADIUS * 0.4} ${RADIUS * 6}`}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
      </svg>

      {/* Caption */}
      <p className="text-xs text-center mt-2" style={{ color: 'var(--color-tertiary)', maxWidth: 280 }}>
        You only talk to the Coordinator.&nbsp;
        <Link to="/how-it-works" style={{ color: 'var(--color-accent)' }}>
          See how it works →
        </Link>
      </p>
    </div>
  );
}
