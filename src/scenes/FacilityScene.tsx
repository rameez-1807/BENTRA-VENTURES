import React from 'react';

export const FacilityScene: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full aspect-[16/10] max-h-[460px] overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(2,132,199,0.1),transparent_70%)]" />

      <svg 
        viewBox="0 0 800 500" 
        className="w-full h-full text-slate-800"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="facFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>

        {/* Central Smart Home Diagnostics Hub */}
        <circle cx="400" cy="250" r="140" stroke="#1E293B" strokeWidth="2" />
        <circle cx="400" cy="250" r="100" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="6 4" className="animate-spin-slow origin-center" />
        <circle cx="400" cy="250" r="70" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />

        {/* Central Hub Display */}
        <text x="400" y="245" fill="#38BDF8" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">PATNA HUB</text>
        <text x="400" y="265" fill="#94A3B8" fontSize="10" fontFamily="monospace" textAnchor="middle">45-MIN SLA</text>

        {/* Radial Service Diagnostics Nodes */}
        {/* Node 1: AC Foam Jet */}
        <g transform="translate(180, 140)">
          <line x1="0" y1="0" x2="150" y2="70" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="-60" y="-30" width="120" height="60" rx="8" fill="#0B132B" stroke="#0284C7" strokeWidth="1.5" />
          <text x="0" y="-8" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">AC FOAM-JET</text>
          <text x="0" y="12" fill="#38BDF8" fontSize="10" fontFamily="monospace" textAnchor="middle">₹499 • 2X COOL</text>
        </g>

        {/* Node 2: 6-Step Tank Clean */}
        <g transform="translate(620, 140)">
          <line x1="0" y1="0" x2="-150" y2="70" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="-60" y="-30" width="120" height="60" rx="8" fill="#0B132B" stroke="#10B981" strokeWidth="1.5" />
          <text x="0" y="-8" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">UV TANK WASH</text>
          <text x="0" y="12" fill="#34D399" fontSize="10" fontFamily="monospace" textAnchor="middle">6-STEP • ₹699</text>
        </g>

        {/* Node 3: Sofa Fabric Spa */}
        <g transform="translate(180, 360)">
          <line x1="0" y1="0" x2="150" y2="-70" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="-60" y="-30" width="120" height="60" rx="8" fill="#0B132B" stroke="#F59E0B" strokeWidth="1.5" />
          <text x="0" y="-8" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">SOFA EXTRACTION</text>
          <text x="0" y="12" fill="#FBBF24" fontSize="10" fontFamily="monospace" textAnchor="middle">3-SEATER • ₹449</text>
        </g>

        {/* Node 4: RO Membrane Diagnostic */}
        <g transform="translate(620, 360)">
          <line x1="0" y1="0" x2="-150" y2="-70" stroke="#EC4899" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="-60" y="-30" width="120" height="60" rx="8" fill="#0B132B" stroke="#EC4899" strokeWidth="1.5" />
          <text x="0" y="-8" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">RO PURIFIER</text>
          <text x="0" y="12" fill="#F472B6" fontSize="10" fontFamily="monospace" textAnchor="middle">TDS TEST • ₹249</text>
        </g>

        {/* Dynamic Water & Flow Wave */}
        <path d="M 50 450 Q 200 420 400 450 T 750 450" stroke="#0284C7" strokeWidth="2" fill="none" strokeOpacity="0.4" />
        <path d="M 50 460 Q 200 480 400 460 T 750 460" stroke="#38BDF8" strokeWidth="1.5" fill="none" strokeOpacity="0.3" />

        <text x="40" y="480" fill="#64748B" fontSize="10" fontFamily="monospace">STATUS: 5 DISPATCH HUBS ACTIVE IN PATNA</text>
        <text x="760" y="480" fill="#10B981" fontSize="10" fontFamily="monospace" textAnchor="end">100% VERIFIED TECHNICIANS</text>
      </svg>
    </div>
  );
};

export default FacilityScene;

