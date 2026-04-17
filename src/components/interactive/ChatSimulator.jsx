import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, ArrowCounterClockwise, ArrowRight } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Agent → color map ─────────────────────────────────────────────────────────
const AGENT_COLORS = {
  Coordinator: '#F0931A',
  'Story Analyst': '#8B5CE6',
  'Codebase Explorer': '#24A89C',
  'Architect Planner': '#D48A2C',
  Architect: '#D48A2C',
  Developer: '#2EBD78',
  Tester: '#D44458',
  Reviewer: '#B84FA0',
  'Git Manager': '#C96420',
};

// Delay timings (ms)
const TYPING_DELAY = 1400;   // how long "typing…" shows before agent message
const USER_DELAY   = 700;    // pause before user message appears (manual step) 
const STEP_TYPING  = 700;    // typing delay when stepping manually

// ── Helpers ───────────────────────────────────────────────────────────────────
function parsePhase(text) {
  const m = text && text.match(/^\[Phase (\d+)\/8:\s*([^\]]+)\]/i);
  return m ? { num: m[1], label: m[2].trim() } : null;
}

function cleanText(text) {
  if (!text) return '';
  return text.replace(/^\[Phase \d+\/8:[^\]]+\]\n?/, '').trim();
}

// ── Sub-components ────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <span className="inline-flex gap-1 items-center" style={{ height: '0.75rem' }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="rounded-full"
          style={{ width: 5, height: 5, background: 'var(--color-tertiary)', display: 'block' }}
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
        />
      ))}
    </span>
  );
}

function AgentLabel({ agent, phaseTag }) {
  const color = AGENT_COLORS[agent] || '#F0931A';
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
      <span
        className="text-xs font-semibold"
        style={{ color, fontFamily: 'var(--font-mono)' }}
      >
        {agent}
      </span>
      {phaseTag && (
        <span
          className="text-xs px-1.5 py-0.5 rounded-md"
          style={{
            background: 'var(--color-layer-3)',
            color: 'var(--color-tertiary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.04em',
          }}
        >
          Phase {phaseTag.num}/8 · {phaseTag.label}
        </span>
      )}
    </div>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user';
  const phaseTag = isUser ? null : parsePhase(msg.text);
  const displayText = isUser ? msg.text : cleanText(msg.text);

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[80%] rounded-2xl rounded-tr-sm px-3.5 py-2.5"
          style={{
            background: 'var(--color-accent-muted)',
            border: '1px solid rgba(240,147,26,0.18)',
          }}
        >
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-primary)' }}
          >
            {displayText}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AgentLabel agent={msg.agent} phaseTag={phaseTag} />
      <div
        className="max-w-[88%] rounded-2xl rounded-tl-sm px-3.5 py-2.5"
        style={{
          background: 'var(--color-layer-2)',
          border: '1px solid var(--color-border)',
        }}
      >
        <p
          className="text-sm leading-relaxed whitespace-pre-wrap"
          style={{ color: 'var(--color-secondary)' }}
        >
          {displayText}
        </p>
      </div>
    </div>
  );
}

function TypingBubble({ agent }) {
  const color = AGENT_COLORS[agent] || '#F0931A';
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
        <span className="text-xs font-semibold" style={{ color, fontFamily: 'var(--font-mono)' }}>
          {agent}
        </span>
      </div>
      <div
        className="w-16 rounded-2xl rounded-tl-sm px-3.5 py-3"
        style={{ background: 'var(--color-layer-2)', border: '1px solid var(--color-border)' }}
      >
        <TypingDots />
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
/**
 * ChatSimulator
 *
 * Props:
 *   messages   – array of { role: 'user'|'agent', agent?: string, text: string }
 *   title      – window title bar text  (optional)
 *   autoStart  – start playing on mount (optional, default false)
 *   compact    – smaller max height (optional, default false)
 */
export default function ChatSimulator({
  messages = [],
  title = 'GitHub Copilot Chat — @Coordinator',
  autoStart = false,
  compact = false,
}) {
  const [step, setStep]         = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const timerRef  = useRef(null);

  const isComplete = step >= messages.length;
  const nextMsg    = messages[step] || null;

  // ── clear any pending timer ─────────────────────────────────────────────────
  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // ── cleanup on unmount ──────────────────────────────────────────────────────
  useEffect(() => () => clearTimer(), [clearTimer]);

  // ── auto-start ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (autoStart) setIsPlaying(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── scroll to bottom whenever visible messages or typing state changes ──────
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [step, isTyping]);

  // ── auto-play engine ────────────────────────────────────────────────────────
  useEffect(() => {
    // Stop conditions
    if (!isPlaying) return;
    if (isComplete) { setIsPlaying(false); return; }
    if (!nextMsg)   { setIsPlaying(false); return; }

    if (nextMsg.role === 'agent') {
      // Show typing indicator, then reveal message
      setIsTyping(true);
      timerRef.current = setTimeout(() => {
        setIsTyping(false);
        setStep((s) => s + 1);
      }, TYPING_DELAY);
    } else {
      // User message: pause briefly then reveal
      timerRef.current = setTimeout(() => {
        setStep((s) => s + 1);
      }, USER_DELAY);
    }

    return clearTimer;
  }, [isPlaying, step, isComplete, nextMsg, clearTimer]);

  // ── control handlers ────────────────────────────────────────────────────────
  const handlePlayPause = () => {
    if (isComplete) {
      // Replay from start
      clearTimer();
      setIsTyping(false);
      setStep(0);
      // Small delay so step 0 renders before play kicks in
      timerRef.current = setTimeout(() => setIsPlaying(true), 60);
      return;
    }
    if (isPlaying) {
      clearTimer();
      setIsTyping(false);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleStep = () => {
    if (isComplete || isPlaying || !nextMsg) return;
    clearTimer();

    if (nextMsg.role === 'agent') {
      setIsTyping(true);
      timerRef.current = setTimeout(() => {
        setIsTyping(false);
        setStep((s) => s + 1);
      }, STEP_TYPING);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleReset = () => {
    clearTimer();
    setIsTyping(false);
    setIsPlaying(false);
    setStep(0);
  };

  const progress = messages.length > 0 ? (step / messages.length) * 100 : 0;
  const maxH = compact ? '300px' : '420px';

  // ── render ──────────────────────────────────────────────────────────────────
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid var(--color-border)', background: 'var(--color-layer-1)' }}
    >
      {/* ─ Window chrome ──────────────────────────────────────────────────── */}
      <div
        className="px-4 py-2.5 flex items-center gap-3"
        style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-layer-2)' }}
      >
        {/* Traffic-light buttons (decorative) */}
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-3 h-3 rounded-full" style={{ background: '#D44452' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#E8A030' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#2EBD78' }} />
        </div>

        {/* Title */}
        <span
          className="flex-1 text-center text-xs truncate"
          style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}
        >
          {title}
        </span>

        {/* Message counter */}
        <span
          className="text-xs flex-shrink-0"
          style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}
        >
          {step}/{messages.length}
        </span>
      </div>

      {/* ─ Messages pane ──────────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="px-5 py-4 space-y-4 overflow-y-auto"
        style={{ minHeight: 220, maxHeight: maxH }}
      >
        <AnimatePresence initial={false}>
          {messages.slice(0, step).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageBubble msg={msg} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && nextMsg && nextMsg.role === 'agent' && (
            <motion.div
              key="typing-indicator"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.14 }}
            >
              <TypingBubble agent={nextMsg.agent} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* End-of-conversation marker */}
        {isComplete && messages.length > 0 && (
          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
            <span className="text-xs" style={{ color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}>
              end of conversation
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
          </div>
        )}

        {/* Placeholder when empty */}
        {step === 0 && !isTyping && (
          <div className="flex flex-col items-center justify-center py-10 gap-2">
            <p className="text-sm" style={{ color: 'var(--color-tertiary)' }}>
              Press <strong style={{ color: 'var(--color-secondary)' }}>Play</strong> to start the conversation, or{' '}
              <strong style={{ color: 'var(--color-secondary)' }}>Step</strong> to go one message at a time.
            </p>
          </div>
        )}
      </div>

      {/* ─ Controls bar ───────────────────────────────────────────────────── */}
      <div
        className="px-4 py-3 flex items-center gap-2"
        style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-layer-2)' }}
      >
        {/* Play / Pause / Replay */}
        <button
          onClick={handlePlayPause}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-opacity"
          style={{
            background: 'var(--color-accent-muted)',
            color: 'var(--color-accent)',
            border: '1px solid rgba(240,147,26,0.22)',
          }}
        >
          {isComplete ? (
            <ArrowCounterClockwise size={12} weight="bold" />
          ) : isPlaying ? (
            <Pause size={12} weight="fill" />
          ) : (
            <Play size={12} weight="fill" />
          )}
          {isComplete ? 'Replay' : isPlaying ? 'Pause' : 'Play'}
        </button>

        {/* Step (only when paused and not done) */}
        {!isPlaying && !isComplete && (
          <button
            onClick={handleStep}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer"
            style={{
              background: 'var(--color-layer-3)',
              color: 'var(--color-secondary)',
              border: '1px solid var(--color-border)',
            }}
          >
            <ArrowRight size={11} weight="bold" />
            Step
          </button>
        )}

        {/* Reset (only when something is shown) */}
        {step > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs cursor-pointer"
            style={{ color: 'var(--color-tertiary)' }}
          >
            <ArrowCounterClockwise size={11} />
            Reset
          </button>
        )}

        {/* Progress bar */}
        <div
          className="flex-1 h-1 rounded-full overflow-hidden ml-auto"
          style={{ background: 'var(--color-layer-3)' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'var(--color-accent)',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>
    </div>
  );
}
