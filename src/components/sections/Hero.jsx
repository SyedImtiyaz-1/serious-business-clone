

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmileLogo from "../ui/SmileLogo";

gsap.registerPlugin(ScrollTrigger);

export function HeroTopText() {
  const { scrollYProgress } = useScroll();
  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  return null;
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  // Made spring smoother with lower stiffness
  const springConfig = { stiffness: 25, damping: 25, mass: 1.2 };

  // 🎯 VIDEO EXPANDING PHYSICS (Corner to Viewport)
  // Expanded width to calc(100vw - 3rem) to reach the opposite side perfectly (left is 1.5rem, yielding 1.5rem gap on both sides)
  // Video Expansion transforms
  // capped at 0.8 to ensure it feels "fixed" at its finale
  const expandedWidth = "calc(100vw - 3rem)";
  const initialWidth = "min(180px, 35vw)";
  
  const width = useTransform(scrollYProgress, [0.05, 0.45], [initialWidth, expandedWidth]);
  const smoothWidth = useSpring(width, springConfig);

  const height = useTransform(scrollYProgress, [0.05, 0.45], ["min(100px, 20vw)", "75vh"]);
  const smoothHeight = useSpring(height, springConfig);

  const orbRef = useRef(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const initialTopVal = mounted && window.innerWidth < 768 ? "95vh" : "80vh";
  const top = useTransform(scrollYProgress, [0.05, 0.45], [initialTopVal, "12vh"]);
  const smoothTop = useSpring(top, springConfig);
  // Fade out styling so it becomes a clear, playable video without blue tint
  const filterOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const smoothFilterOpacity = useSpring(filterOpacity, springConfig);

  // Fade out center text shortly after scroll begins
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(orbRef.current, {
        y: "30vh", // move down as we scroll down (speed difference)
        ease: "none",
        scrollTrigger: {
          trigger: orbRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    });
    return () => ctx.revert();
  }, []);

  if (!mounted) return <section className="relative w-full h-[120vh] bg-primary overflow-hidden" />;

  return (
    <section className="relative w-full h-[120vh] bg-primary overflow-hidden" data-component="reel">
      
      {/* Center Text exactly aligned with the new Sticky Navbar */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1, ease: [0.76, 0, 0.24, 1] }}
        style={{ opacity: textOpacity }}
        className="absolute top-[85vh] md:top-32 left-0 w-full flex flex-col items-center z-20 pointer-events-none px-6"
      >
        <h2 className="text-[20px] md:text-[24px] lg:text-[28px] leading-[1.1] font-bold text-[#1a1a1a] text-center tracking-tighter">
          Premium Branding Agency <br className="hidden md:block"/>
          for B2B Tech Scaleups
        </h2>
      </motion.div>

      {/* Background 3D Smile Logo */}
      <motion.div 
        ref={orbRef}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.2, type: "spring", bounce: 0.4 }}
        style={{ opacity: textOpacity }}
        className="absolute top-[20vh] md:top-1/2 md:-translate-y-1/2 left-0 w-full flex justify-center z-10 pointer-events-none opacity-50 mix-blend-multiply"
      >
        <div className="w-[60vw] max-w-[600px] aspect-square">
          <SmileLogo />
        </div>
      </motion.div>

      
    </section>
  );
}
