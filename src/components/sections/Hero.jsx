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

  // 🔥 smoother Netflix-like spring
  const springConfig = { stiffness: 18, damping: 30, mass: 1.4 };

  // responsive sizes
  const expandedWidth = "calc(100vw - 2rem)";
  const initialWidth = "clamp(140px, 30vw, 220px)";

  const width = useTransform(scrollYProgress, [0.05, 0.5], [initialWidth, expandedWidth]);
  const smoothWidth = useSpring(width, springConfig);

  const height = useTransform(
    scrollYProgress,
    [0.05, 0.5],
    ["clamp(90px, 18vw, 160px)", "75vh"]
  );
  const smoothHeight = useSpring(height, springConfig);

  const orbRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initialTopVal =
    mounted && typeof window !== "undefined" && window.innerWidth < 768
      ? "92vh"
      : "78vh";

  const top = useTransform(scrollYProgress, [0.05, 0.5], [initialTopVal, "8vh"]);
  const smoothTop = useSpring(top, springConfig);

  const filterOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const smoothFilterOpacity = useSpring(filterOpacity, {
    stiffness: 20,
    damping: 35
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(orbRef.current, {
        y: "20vh",
        ease: "none",
        scrollTrigger: {
          trigger: orbRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2 // 🔥 smoother scrub
        }
      });
    });
    return () => ctx.revert();
  }, []);

  if (!mounted)
    return (
      <section className="relative w-full h-[120vh] md:h-[140vh] bg-primary overflow-hidden" />
    );

  return (
    <section className="relative w-full h-[130vh] md:h-[160vh] bg-primary overflow-hidden px-4 md:px-6">

      {/* TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1, ease: [0.76, 0, 0.24, 1] }}
        style={{ opacity: textOpacity }}
        className="
          absolute 
          top-[75vh] sm:top-[80vh] md:top-32 
          left-0 w-full 
          flex flex-col items-center 
          z-20 pointer-events-none
          px-4 md:px-6
        "
      >
        <h2 className="
          text-[18px] 
          sm:text-[20px] 
          md:text-[24px] 
          lg:text-[28px] 
          leading-[1.2] 
          font-bold 
          text-[#1a1a1a] 
          text-center 
          tracking-tight
          max-w-[90%] md:max-w-[700px]
        ">
          Premium Branding Agency{" "}
          <br className="hidden md:block" />
          for B2B Tech Scaleups
        </h2>
      </motion.div>

      {/* LOGO */}
      <motion.div
        ref={orbRef}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.2, type: "spring", bounce: 0.3 }}
        style={{ opacity: textOpacity }}
        className="
          absolute 
          top-[25vh] 
          sm:top-[30vh] 
          md:top-1/2 md:-translate-y-1/2 
          left-0 w-full 
          flex justify-center 
          z-10 
          pointer-events-none 
          opacity-50 
          mix-blend-multiply
        "
      >
        <div className="
          w-[70vw] 
          sm:w-[60vw] 
          md:w-[50vw] 
          max-w-[600px] 
          aspect-square
        ">
          <SmileLogo />
        </div>
      </motion.div>

    </section>
  );
}