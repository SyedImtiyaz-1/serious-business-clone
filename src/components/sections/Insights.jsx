
import { motion } from "framer-motion";
import Reveal from "../ui/Reveal";

const cards = [
  {
    bg: "#fbc1d4",
    brand: "Marshall Haber",
    label: "The Heart of the Shift:",
    title: "Brand Messaging is the\nSoul of Rebranding",
    desc: "The Heart of the Shift: Brand Messaging Is the Soul of Rebranding",
  },
  {
    bg: "#f5f0e3",
    brand: "Marshall Haber",
    label: "Research Is Our Love Language:",
    labelColor: "#e8849a",
    title: "The Art of\nGathering Insights",
    desc: "Research Is Our Love Language: The Art of Gathering Insights",
  },
  {
    bg: "#f5f0e3",
    brand: "Marshall Haber",
    label: "The Founders' Guide to Rebranding",
    titleLarge: "...is it time?",
    desc: "The Founders' Guide to Rebranding",
  },
];

export default function Insights() {
  return (
    <div className="w-full bg-[#1a1a1a] text-white">
      <div className="px-6 py-14 md:py-28 max-w-[1400px] mx-auto">

        {/* Heading */}
        <div className="mb-10 md:mb-14 overflow-hidden">
          <Reveal>
            <h2
              className="font-black leading-[1.05] tracking-tight text-[#fbc1d4]"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(2rem, 8vw, 5rem)",
              }}
            >
              Latest insights for<br />scaleup teams
            </h2>
          </Reveal>
        </div>

        {/* Cards — 2 visible + peek on mobile, 3-col on desktop */}
        <div className="-mx-6 md:mx-0 mb-10 md:mb-24">
          <div
            className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible px-6 md:px-0 snap-x snap-mandatory scrollbar-hide"
            style={{ gap: "16px" }}
          >
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                style={{ width: "clamp(240px, 58vw, 420px)", flexShrink: 0, flexGrow: 0 }}
                className="md:w-auto md:flex-1 snap-start flex flex-col gap-0 group cursor-pointer"
              >
                {/* Card image box */}
                <div
                  className="w-full text-[#1a1a1a] rounded-2xl flex flex-col items-center justify-center text-center transition-transform duration-500 group-hover:scale-[0.98]"
                  style={{
                    backgroundColor: card.bg,
                    aspectRatio: "4/3",
                    padding: "clamp(20px, 4vw, 40px)",
                  }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-3 opacity-60">
                    {card.brand}
                  </p>
                  <p
                    className="font-playfair text-sm italic mb-2 tracking-wide"
                    style={{ color: card.labelColor || "inherit" }}
                  >
                    {card.label}
                  </p>
                  {card.titleLarge ? (
                    <h3
                      className="font-black leading-tight tracking-tighter"
                      style={{ fontFamily: "var(--font-geist-sans)", fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
                    >
                      {card.titleLarge}
                    </h3>
                  ) : (
                    <h3
                      className="font-black leading-tight tracking-tight"
                      style={{ fontFamily: "var(--font-geist-sans)", fontSize: "clamp(1rem, 3vw, 1.75rem)" }}
                    >
                      {card.title.split("\n").map((line, j, arr) => (
                        <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                      ))}
                    </h3>
                  )}
                </div>

                {/* Description — large bold, wraps within card column width */}
                <p
                  className="font-bold leading-snug text-[#fbc1d4] mt-5 mb-5"
                  style={{
                    fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {card.desc}
                </p>

                {/* Category label + divider */}
                <div className="border-b border-white/20 pb-3 mt-auto">
                  <span className="text-[11px] font-bold uppercase tracking-widest opacity-50">
                    Knowledge
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* "What's trending" button */}
        <div className="flex justify-start mb-14 md:mb-20">
          <button className="flex items-center gap-3 px-6 py-3 border border-[#fbc1d4] text-[#fbc1d4] rounded-full text-sm font-semibold hover:bg-[#fbc1d4] hover:text-[#1a1a1a] transition-colors">
            <span>What's trending.</span>
            <span>←</span>
          </button>
        </div>

        {/* Relationships */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-t border-white/10 pt-10 md:pt-16 mb-12 md:mb-20 items-center">
          <h3 className="md:col-span-3 text-2xl font-playfair font-semibold tracking-tight">
            In a lasting<br />relationship with:
          </h3>
          <div
            className="md:col-span-9 overflow-hidden relative w-full flex"
            style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
          >
            <div className="animate-marquee flex items-center font-black text-xl tracking-widest uppercase whitespace-nowrap w-max">
              {[0, 1].map((set) => (
                <div key={set} className="px-8 flex items-center gap-16">
                  <div>Frontify</div><div>vay</div>
                  <div className="text-sm">USERCENTRICS</div>
                  <div>arculus</div><div>remberg</div>
                  <div>NANOTEMPER</div><div>zellerfeld</div>
                  <div className="text-xs">UNTERNEHMERTUM</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Awards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-t border-white/10 pt-10 md:pt-16 mb-10 md:mb-20">
          <h3 className="md:col-span-3 text-2xl font-playfair font-semibold tracking-tight">
            Getting love from:
          </h3>
          <div className="md:col-span-9 grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
            {[
              { abbr: "W.", name: "Awwwards.", detail: "2 x Agency of the year Nominee\n7 x Site of the day\n2 x Developer Award" },
              { abbr: "L.", name: "The Lovie Awards", detail: "2 x Gold Lovie\n2 x Silver Lovie\n2 x People's choice" },
              { abbr: "FWA", name: "The FWA", detail: "2 x FWA of the Day", tracking: "tracking-tighter" },
              { abbr: "GDA", name: "German Design Award", detail: "Special Mention Award" },
              { abbr: "Bē", name: "Behance", detail: "1x Graphic Design" },
              { abbr: "R.", name: "Red Dot Design Award", detail: "Communication Design Award" },
            ].map((a) => (
              <div key={a.name}>
                <h4 className={`text-4xl font-black mb-3 ${a.tracking || ""}`}>{a.abbr}</h4>
                <p className="font-bold text-sm mb-1">{a.name}</p>
                <p className="text-[10px] font-semibold opacity-60 leading-tight whitespace-pre-line">{a.detail}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
