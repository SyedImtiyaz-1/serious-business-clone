import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STICKY_TOP = 64; // px — matches Navbar height

export default function StackContainer({ panels }) {
  const containerRef = useRef(null);
  const innerRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      innerRefs.current.forEach((inner, i) => {
        if (!inner || i === 0) return; // first panel needs no entrance

        // The panel section is sticky at STICKY_TOP.
        // Animate inner content rising up as the panel scrolls from bottom into its stuck position.
        gsap.fromTo(
          inner,
          { y: 80, scale: 0.97 },
          {
            y: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: inner.parentElement, // the sticky <section>
              start: "top bottom",          // when section top hits viewport bottom
              end: `top ${STICKY_TOP}px`,   // when section reaches its stuck position
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {panels.map(({ bg, children }, i) => (
        <section
          key={i}
          style={{
            backgroundColor: bg,
            zIndex: 10 + i,
            position: "sticky",
            top: STICKY_TOP,
            height: `calc(100vh - ${STICKY_TOP}px)`,
            boxShadow: i > 0 ? "0 -24px 48px rgba(0,0,0,0.14)" : "none",
            overflow: "hidden",
          }}
          className="w-full"
        >
          <div
            ref={(el) => (innerRefs.current[i] = el)}
            style={{ height: "100%", willChange: "transform" }}
          >
            {children}
          </div>
        </section>
      ))}
    </div>
  );
}
