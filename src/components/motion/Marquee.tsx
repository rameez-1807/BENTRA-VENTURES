import React, { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  speedSec?: number;
  pauseOnHover?: boolean;
  className?: string;
  reverse?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  speedSec = 30,
  pauseOnHover = true,
  className = '',
  reverse = false
}) => {
  return (
    <div 
      className={`relative overflow-hidden flex select-none ${className}`}
      role="region"
      aria-label="Scrolling ticker"
    >
      <div 
        className={`flex shrink-0 items-center gap-8 ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{
          animation: `marqueeScroll ${speedSec}s linear infinite ${reverse ? 'reverse' : 'normal'}`
        }}
      >
        {children}
      </div>

      {/* Duplicate track for seamless infinite loop */}
      <div 
        className={`flex shrink-0 items-center gap-8 ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{
          animation: `marqueeScroll ${speedSec}s linear infinite ${reverse ? 'reverse' : 'normal'}`
        }}
        aria-hidden="true"
      >
        {children}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0%); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default Marquee;

