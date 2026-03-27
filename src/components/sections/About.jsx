
import { motion } from "framer-motion";
import AnimatedCounter from "../ui/AnimatedCounter";
import Reveal from "../ui/Reveal";

export default function About() {
  return (
    <div className="w-full min-h-screen px-6 py-24 md:py-32 flex items-center max-w-[1400px] mx-auto text-black relative">
      <div className="grid grid-cols-1 md:grid-cols-12 w-full gap-16">
        
        {/* Left Column - Key Facts */}
        <div className="md:col-span-4 flex flex-col justify-center">
          <div className="flex items-center justify-between border-b border-black mb-6 pb-2 text-sm font-semibold tracking-wider uppercase">
            <span>Key Facts</span>
            <span>04 / 05</span>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-[4rem] md:text-[5rem] font-medium leading-none mb-4" style={{ fontFamily: "var(--font-geist-sans)" }}>
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
          <Reveal>
            <h2
              className="text-[1.8rem] sm:text-[2.5rem] md:text-[5vw] font-medium leading-[1.1] tracking-tight mb-12"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Crafting premium <br/>
              brands for scaleups <br/>
              that make people smile.
            </h2>
          </Reveal>

          <Reveal delay={0.4}>
            <button className="px-6 py-3 rounded-full bg-white text-black text-sm font-semibold flex items-center gap-2 transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white hover:scale-105 shadow-sm border border-transparent hover:border-[#1a1a1a]">
              <span>About us</span>
              <span>←</span>
            </button>
          </Reveal>
        </div>

      </div>

    </div>
  );
}

