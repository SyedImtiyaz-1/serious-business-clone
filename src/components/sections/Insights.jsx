import { motion } from "framer-motion";
import TransitionLink from "../ui/TransitionLink";

const clientLogos = [
  { file: "jpmorgan.png", name: "JPMorgan Chase" },
  { file: "https://marshallhaber.com/wp-content/uploads/2019/11/BG-LOGO.jpg", name: "BG" },
  { file: "09_Jeffries_Logo.png", name: "Jeffries" },
  { file: "16_Eurotech_Logo.png", name: "Eurotech" },
  { file: "23_Signature_Bank.png", name: "Signature Bank" },
  { file: "Celadon_Logo.png", name: "Celadon" },
  { file: "MIZ_Logo_SVG_Gadrientdark.png", name: "MIZ" },
  { file: "centerbridge.png", name: "Centerbridge" },
  { file: "HumankindInvestments_Logo.png", name: "Humankind Investments" },
  { file: "kaplan.png", name: "Kaplan" },
  { file: "rivington.png", name: "Rivington" },
  { file: "trishmcevoy-1.png", name: "Trish McEvoy" },
  { file: "usher-new-logo_white.png", name: "Usher" },
  { file: "YR.png", name: "Y&R" },
  { file: "1200px-Special_Olympics_logo.svg_-1.png", name: "Special Olympics" },
  { file: "Burson-Marsteller-logo_250px.png", name: "Burson-Marsteller" },
];
import { useRef } from "react";
import Reveal from "../ui/Reveal";

const cards = [
  {
    bg: "#f7c4d5", // Pink
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
  { opacity: 0, x: -150 },
  { opacity: 0, y: 150, scale: 0.95 },
  { opacity: 0, x: 150 },
];

export default function Insights() {
  const sectionRef = useRef(null);

  // Section has a static cream bg; all text/borders stay dark for readability.
  const textColor = "#020817";
  const mutedColor = "#020817";
  const borderColor = "rgba(2,8,23,0.1)";
  const buttonBorder = "#020817";
  const logoFilter = "brightness(0) grayscale(1)";

  return (
    <motion.div
      ref={sectionRef}
      className="w-full relative bg-[#F4EDD9]"
    >
      <div className="px-6 md:px-12 py-14 md:py-28 w-full">

        {/* Heading row — title left, button right */}
        <div className="flex items-start justify-between gap-6 mb-10 md:mb-14">
          <Reveal>
            <motion.h2
              style={{ color: textColor, fontFamily: "'PP Mori', sans-serif", fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              className="font-bold leading-[1.0] tracking-tight"
            >
              Latest insights for scaleup teams
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
              className="flex items-center gap-2 px-4 py-1.5 border-[0.5px] border-opacity-30 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap"
            >
              What's trending.
            </motion.button>
            <motion.div
              style={{ borderColor: buttonBorder, color: buttonBorder }}
              className="w-8 h-8 border-[0.5px] border-opacity-30 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
            >
              ←
            </motion.div>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="-mx-4 md:mx-0 mb-8 md:mb-12">
          <div
            className="
      flex flex-col 
      md:grid md:grid-cols-3 
      px-4 md:px-0
    "
            style={{
              gap: "1rem",
            }}
          >
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={cardInitial[i]}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.1,
                }}
                className="
          w-full 
          flex flex-col gap-0 
          cursor-pointer
          group
        "
              >
                {/* Card box */}
                <div
                  className="w-full flex flex-col items-center justify-center text-center"
                  style={{
                    backgroundColor: card.bg,
                    aspectRatio: "1.8 / 1",
                    padding: "clamp(24px, 4vw, 48px)",
                    color:
                      card.bg === "#2B59C3" || card.bg === "#0B0215"
                        ? "#F4EDD9"
                        : "#020817",
                  }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-6 opacity-50">
                    {card.brand}
                  </p>

                  <p
                    className="text-sm mb-3 tracking-wide leading-snug"
                    style={{
                      fontFamily: "'Nib Pro', serif",
                      fontStyle: "italic",
                      color: card.labelColor || "inherit",
                    }}
                  >
                    {card.label}
                  </p>

                  {card.titleLarge ? (
                    <h3
                      className="font-bold leading-tight tracking-tighter"
                      style={{
                        fontFamily: "'PP Mori', sans-serif",
                        fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                      }}
                    >
                      {card.titleLarge}
                    </h3>
                  ) : (
                    <h3
                      className="font-bold leading-tight tracking-tight"
                      style={{
                        fontFamily: "'PP Mori', sans-serif",
                        fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                      }}
                    >
                      {card.title.split("\n").map((line, j, arr) => (
                        <span key={j}>
                          {line}
                          {j < arr.length - 1 && <br />}
                        </span>
                      ))}
                    </h3>
                  )}
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.1 + 0.2,
                  }}
                  style={{
                    color: textColor,
                    fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
                  }}
                  className="font-semibold leading-snug mt-5 mb-4 group-hover-underline"
                >
                  {card.desc}
                </motion.p>

              </motion.div>
            ))}
          </div>
        </div>


        {/* Awards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-t pt-8 md:pt-10 mb-10 md:mb-16"
          style={{ borderTopColor: borderColor, fontFamily: "'PP Mori', sans-serif" }}
        >
          <motion.h3
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: textColor, fontFamily: "'Nib Pro', serif" }}
            className="md:col-span-3 text-2xl italic font-semibold tracking-tight"
          >
            Clients:
          </motion.h3>
          <div
            className="md:col-span-9"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              rowGap: "4.5rem",
              columnGap: "4rem",
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
                  src={logo.file.startsWith("http") ? logo.file : `/CliendLogo/${logo.file}`}
                  alt={logo.name}
                  style={{
                    filter: logo.file.startsWith("http") ? "none" : logoFilter,
                    maxHeight: "100%",
                    maxWidth: "100%",
                    width: "auto",
                    objectFit: "contain",
                    opacity: 0.85,
                    mixBlendMode: logo.file.startsWith("http") ? "multiply" : "normal",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-center mt-12 md:mt-16">
          <TransitionLink
            to="/clients"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[#020817]/25 text-[#020817] text-xs md:text-sm font-bold tracking-[0.15em] uppercase hover:bg-[#020817] hover:text-[#F4EDD9] transition-colors"
          >
            Show All
            <span aria-hidden>→</span>
          </TransitionLink>
        </div>

      </div>
    </motion.div>
  );
}