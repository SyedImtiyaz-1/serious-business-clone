import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StackContainer({ panels }) {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);

  useLayoutEffect(() => {
    const allPanels = panelsRef.current.filter(Boolean);
    if (allPanels.length <= 1) return;

    const ctx = gsap.context(() => {
      allPanels.forEach((panel, i) => {
        if (i === allPanels.length - 1) return;

        const nextPanel = allPanels[i + 1];
        const overlay = panel.querySelector(".card-overlay");

        if (overlay) {
          gsap.to(overlay, {
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: nextPanel,
              start: "top bottom",
              end: "top top",
              scrub: 1,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {panels.map(({ bg, children }, i) => (
        <div
          key={i}
          ref={(el) => (panelsRef.current[i] = el)}
          style={{
            backgroundColor: bg,
            position: "sticky",
            top: 0,
            zIndex: 10 + i,
            transformOrigin: "center top",
            boxShadow: i > 0 ? "0 -20px 50px rgba(0,0,0,0.18)" : "none",
          }}
        >
          <div
            className="card-overlay absolute inset-0 bg-black pointer-events-none"
            style={{ opacity: 0, zIndex: 2 }}
          />
          <div className="relative w-full" style={{ zIndex: 1 }}>
            {children}
          </div>
        </div>
      ))}
    </div>
  );
}
