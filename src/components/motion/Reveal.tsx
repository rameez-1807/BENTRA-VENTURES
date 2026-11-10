import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delayMs?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  threshold?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delayMs = 0,
  direction = 'up',
  className = '',
  threshold = 0.15
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user's reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)';
    switch (direction) {
      case 'up': return 'translate3d(0, 24px, 0)';
      case 'down': return 'translate3d(0, -24px, 0)';
      case 'left': return 'translate3d(24px, 0, 0)';
      case 'right': return 'translate3d(-24px, 0, 0)';
      case 'none': return 'scale(0.98)';
      default: return 'translate3d(0, 24px, 0)';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out will-change-transform ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDelay: `${delayMs}ms`
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;

