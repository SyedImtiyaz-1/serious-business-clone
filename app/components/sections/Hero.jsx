"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmileLogo from "../ui/SmileLogo";

gsap.registerPlugin(ScrollTrigger);

export function HeroTopText() {
  const { scrollYProgress } = useScroll();
  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const text = "SERIOUS.BUSINESS";
  
  return (
    <motion.div style={{ opacity: textOpacity }} className="w-full flex justify-center bg-primary pt-8 pb-4 overflow-hidden pointer-events-none select-none">
      <motion.h1 
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.05, delayChildren: 2.5 } }
        }}
        className="text-[9vw] md:text-[9vw] lg:text-[8.5vw] font-black tracking-tighter text-[#1a1a1a] leading-[0.7] whitespace-nowrap flex overflow-hidden"
        style={{ fontFamily: "var(--font-geist-sans)", letterSpacing: "-0.04em" }}
      >
        {text.split("").map((char, i) => (
          <motion.span 
            key={i}
            variants={{
              hidden: { y: 80, opacity: 0 },
              show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>
  );
}

export default function Hero() {
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

  const top = useTransform(scrollYProgress, [0.05, 0.45], ["calc(100vh - 160px)", "12vh"]);
  const smoothTop = useSpring(top, springConfig);

  // Fade out styling so it becomes a clear, playable video without blue tint
  const filterOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const smoothFilterOpacity = useSpring(filterOpacity, springConfig);

  // Fade out center text shortly after scroll begins
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const orbRef = useRef(null);

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

  return (
    <section className="relative w-full h-[120vh] bg-primary overflow-hidden" data-component="reel">
      
      {/* Center Text exactly aligned with the new Sticky Navbar */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.3, duration: 0.8, ease: "easeOut" }}
        style={{ opacity: textOpacity }}
        className="absolute top-20 md:top-16 left-0 w-full flex flex-col items-center z-20 pointer-events-none"
      >
        <h2 className="text-[20px] md:text-[24px] lg:text-[28px] leading-[1.1] font-playfair text-[#1a1a1a] text-center tracking-tight">
          Premium Branding Agency <br/>
          for B2B Tech Scaleups
        </h2>
      </motion.div>

      {/* Background 3D Smile Logo */}
      <motion.div 
        ref={orbRef}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3.6, duration: 1.2, type: "spring", bounce: 0.4 }}
        style={{ opacity: textOpacity }}
        className="absolute top-[5vh] md:top-[2vh] left-0 w-full flex justify-center z-10 pointer-events-none opacity-50 mix-blend-multiply"
      >
        <div className="w-[60vw] max-w-[600px] aspect-square">
          <SmileLogo />
        </div>
      </motion.div>

      {/* Expanding Video Component */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 3.6, duration: 0.8, ease: "easeOut" }}
        style={{ width: smoothWidth, height: smoothHeight, top: smoothTop }}
        className="absolute left-6 z-40 rounded-xl overflow-hidden shadow-2xl bg-[#fff242] p-1.5 flex items-center justify-center shadow-indigo-500/20"
      >
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-black">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-motion-of-white-smoke-colors-33096-large.mp4" type="video/mp4" />
          </video>
          
          {/* Keeping the smooth overlays for the architectural feel when small */}
          <motion.div 
            style={{ opacity: smoothFilterOpacity }}
            className="absolute inset-0 bg-[#0A0AFF] mix-blend-color pointer-events-none" 
          />
          <motion.div 
            style={{ opacity: smoothFilterOpacity }}
            className="absolute inset-0 bg-black/20 pointer-events-none" 
          />
        </div>

        <div className="absolute inset-0 border border-white/20 rounded-xl pointer-events-none" />
      </motion.div>
      
    </section>
  );
}