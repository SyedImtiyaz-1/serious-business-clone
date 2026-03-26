"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "../ui/AnimatedCounter";

export default function About() {
  return (
    <div className="w-full px-6 py-16 md:py-32 flex items-center max-w-[1400px] mx-auto text-black relative">
      <div className="grid grid-cols-1 md:grid-cols-12 w-full gap-16">
        
        {/* Left Column - Serious Facts */}
        <div className="md:col-span-4 flex flex-col justify-center">
          <div className="flex items-center justify-between border-b border-black mb-6 pb-2 text-sm font-semibold tracking-wider uppercase">
            <span>Serious Facts</span>
            <span>04 / 05</span>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-[3rem] md:text-[5rem] font-medium leading-none mb-4" style={{ fontFamily: "var(--font-geist-sans)" }}>
              <AnimatedCounter value={3} />
            </h3>
            <p className="text-sm font-medium tracking-wide">Agency of the Year Nominations</p>
          </motion.div>

          <div className="flex items-center gap-3 mt-12">
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform">
              <span className="text-sm">←</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform">
              <span className="text-sm">→</span>
            </button>
          </div>
        </div>

        {/* Right Column - Big Text */}
        <div className="md:col-span-8 flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[7vw] md:text-[5vw] font-medium leading-[1.1] tracking-tight mb-8 md:mb-12"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Crafting premium <br/>
            brands for scaleups <br/>
            that make people smile.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button className="px-6 py-3 rounded-full bg-white text-black text-sm font-semibold flex items-center gap-2 transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white hover:scale-105 shadow-sm border border-transparent hover:border-[#1a1a1a]">
              <span>About us</span>
              <span>←</span>
            </button>
          </motion.div>
        </div>

      </div>

    </div>
  );
}
