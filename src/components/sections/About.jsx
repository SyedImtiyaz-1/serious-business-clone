import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AnimatedCounter from "../ui/AnimatedCounter";
import Reveal from "../ui/Reveal";

const facts = [
  {
    value: "20+",
    isText: true,
    label: "years building brands, platforms, and experiences that actually ship",
  },
  {
    value: "$100M+",
    isText: true,
    label: "in projects, developments, and ventures supported through our work",
  },
  {
    value: "3 markets",
    isText: true,
    label: "New York • Toronto • Florida — operating across borders and industries",
  },
  {
    value: "0 layers",
    isText: true,
    label: "you work directly with senior leadership — always",
  },
  {
    value: "Weeks,\nnot months",
    isText: true,
    label: "from strategy to execution",
  },
];

export default function About() {
  const [current, setCurrent] = useState(0);

  // Auto-cycle every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % facts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + facts.length) % facts.length);
  const next = () => setCurrent((p) => (p + 1) % facts.length);

  const fact = facts[current];

  return (
    <div className="w-full min-h-screen px-6 py-24 md:py-32 flex items-center max-w-[1400px] mx-auto text-black relative">
      <div className="grid grid-cols-1 md:grid-cols-12 w-full gap-16">

        {/* Left Column - Key Facts */}
        <div className="md:col-span-4 flex flex-col justify-center">
          <div className="flex items-center justify-between border-b border-black mb-6 pb-2 text-sm font-semibold tracking-wider uppercase">
            <span>Key Facts</span>
            <span>{String(current + 1).padStart(2, "0")} / {String(facts.length).padStart(2, "0")}</span>
          </div>

          {/* Animated fact slide */}
          <div className="relative overflow-hidden min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3
                  className="text-[3.5rem] md:text-[4.5rem] font-medium leading-none mb-4 whitespace-pre-line"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {fact.value}
                </h3>
                <p className="text-sm font-medium tracking-wide leading-relaxed">
                  {fact.label}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-3 mt-12">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform border border-black/10"
            >
              <span className="text-sm">←</span>
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform border border-black/10"
            >
              <span className="text-sm">→</span>
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5 mt-4">
            {facts.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${i === current ? "w-4 h-1.5 bg-black" : "w-1.5 h-1.5 bg-black/20"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Right Column - Big Text */}
        <div className="md:col-span-8 flex flex-col justify-center">
          <Reveal>
            <h2
              className="text-[1.8rem] sm:text-[2.5rem] md:text-[5vw] font-medium leading-[1.1] tracking-tight mb-12"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Crafting premium <br />
              brands for scaleups <br />
              that make people smile.
            </h2>
          </Reveal>

          <Reveal delay={0.4}>
            <button className="px-6 py-3 rounded-full bg-white text-black text-sm font-semibold flex items-center gap-2 transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white hover:scale-105 shadow-sm border border-transparent hover:border-[#1a1a1a]">
              <span>About us</span>
              <span>→</span>
            </button>
          </Reveal>
        </div>

      </div>
    </div>
  );
}