"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesStack({ panels }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".service-panel");

      sections.forEach((panel, i) => {
        // Pin each panel so the next one scrolls over it
        ScrollTrigger.create({
          trigger: panel,
          start: "top top+=60", // Stick just below the navbar
          pin: true,
          pinSpacing: false, // Don't add extra space (next panel scrolls over this one)
          id: `service-pin-${i}`,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {panels.map(({ bg, children }, i) => (
        <div
          key={i}
          className="service-panel w-full min-h-screen overflow-hidden"
          style={{
            backgroundColor: bg,
            zIndex: 10 + i * 10,
            boxShadow: "0 -15px 40px rgba(0,0,0,0.10)",
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
