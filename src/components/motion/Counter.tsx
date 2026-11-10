import React, { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({
  end,
  duration = 1800,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = ''
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out quartic curve for smooth slowdown
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(easeProgress * end);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [hasStarted, end, duration]);

  const formatted = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString('en-IN');

  return (
    <span ref={elementRef} className={`font-mono tabular-nums ${className}`}>
      {prefix}{formatted}{suffix}
    </span>
  );
};

export default Counter;

