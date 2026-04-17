import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function SectionWrapper({ children, className = '', id }) {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      id={id}
      className={`opacity-0 translate-y-3 transition-all duration-500 ease-out
                  [&.revealed]:opacity-100 [&.revealed]:translate-y-0
                  ${className}`}
    >
      {children}
    </section>
  );
}
