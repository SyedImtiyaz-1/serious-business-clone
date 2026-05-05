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
    <div ref={containerRef} className="w-full px-6 pt-12 pb-24 bg-[#020817] text-[#fbf0f2]">
      <Reveal>
        <h2
          className="text-[clamp(1.8rem,8vw,4.5rem)] md:text-[5.5vw] lg:text-[4.5vw] font-bold leading-[1.1] mb-16 text-inherit text-center"
          style={{ fontFamily: "'PP Mori', sans-serif" }}
        >
          We partner with serious scaleups <br className="hidden md:block" /> <span className="italic font-normal" style={{ fontFamily: "'Nib Pro', serif" }}>in Europe and the Americas</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
        {featured.map((p, i) => {
          const isLeft = i % 2 === 0;
          return (
            <TransitionLink to={`/work/${p.slug}`} key={p.slug} className="block">
              <motion.div
                initial={{ opacity: 0, x: isLeft ? -120 : 120 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: isLeft ? 0 : 0.15 }}
                className="group cursor-pointer"
              >
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative mb-6 bg-white/5">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute -top-[10%] -bottom-[10%] left-0 right-0 w-full h-[120%] object-cover parallax-img"
                    style={{ willChange: 'transform' }}
                  />
                </div>

                <Reveal>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-left leading-snug">
                    <span className="group-hover-underline">{p.title} | {p.subtitle}</span>
                  </h3>
                </Reveal>
                <Reveal delay={0.4}>
                  <p className="text-xs md:text-sm font-medium opacity-60 uppercase tracking-wide text-left">{p.category}</p>
                </Reveal>
              </motion.div>
            </TransitionLink>
          );
        })}
      </div>

      <div className="mt-20 flex justify-center">
        <TransitionLink to="/work" className="px-8 py-4 rounded-full border border-current font-semibold hover:bg-[#fbf0f2] hover:text-[#020817] transition-colors inline-block text-[#fbf0f2]">
          See more projects
        </TransitionLink>
      </div>
    </div>
  );
}