import { Sun, Moon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-9 h-9 rounded-md
                 bg-[var(--color-layer-2)] hover:bg-[var(--color-layer-3)]
                 border border-[var(--color-border)]
                 transition-colors duration-150 ease-out cursor-pointer"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        key={theme}
        initial={{ opacity: 0, rotate: -30 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: 30 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {theme === 'dark' ? (
          <Sun size={18} weight="regular" className="text-[var(--color-secondary)]" />
        ) : (
          <Moon size={18} weight="regular" className="text-[var(--color-secondary)]" />
        )}
      </motion.div>
    </button>
  );
}
