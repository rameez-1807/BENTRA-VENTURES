import React from 'react';

export const HomeHeroScene: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full aspect-[16/10] max-h-[500px] overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl ${className}`}>
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(217,119,6,0.12),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(2,132,199,0.08),transparent_60%)]" />

      <svg 
        viewBox="0 0 800 500" 
        className="w-full h-full text-slate-800"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="heroGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="heroCyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
          </linearGradient>

          <pattern id="isometricGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.25" />
          </pattern>
        </defs>

        {/* 1. Underlying CAD Blueprint Grid */}
        <rect width="800" height="500" fill="url(#isometricGrid)" />

        {/* 2. Concentric Orbit Rings (Patna Hub Radar) */}
        <circle cx="400" cy="250" r="80" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 6" strokeOpacity="0.3" className="animate-spin-slow origin-center" />
        <circle cx="400" cy="250" r="160" stroke="#0284C7" strokeWidth="1" strokeDasharray="6 8" strokeOpacity="0.2" className="animate-spin-slow origin-center" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
        <circle cx="400" cy="250" r="230" stroke="#CBD5E1" strokeWidth="0.75" strokeDasharray="3 9" strokeOpacity="0.15" />

        {/* 3. Isometric Central Tower / Hexagonal Core */}
        <path 
          d="M 400 150 L 480 195 L 480 290 L 400 335 L 320 290 L 320 195 Z" 
          stroke="url(#heroGoldGrad)" 
          strokeWidth="2" 
          fill="#0F172A" 
          fillOpacity="0.85"
        />

        {/* Internal facets */}
        <path d="M 400 150 L 400 335" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.6" />
        <path d="M 320 195 L 400 240 L 480 195" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.4" />
        <path d="M 320 290 L 400 240 L 480 290" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.4" />

        {/* 4. Crosshair and Dimension Lines */}
        <line x1="400" y1="20" x2="400" y2="120" stroke="#CBD5E1" strokeWidth="0.75" strokeDasharray="3 3" strokeOpacity="0.3" />
        <line x1="400" y1="360" x2="400" y2="480" stroke="#CBD5E1" strokeWidth="0.75" strokeDasharray="3 3" strokeOpacity="0.3" />
        <line x1="80" y1="250" x2="280" y2="250" stroke="#CBD5E1" strokeWidth="0.75" strokeDasharray="3 3" strokeOpacity="0.3" />
        <line x1="520" y1="250" x2="720" y2="250" stroke="#CBD5E1" strokeWidth="0.75" strokeDasharray="3 3" strokeOpacity="0.3" />

        {/* 5. Telemetry Node Clusters (Patna Central Coordinates) */}
        {/* Node 1: Realty */}
        <g transform="translate(240, 160)">
          <circle cx="0" cy="0" r="6" fill="#F59E0B" className="animate-pulse" />
          <circle cx="0" cy="0" r="14" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.3" />
          <path d="M 0 0 L 100 45" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="4 2" />
          <text x="-12" y="-12" fill="#94A3B8" fontSize="10" fontFamily="monospace">PIL-01 [REALTY]</text>
        </g>

        {/* Node 2: Facility */}
        <g transform="translate(560, 160)">
          <circle cx="0" cy="0" r="6" fill="#0284C7" className="animate-pulse" />
          <circle cx="0" cy="0" r="14" stroke="#0284C7" strokeWidth="1" strokeOpacity="0.3" />
          <path d="M 0 0 L -100 45" stroke="#0284C7" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="4 2" />
          <text x="-12" y="-12" fill="#94A3B8" fontSize="10" fontFamily="monospace">PIL-02 [FACILITY]</text>
        </g>

        {/* Node 3: IT Cloud */}
        <g transform="translate(240, 340)">
          <circle cx="0" cy="0" r="6" fill="#06B6D4" className="animate-pulse" />
          <circle cx="0" cy="0" r="14" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.3" />
          <path d="M 0 0 L 100 -45" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="4 2" />
          <text x="-12" y="24" fill="#94A3B8" fontSize="10" fontFamily="monospace">PIL-03 [IT/CLOUD]</text>
        </g>

        {/* Node 4: Hospitality & Trade */}
        <g transform="translate(560, 340)">
          <circle cx="0" cy="0" r="6" fill="#EC4899" className="animate-pulse" />
          <circle cx="0" cy="0" r="14" stroke="#EC4899" strokeWidth="1" strokeOpacity="0.3" />
          <path d="M 0 0 L -100 -45" stroke="#EC4899" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="4 2" />
          <text x="-12" y="24" fill="#94A3B8" fontSize="10" fontFamily="monospace">PIL-04 [HOSPITALITY]</text>
        </g>

        {/* Central Core Pulse */}
        <circle cx="400" cy="240" r="10" fill="#F59E0B" className="animate-ping" style={{ animationDuration: '3s' }} />
        <circle cx="400" cy="240" r="5" fill="#FFFFFF" />

        {/* Coordinates HUD overlay */}
        <text x="40" y="460" fill="#64748B" fontSize="11" fontFamily="monospace">PATNA HQ: 25.5941° N, 85.1376° E • ELEV 53M</text>
        <text x="640" y="460" fill="#F59E0B" fontSize="11" fontFamily="monospace" textAnchor="end">ENTERPRISE CORE V2.0</text>
      </svg>
    </div>
  );
};

export default HomeHeroScene;

