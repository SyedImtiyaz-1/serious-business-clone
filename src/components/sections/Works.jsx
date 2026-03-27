
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import TransitionLink from "../ui/TransitionLink";
import projects from "../../data/projects";

gsap.registerPlugin(ScrollTrigger);

const featured = projects.slice(0, 6);

export default function Works() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray('.parallax-img');
      images.forEach((img) => {
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full px-6 py-32">

      {/* "Our approach" button */}
      <div className="flex justify-center mb-40 -mt-16">
        <button className="px-6 py-3 rounded-full bg-white text-[#1a1a1a] text-sm font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]">
          <span>Our approach</span>
          <span>←</span>
        </button>
      </div>

      <Reveal>
        <h2
          className="text-[clamp(1.8rem,10vw,5rem)] md:text-[7vw] lg:text-[5vw] font-black leading-[0.9] uppercase mb-16 text-inherit"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          We partner with ambitious <br className="hidden md:block"/> scaleups in New York <br className="hidden md:block"/> and the Americas
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 overflow-hidden px-4">
        {featured.map((p, i) => {
          const isLeft = i % 2 === 0;
          return (
            <TransitionLink to={`/work/${p.slug}`} key={p.slug} className="block">
              <motion.div
                initial={{ opacity: 0, x: isLeft ? -80 : 80, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: isLeft ? 0 : 0.25 }}
                className="group cursor-pointer"
              >
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative mb-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 bg-[#f0f0f0]">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute -top-[10%] -bottom-[10%] left-0 right-0 w-full h-[120%] object-cover parallax-img transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                <Reveal>
                  <h3 className="text-2xl font-bold mb-2">{p.title} | {p.subtitle}</h3>
                </Reveal>
                <Reveal delay={0.4}>
                  <p className="text-sm font-medium opacity-60 uppercase tracking-wide">{p.category}</p>
                </Reveal>
              </motion.div>
            </TransitionLink>
          );
        })}
      </div>

      <div className="mt-20 flex justify-center">
        <TransitionLink to="/work" className="px-8 py-4 rounded-full border border-current font-semibold hover:bg-[#1a1a1a] hover:text-[#fbc1d4] transition-colors inline-block">
          See more projects
        </TransitionLink>
      </div>
    </div>
  );
}
