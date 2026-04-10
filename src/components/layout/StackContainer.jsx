import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StackContainer({ panels }) {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const allPanels = panelsRef.current;
      if (allPanels.length <= 1) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top+=60",
          end: () => `+=${window.innerHeight * 0.55 * (allPanels.length - 1)}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      allPanels.forEach((panel, i) => {
        if (i === 0) return;

        const prevPanel = allPanels[i - 1];
        const prevOverlay = prevPanel.querySelector(".card-overlay");

        tl.fromTo(panel, 
          { yPercent: 100 }, 
          { yPercent: 0, ease: "none" }
        )
        .to(prevPanel, 
          { 
            scale: 0.94, 
            filter: "blur(2px)",
            ease: "none" 
          }, 
          "<"
        )
        .to(prevOverlay, 
          { 
            opacity: 0.7, 
            ease: "none" 
          }, 
          "<"
        );

        // Hide panels that are 2+ levels deep to save performance and prevent ghosting
        if (i > 1) {
          const depthPanel = allPanels[i - 2];
          tl.to(depthPanel, { autoAlpha: 0, duration: 0.1 }, "<");
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden" style={{ height: "calc(100vh - 96px)" }}>
      {panels.map(({ bg, children }, i) => (
        <section
          key={i}
          ref={el => (panelsRef.current[i] = el)}
          style={{
            backgroundColor: bg,
            zIndex: 10 + i,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            boxShadow: "0 -30px 60px rgba(0,0,0,0.2)",
            opacity: 1, // Force opaque
            display: "block",
          }}
          className="flex flex-col"
        >
          {/* Overlay for dimming instead of panel opacity to prevent ghosting */}
          <div 
            className="card-overlay absolute inset-0 bg-black pointer-events-none z-10" 
            style={{ opacity: 0 }}
          />
          <div className="flex-1 w-full overflow-hidden relative z-0">
            {children}
          </div>
        </section>
      ))}
    </div>
  );
}
