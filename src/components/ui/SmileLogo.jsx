
export default function SmileLogo() {
  return (
    <div className="w-full h-full relative flex items-center justify-center pointer-events-none overflow-visible">
      
      {/* Subtle Embossed SB Eye Placeholder Layer */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <filter id="pressed" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feOffset dx="2" dy="2" result="offset" />
            <feComposite in="SourceGraphic" in2="offset" operator="over" />
          </filter>
        </defs>

        {/* Outer Circle (Subtle base) */}
        <circle cx="100" cy="100" r="95" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.02)" strokeWidth="0.5" />

        {/* SB Eyes */}
        <text
          x="100"
          y="95"
          textAnchor="middle"
          fill="rgba(0,0,0,0.12)"
          style={{ 
            fontSize: "74px", 
            fontWeight: "900", 
            fontFamily: "var(--font-geist-sans)", 
            letterSpacing: "-0.08em",
            filter: "url(#pressed)"
          }}
        >
          MH
        </text>

        {/* Smile */}
        <path
          d="M50 125 Q100 185 150 125"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
          style={{ filter: "url(#pressed)" }}
        />
      </svg>
    </div>
  );
}
