import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ScrollReveal({ children, className = '', delay = 0 }) {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${isRevealed ? 'revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
