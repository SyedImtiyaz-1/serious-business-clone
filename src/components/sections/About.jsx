import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AnimatedCounter from "../ui/AnimatedCounter";
import Reveal from "../ui/Reveal";
import TransitionLink from "../ui/TransitionLink";
import { usePageContent } from "../../hooks/usePageContent";
import { getContent } from "../../lib/content";
import { defaults } from "../../lib/contentDefaults";

export default function About() {
  const { sections } = usePageContent("home");
  const heading = getContent(sections, "about.heading", defaults.home.about.heading);
  const buttonText = getContent(sections, "about.buttonText", defaults.home.about.buttonText);
  const keyFactsLabel = getContent(sections, "about.keyFactsLabel", defaults.home.about.keyFactsLabel);
  const facts = getContent(sections, "about.facts", defaults.home.about.facts);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % facts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + facts.length) % facts.length);
  const next = () => setCurrent((p) => (p + 1) % facts.length);

  const fact = facts[current] || { value: "", label: "" };

  return (
    // ✅ FULL PAGE BACKGROUND FIX
    <div className="w-full bg-[#020817]">

      {/* ✅ YOUR ORIGINAL CONTAINER (UNCHANGED DESIGN) */}
      <div className="px-6 md:px-12 py-20 md:py-24 flex items-center w-full text-[#fbf0f2] relative">

        <div className="w-full flex flex-col justify-center items-center text-center">

          {/* Left Column */}
            <Reveal>
              <h2
                className="text-[2rem] sm:text-[2.5rem] md:text-[72px] font-semibold tracking-tighter mb-12 text-center"
                style={{ fontFamily: "'PP Mori', sans-serif", lineHeight: 1 }}
              >
                {heading.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </h2>
            </Reveal>

            <Reveal delay={0.4}>
              <TransitionLink to="/about">
                <button className="px-6 py-3 rounded-full bg-[#fbf0f2] text-[#020817] text-sm font-semibold flex items-center gap-2 transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 shadow-sm border border-transparent hover:border-white">
                  <span>About us</span>
                  <span>→</span>
                </button>
              </TransitionLink>
            </Reveal>
        </div>
      </div>
    </div>
  );
}