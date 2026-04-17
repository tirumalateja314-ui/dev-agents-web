import { useEffect, useRef, useState } from 'react'; // useRef kept for timerRef
import { motion, AnimatePresence } from 'framer-motion';

const SCRIPT = [
  { type: 'prompt',  text: '@Coordinator add email validation to signup form.' },
  { type: 'out',     text: '✓ Scanning workspace…', delay: 40 },
  { type: 'agent',   name: 'Analyst',   color: '#8B5CE6', text: '3 acceptance criteria written.' },
  { type: 'agent',   name: 'Explorer',  color: '#24A89C', text: 'Found auth.js — no existing validator.' },
  { type: 'agent',   name: 'Architect', color: '#D48A2C', text: 'Plan: 2 files, 47 lines, zod schema.' },
  { type: 'gate',    text: '⏸  Gate 1 — approve plan?' },
  { type: 'prompt',  text: 'yes' },
  { type: 'agent',   name: 'Developer', color: '#2EBD78', text: 'signup.js updated, tests added.' },
  { type: 'agent',   name: 'Tester',    color: '#D44458', text: '9/9 tests pass. Coverage 94%.' },
  { type: 'agent',   name: 'Reviewer',  color: '#B84FA0', text: 'Review passed. No issues.' },
  { type: 'gate',    text: '⏸  Gate 3 — merge to main?' },
  { type: 'prompt',  text: 'yes' },
  { type: 'agent',   name: 'Git',       color: '#C96420', text: 'MR !42 merged. Branch cleaned.' },
  { type: 'success', text: '✓ Done in 4 phases.' },
];

// How many lines to keep visible at once (window)
const VISIBLE_LINES = 6;
const TYPING_SPEED = 24;   // ms per character
const LINE_PAUSE   = 380;  // ms after each line
const LOOP_PAUSE   = 2800; // ms before restart

function TypingCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
      style={{ display: 'inline-block', width: '2px', height: '0.85em', background: '#F0931A', marginLeft: '2px', verticalAlign: 'text-bottom' }}
    />
  );
}

function renderLine(line) {
  switch (line.type) {
    case 'prompt':
      return (
        <span className="flex gap-2 items-baseline">
          <span style={{ color: '#F0931A', flexShrink: 0 }}>❯</span>
          <span style={{ color: '#e2e8f0' }}>{line.text}</span>
        </span>
      );
    case 'agent':
      return (
        <span className="flex gap-2 items-baseline">
          <span style={{ color: line.color, fontWeight: 600, flexShrink: 0 }}>[{line.name}]</span>
          <span style={{ color: '#94a3b8' }}>{line.text}</span>
        </span>
      );
    case 'gate':
      return <span style={{ color: '#F0931A', fontWeight: 600 }}>{line.text}</span>;
    case 'success':
      return <span style={{ color: '#2EBD78', fontWeight: 600 }}>{line.text}</span>;
    default:
      return <span style={{ color: '#64748b' }}>{line.text}</span>;
  }
}

export default function TerminalMockup() {
  const [lines, setLines]         = useState([]);
  const [typing, setTyping]       = useState(null);
  const [scriptIdx, setScriptIdx] = useState(0);
  const [fading, setFading]       = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function sleep(ms) {
      return new Promise((res) => { timerRef.current = setTimeout(res, ms); });
    }

    async function run() {
      setLines([]);
      setTyping(null);
      setFading(false);

      for (let i = 0; i < SCRIPT.length; i++) {
        if (cancelled) return;
        const line = SCRIPT[i];

        if (line.type === 'prompt') {
          for (let c = 0; c <= line.text.length; c++) {
            if (cancelled) return;
            setTyping({ line, partial: line.text.slice(0, c) });
            await sleep(TYPING_SPEED);
          }
          setTyping(null);
          setLines((prev) => [...prev, line].slice(-VISIBLE_LINES));
          await sleep(LINE_PAUSE);
        } else {
          await sleep(line.delay ?? LINE_PAUSE * 0.5);
          if (cancelled) return;
          setLines((prev) => [...prev, line].slice(-VISIBLE_LINES));
          await sleep(LINE_PAUSE);
        }
      }

      await sleep(LOOP_PAUSE);
      if (cancelled) return;

      // Fade out the whole pane, then reset
      setFading(true);
      await sleep(500);
      if (cancelled) return;
      setLines([]);
      setTyping(null);
      setFading(false);
      await sleep(200);
      if (!cancelled) setScriptIdx((n) => n + 1);
    }

    run();
    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [scriptIdx]);

  return (
    <div
      className="w-full rounded-xl overflow-hidden select-none"
      style={{
        background: '#080d16',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        maxWidth: '480px',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-1.5 px-4 py-2.5"
        style={{ background: '#0f1520', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
        <span
          className="ml-3 text-xs"
          style={{ color: '#374151', fontFamily: 'var(--font-mono)' }}
        >
          @Coordinator
        </span>
      </div>

      {/* Fixed-height output pane — NEVER scrolls, no overflow */}
      <div
        className="px-5 py-4"
        style={{
          height: '222px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: '6px',
          fontSize: '0.74rem',
          lineHeight: '1.55',
          fontFamily: 'var(--font-mono)',
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.45s ease',
        }}
      >
        <AnimatePresence initial={false}>
          {lines.map((line, idx) => (
            <motion.div
              key={`${scriptIdx}-${line.type}-${idx}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              transition={{ duration: 0.15 }}
            >
              {renderLine(line)}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing line */}
        {typing && (
          <div className="flex gap-2 items-baseline">
            <span style={{ color: '#F0931A', flexShrink: 0 }}>❯</span>
            <span style={{ color: '#e2e8f0' }}>
              {typing.partial}<TypingCursor />
            </span>
          </div>
        )}

        {/* Idle — empty prompt */}
        {!typing && lines.length === 0 && (
          <div className="flex gap-2 items-baseline">
            <span style={{ color: '#F0931A' }}>❯</span>
            <TypingCursor />
          </div>
        )}
      </div>
    </div>
  );
}
