
import { motion } from "framer-motion";
import Reveal from "../ui/Reveal";

export default function Insights() {
  return (
    <div className="w-full bg-[#1a1a1a] text-white">
      <div className="px-6 py-32 max-w-[1400px] mx-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 overflow-hidden gap-6">
        <Reveal>
          <h2
            className="text-[1.8rem] sm:text-[2.5rem] md:text-[5vw] font-black leading-none tracking-tight text-[#fbc1d4]"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Latest insights for scaleup teams
          </h2>
        </Reveal>
        <button className="px-6 py-2 border border-[#fbc1d4] text-[#fbc1d4] rounded-full text-sm font-semibold hover:bg-[#fbc1d4] hover:text-[#1a1a1a] transition-colors whitespace-nowrap">
          What's trending. <span className="ml-2">←</span>
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 group cursor-pointer"
        >
          <div className="w-full aspect-[4/3] bg-[#fbc1d4] text-[#1a1a1a] rounded-xl p-8 flex flex-col items-center justify-center text-center transition-transform duration-500 group-hover:scale-[0.98]">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-4 opacity-70">Marshall Haber</p>
            <p className="font-playfair text-sm italic mb-2 tracking-wide">The Heart of the Shift:</p>
            <h3 className="text-3xl font-black leading-tight tracking-tight" style={{ fontFamily: "var(--font-geist-sans)" }}>
              Brand Messaging is the<br/>Soul of Rebranding
            </h3>
          </div>
          <Reveal delay={0.4}>
            <p className="font-semibold text-sm leading-tight group-hover:opacity-70 transition-opacity text-white">The Heart of the Shift: Brand Messaging is the Soul of Rebranding</p>
          </Reveal>
          <div className="border-b border-white/20 pb-2 mt-4">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Knowledge</span>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-col gap-4 group cursor-pointer"
        >
          <div className="w-full aspect-[4/3] bg-[#f5f0e3] text-[#1a1a1a] rounded-xl p-8 flex flex-col items-center justify-center text-center transition-transform duration-500 group-hover:scale-[0.98]">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-4 opacity-70">Marshall Haber</p>
            <p className="font-playfair text-sm italic mb-2 tracking-wide text-[#e8849a]">Research Is Our Love Language:</p>
            <h3 className="text-3xl font-black leading-tight tracking-tight" style={{ fontFamily: "var(--font-geist-sans)" }}>
              The Art of<br/>Gathering Insights
            </h3>
          </div>
          <Reveal delay={0.4}>
            <p className="font-semibold text-sm leading-tight group-hover:opacity-70 transition-opacity text-white">Research Is Our Love Language: The Art of Gathering Insights</p>
          </Reveal>
          <div className="border-b border-white/20 pb-2 mt-4">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Knowledge</span>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex flex-col gap-4 group cursor-pointer"
        >
          <div className="w-full aspect-[4/3] bg-[#f5f0e3] text-[#1a1a1a] rounded-xl p-8 flex flex-col items-center justify-center text-center transition-transform duration-500 group-hover:scale-[0.98]">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-4 opacity-70">Marshall Haber</p>
            <p className="font-playfair text-sm italic mb-2 tracking-wide">The Founders' Guide to Rebranding</p>
            <h3 className="text-[3.5rem] font-black leading-tight tracking-tighter" style={{ fontFamily: "var(--font-geist-sans)" }}>
              ...is it time?
            </h3>
          </div>
          <Reveal delay={0.4}>
            <p className="font-semibold text-sm leading-tight group-hover:opacity-70 transition-opacity text-white">The Founders' Guide to Rebranding</p>
          </Reveal>
          <div className="border-b border-white/20 pb-2 mt-4">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Knowledge</span>
          </div>
        </motion.div>
      </div>

      {/* Relationships */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-t border-white/10 pt-16 mb-20 items-center">
        <h3 className="md:col-span-3 text-2xl font-playfair font-semibold tracking-tight">
          In a lasting<br/>relationship with:
        </h3>
        <div className="md:col-span-9 overflow-hidden relative w-full flex" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
          <div className="animate-marquee flex items-center font-black text-xl tracking-widest uppercase whitespace-nowrap w-max">
            {/* Original Set */}
            <div className="px-8 flex items-center gap-16">
              <div>Frontify</div>
              <div>vay</div>
              <div className="text-sm">USERCENTRICS</div>
              <div>arculus</div>
              <div>remberg</div>
              <div>NANOTEMPER</div>
              <div>zellerfeld</div>
              <div className="text-xs">UNTERNEHMERTUM</div>
            </div>
            {/* Duplicated Set for seamless loop */}
            <div className="px-8 flex items-center gap-16">
              <div>Frontify</div>
              <div>vay</div>
              <div className="text-sm">USERCENTRICS</div>
              <div>arculus</div>
              <div>remberg</div>
              <div>NANOTEMPER</div>
              <div>zellerfeld</div>
              <div className="text-xs">UNTERNEHMERTUM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Awards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-t border-white/10 pt-16 mb-20">
        <h3 className="md:col-span-3 text-2xl font-playfair font-semibold tracking-tight">
          Getting love from:
        </h3>
        <div className="md:col-span-9 grid grid-cols-2 md:grid-cols-3 gap-y-16 gap-x-8">
          <div>
            <h4 className="text-4xl font-black mb-4">W.</h4>
            <p className="font-bold text-sm mb-2">Awwwards.</p>
            <p className="text-[10px] font-semibold opacity-60 leading-tight">2 x Agency of the year Nominee<br/>7 x Site of the day<br/>2 x Developer Award</p>
          </div>
          <div>
            <h4 className="text-4xl font-black mb-4">L.</h4>
            <p className="font-bold text-sm mb-2">The Lovie Awards</p>
            <p className="text-[10px] font-semibold opacity-60 leading-tight">2 x Gold Lovie<br/>2 x Silver Lovie<br/>2 x People's choice</p>
          </div>
          <div>
            <h4 className="text-4xl font-black mb-4 tracking-tighter">FWA</h4>
            <p className="font-bold text-sm mb-2">The FWA</p>
            <p className="text-[10px] font-semibold opacity-60 leading-tight">2 x FWA of the Day</p>
          </div>
          <div>
            <h4 className="text-4xl font-black mb-4">GDA</h4>
            <p className="font-bold text-sm mb-2">German Design Award</p>
            <p className="text-[10px] font-semibold opacity-60 leading-tight">Special Mention Award</p>
          </div>
          <div>
            <h4 className="text-4xl font-black mb-4">Bē</h4>
            <p className="font-bold text-sm mb-2">Behance</p>
            <p className="text-[10px] font-semibold opacity-60 leading-tight">1x Graphic Design</p>
          </div>
          <div>
            <h4 className="text-4xl font-black mb-4">R.</h4>
            <p className="font-bold text-sm mb-2">Red Dot Design Award</p>
            <p className="text-[10px] font-semibold opacity-60 leading-tight">Communication Design Award</p>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}
