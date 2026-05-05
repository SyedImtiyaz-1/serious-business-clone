import { useRef } from "react";

export default function StackContainer({ panels }) {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="relative w-full">
      {panels.map(({ bg, children }, i) => (
        <div
          key={i}
          style={{
            backgroundColor: bg,
            position: "sticky",
            top: 0,
            zIndex: 10 + i,
            transformOrigin: "center top",
            boxShadow: i > 0 ? "0 -20px 50px rgba(0,0,0,0.18)" : "none",
          }}
        >
          <div className="relative w-full">
            {children}
          </div>
        </div>
      ))}
    </div>
  );
}
