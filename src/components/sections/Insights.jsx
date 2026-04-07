import { motion, useScroll, useTransform } from "framer-motion";

const clientLogos = [
  { file: "jpmorgan.png",                          name: "JPMorgan Chase" },
  { file: "berkshire-hathaway-logonew.png",        name: "Berkshire Hathaway" },
  { file: "09_Jeffries_Logo.png",                  name: "Jeffries" },
  { file: "16_Eurotech_Logo.png",                  name: "Eurotech" },
  { file: "23_Signature_Bank.png",                 name: "Signature Bank" },
  { file: "Celadon_Logo.png",                      name: "Celadon" },
  { file: "MIZ_Logo_SVG_Gadrientdark.png",         name: "MIZ" },
  { file: "centerbridge.png",                      name: "Centerbridge" },
  { file: "HumankindInvestments_Logo.png",         name: "Humankind Investments" },
  { file: "kaplan.png",                            name: "Kaplan" },
  { file: "rivington.png",                         name: "Rivington" },
  { file: "trishmcevoy-1.png",                     name: "Trish McEvoy" },
  { file: "usher-new-logo_white.png",              name: "Usher" },
  { file: "YR.png",                                name: "Y&R" },
  { file: "1200px-Special_Olympics_logo.svg_-1.png", name: "Special Olympics" },
  { file: "Burson-Marsteller-logo_250px.png",      name: "Burson-Marsteller" },
];
import { useRef } from "react";
import Reveal from "../ui/Reveal";

const cards = [
  {
    bg: "#F4EDD9", // Cream
    brand: "Marshall Haber",
    label: "The Heart of the Shift:",
    title: "Brand Messaging is the\nSoul of Rebranding",
    desc: "The Heart of the Shift: Brand Messaging Is the Soul of Rebranding",
  },
  {
    bg: "#2B59C3", // Blue
    brand: "Marshall Haber",
    label: "Research Is Our Love Language:",
    labelColor: "#F4EDD9",
    title: "The Art of\nGathering Insights",
    desc: "Research Is Our Love Language: The Art of Gathering Insights",
  },
  {
    bg: "#0B0215", // Night
    brand: "Marshall Haber",
    label: "The Founders' Guide to Rebranding",
    titleLarge: "...is it time?",
    desc: "The Founders' Guide to Rebranding",
  },
];

const cardInitial = [
  { opacity: 0, x: -120 },
  { opacity: 0, y: 80 },
  { opacity: 0, x: 120 },
];

export default function Insights() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 20%"],
  });

  // Background: website color → #1a1a1a
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#020817", "#F4EDD9"]
  );

  // Text: Navy → Cream (interchanged)
  const textColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#F4EDD9", "#020817"]
  );

  // Subtext / muted
  const mutedColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#F4EDD9", "#020817"]
  );

  // Border
  const borderColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgba(244,237,217,0.15)", "rgba(2,8,23,0.1)"]
  );

  // Button border + text
  const buttonBorder = useTransform(
    scrollYProgress,
    [0, 1],
    ["#F4EDD9", "#020817"]
  );

  // Logo filter: white on dark bg → dark/natural on cream bg
  const logoFilter = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    ["brightness(10) grayscale(1)", "brightness(10) grayscale(1)", "brightness(0) grayscale(1)"]
  );

  return (
    <motion.div
      ref={sectionRef}
      style={{ backgroundColor }}
      className="w-full relative"
    >
      <div className="px-6 py-14 md:py-28 max-w-[1400px] mx-auto">

        {/* Heading row — title left, button right */}
        <div className="flex items-start justify-between gap-6 mb-10 md:mb-14">
          <Reveal>
            <motion.h2
              style={{ color: textColor, fontFamily: "var(--font-geist-sans)", fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              className="font-black leading-[1.0] tracking-tight"
            >
              Latest insights for<br />scaleup teams
            </motion.h2>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-2 shrink-0 mt-2"
          >
            <motion.button
              style={{ borderColor: buttonBorder, color: buttonBorder, backgroundColor: "transparent" }}
              className="flex items-center gap-2 px-5 py-2.5 border rounded-full text-sm font-semibold whitespace-nowrap"
            >
              What's trending.
            </motion.button>
            <motion.div
              style={{ borderColor: buttonBorder, color: buttonBorder }}
              className="w-10 h-10 border rounded-full flex items-center justify-center text-base font-bold shrink-0"
            >
              ←
            </motion.div>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="-mx-6 md:mx-0 mb-10 md:mb-24">
          <div
            className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible px-6 md:px-0 snap-x snap-mandatory scrollbar-hide"
            style={{ gap: "clamp(1.5rem, 3.5vw, 4rem)" }}
          >
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={cardInitial[i]}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                style={{ width: "clamp(240px, 58vw, 460px)", flexShrink: 0, flexGrow: 0 }}
                className="md:w-auto md:flex-1 snap-start flex flex-col gap-0 cursor-pointer"
              >
                {/* Card box */}
                <div
                  className="w-full rounded-2xl flex flex-col items-center justify-center text-center"
                  style={{
                    backgroundColor: card.bg,
                    aspectRatio: "4/3",
                    padding: "clamp(24px, 4vw, 48px)",
                    color: card.bg === "#2B59C3" || card.bg === "#0B0215" ? "#F4EDD9" : "#1a1a1a",
                  }}
                >
                  {/* Brand label */}
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-6 opacity-50">
                    {card.brand}
                  </p>

                  {/* Subtitle label */}
                  <p
                    className="text-sm mb-3 tracking-wide leading-snug"
                    style={{
                      fontFamily: "Georgia, serif",
                      fontStyle: "italic",
                      color: card.labelColor || "inherit",
                      opacity: card.labelColor ? 1 : 0.7,
                    }}
                  >
                    {card.label}
                  </p>

                  {/* Main title */}
                  {card.titleLarge ? (
                    <h3
                      className="font-black leading-tight tracking-tighter"
                      style={{ fontFamily: "var(--font-geist-sans)", fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
                    >
                      {card.titleLarge}
                    </h3>
                  ) : (
                    <h3
                      className="font-black leading-tight tracking-tight"
                      style={{ fontFamily: "var(--font-geist-sans)", fontSize: "clamp(1.3rem, 2.8vw, 2rem)" }}
                    >
                      {card.title.split("\n").map((line, j, arr) => (
                        <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                      ))}
                    </h3>
                  )}
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 + 0.2 }}
                  style={{ color: textColor, fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)" }}
                  className="font-semibold leading-snug mt-5 mb-4"
                >
                  {card.desc}
                </motion.p>

                {/* Category + divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                  style={{ borderBottomColor: borderColor }}
                  className="border-b pb-3 mt-auto"
                >
                  <motion.span
                    style={{ color: mutedColor }}
                    className="text-[11px] font-bold uppercase tracking-widest opacity-50"
                  >
                    Knowledge
                  </motion.span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Relationships */}
        <motion.div
          style={{ borderTopColor: borderColor }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-t pt-10 md:pt-16 mb-12 md:mb-20 items-center"
        >
          <motion.h3
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: textColor }}
            className="md:col-span-3 text-2xl font-playfair font-semibold tracking-tight"
          >
            In a lasting<br />relationship with:
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="md:col-span-9 overflow-hidden relative w-full flex"
            style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
          >
            <motion.div
              style={{ color: textColor }}
              className="animate-marquee flex items-center font-black text-xl tracking-widest uppercase whitespace-nowrap w-max"
            >
              {[0, 1].map((set) => (
                <div key={set} className="px-8 flex items-center gap-16">
                  <div>Frontify</div><div>vay</div>
                  <div className="text-sm">USERCENTRICS</div>
                  <div>arculus</div><div>remberg</div>
                  <div>NANOTEMPER</div><div>zellerfeld</div>
                  <div className="text-xs">UNTERNEHMERTUM</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Awards */}
        <motion.div
          style={{ borderTopColor: borderColor }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-t pt-10 md:pt-16 mb-10 md:mb-20"
        >
          <motion.h3
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: textColor }}
            className="md:col-span-3 text-2xl font-playfair font-semibold tracking-tight"
          >
            Getting love from:
          </motion.h3>
          <div
            className="md:col-span-9"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              rowGap: "2.5rem",
              columnGap: "2rem",
            }}
          >
            {clientLogos.map((logo, i) => (
              <motion.div
                key={logo.file}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", height: "48px" }}
              >
                <motion.img
                  src={`/CliendLogo/${logo.file}`}
                  alt={logo.name}
                  style={{ filter: logoFilter, maxHeight: "100%", maxWidth: "100%", width: "auto", objectFit: "contain", opacity: 0.85 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}