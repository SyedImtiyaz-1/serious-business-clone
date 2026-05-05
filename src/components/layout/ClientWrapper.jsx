import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ClientWrapper({ children }) {
  useEffect(() => {
    // Use native scroll. Lenis was adding a per-frame raf loop that, combined
    // with GSAP ScrollTriggers and framer-motion viewports, choked scroll
    // performance on the deployed bundle. Native scroll is GPU-accelerated
    // and competes with nothing.
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return <>{children}</>;
}
