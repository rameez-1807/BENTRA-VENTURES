import React from 'react';

export const ConstructionScene: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full aspect-[16/10] max-h-[460px] overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.1),transparent_70%)]" />

      <svg 
        viewBox="0 0 800 500" 
        className="w-full h-full text-slate-800"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="cadGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
          </pattern>
        </defs>

        <rect width="800" height="500" fill="url(#cadGrid)" />

        {/* Blueprint Floor Plan Drafting */}
        {/* Exterior Building Perimeter */}
        <rect x="180" y="80" width="440" height="320" stroke="#F59E0B" strokeWidth="2.5" fill="#0B132B" fillOpacity="0.7" rx="4" />

        {/* Internal Room Partitions */}
        <line x1="180" y1="220" x2="420" y2="220" stroke="#F59E0B" strokeWidth="1.5" />
        <line x1="420" y1="80" x2="420" y2="300" stroke="#F59E0B" strokeWidth="1.5" />
        <line x1="420" y1="300" x2="620" y2="300" stroke="#F59E0B" strokeWidth="1.5" />

        {/* Column Pillars */}
        {[
          [180, 80], [300, 80], [420, 80], [520, 80], [620, 80],
          [180, 220], [420, 220], [620, 220],
          [180, 400], [300, 400], [420, 400], [520, 400], [620, 400]
        ].map(([cx, cy], idx) => (
          <rect key={idx} x={cx - 6} y={cy - 6} width="12" height="12" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />
        ))}

        {/* Door Arc Swings */}
        <path d="M 280 220 A 40 40 0 0 1 320 180" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="280" y1="220" x2="320" y2="220" stroke="#38BDF8" strokeWidth="1.5" />

        <path d="M 420 160 A 40 40 0 0 1 460 200" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="420" y1="160" x2="420" y2="200" stroke="#38BDF8" strokeWidth="1.5" />

        {/* Dimension Lines & CAD Labels */}
        <g stroke="#94A3B8" strokeWidth="0.75">
          {/* Top Width Dimension */}
          <line x1="180" y1="60" x2="620" y2="60" />
          <line x1="180" y1="52" x2="180" y2="68" />
          <line x1="620" y1="52" x2="620" y2="68" />

          {/* Left Height Dimension */}
          <line x1="150" y1="80" x2="150" y2="400" />
          <line x1="142" y1="80" x2="158" y2="80" />
          <line x1="142" y1="400" x2="158" y2="400" />
        </g>

        <text x="400" y="52" fill="#CBD5E1" fontSize="11" fontFamily="monospace" textAnchor="middle">SPAN: 44.0 METERS [G+4 SPECIFICATION]</text>
        <text x="135" y="245" fill="#CBD5E1" fontSize="11" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 135 245)">DEPTH: 32.0 METERS</text>

        {/* Room Labels */}
        <text x="290" y="150" fill="#94A3B8" fontSize="12" fontWeight="600" fontFamily="sans-serif">MASTER SUITE</text>
        <text x="290" y="168" fill="#64748B" fontSize="9" fontFamily="monospace">680 SQ. FT.</text>

        <text x="290" y="310" fill="#94A3B8" fontSize="12" fontWeight="600" fontFamily="sans-serif">LIVING ATRIUM</text>
        <text x="290" y="328" fill="#64748B" fontSize="9" fontFamily="monospace">1,240 SQ. FT.</text>

        <text x="510" y="190" fill="#94A3B8" fontSize="12" fontWeight="600" fontFamily="sans-serif">EXECUTIVE SUITE</text>
        <text x="510" y="208" fill="#64748B" fontSize="9" fontFamily="monospace">820 SQ. FT.</text>

        {/* Baseline Stamp Badge */}
        <g transform="translate(470, 320)">
          <rect x="0" y="0" width="130" height="60" rx="8" fill="#0284C7" fillOpacity="0.2" stroke="#38BDF8" strokeWidth="1" />
          <text x="65" y="24" fill="#38BDF8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">RATE LOCK</text>
          <text x="65" y="44" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">₹1,900 / SQ.FT</text>
        </g>
      </svg>
    </div>
  );
};

export default ConstructionScene;

