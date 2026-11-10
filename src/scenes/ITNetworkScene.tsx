import React from 'react';

export const ITNetworkScene: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full aspect-[16/10] max-h-[460px] overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.1),transparent_70%)]" />

      <svg 
        viewBox="0 0 800 500" 
        className="w-full h-full text-slate-800"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Network Mesh Grid */}
        <g stroke="#1E293B" strokeWidth="1">
          <line x1="100" y1="100" x2="300" y2="150" />
          <line x1="300" y1="150" x2="500" y2="120" />
          <line x1="500" y1="120" x2="700" y2="180" />
          <line x1="100" y1="100" x2="200" y2="350" />
          <line x1="300" y1="150" x2="400" y2="280" />
          <line x1="500" y1="120" x2="600" y2="320" />
          <line x1="700" y1="180" x2="600" y2="320" />
          <line x1="200" y1="350" x2="400" y2="280" />
          <line x1="400" y1="280" x2="600" y2="320" />
        </g>

        {/* Packet Flow Animation Line */}
        <path d="M 100 100 L 300 150 L 400 280 L 600 320 L 700 180" stroke="#06B6D4" strokeWidth="2" strokeDasharray="8 6" className="animate-spin-slow origin-center" />

        {/* Server Nodes */}
        {[
          { x: 100, y: 100, label: 'EDGE-PATNA' },
          { x: 300, y: 150, label: 'ERP-CLUSTER' },
          { x: 500, y: 120, label: 'CLOUD-VPC' },
          { x: 700, y: 180, label: 'DATABASE' },
          { x: 200, y: 350, label: 'API-GATEWAY' },
          { x: 400, y: 280, label: 'CORE-ENGINE' },
          { x: 600, y: 320, label: 'AUTH-SERVER' }
        ].map((node, idx) => (
          <g key={idx} transform={`translate(${node.x}, ${node.y})`}>
            <circle cx="0" cy="0" r="16" fill="#0F172A" stroke="#06B6D4" strokeWidth="2" />
            <circle cx="0" cy="0" r="6" fill="#38BDF8" className="animate-pulse" />
            <text x="0" y="32" fill="#94A3B8" fontSize="10" fontFamily="monospace" textAnchor="middle">{node.label}</text>
          </g>
        ))}

        {/* Terminal Telemetry Feed at Bottom */}
        <rect x="50" y="420" width="700" height="50" rx="8" fill="#0B132B" stroke="#1E293B" strokeWidth="1" />
        <circle cx="70" cy="445" r="4" fill="#10B981" />
        <text x="85" y="449" fill="#10B981" fontSize="11" fontFamily="monospace">SYSTEM: 99.98% UPTIME • ENCRYPTED SHA-256 • REAL-TIME BIHAR TELEMETRY</text>
      </svg>
    </div>
  );
};

export default ITNetworkScene;

