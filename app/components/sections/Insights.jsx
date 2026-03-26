"use client";

import { motion } from "framer-motion";

export default function Insights() {
  return (
    <div className="w-full px-6 py-32 max-w-[1400px] mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10 md:mb-16 overflow-hidden">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-[7vw] md:text-[5vw] font-black leading-tight md:leading-none tracking-tight"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Latest insights for scaleup teams
        </motion.h2>
        <button className="px-6 py-2 border rounded-full text-sm font-semibold hover:bg-[currentColor] hover:text-[#1a1a1a] transition-colors whitespace-nowrap mb-2 border-current">
          What's trending. <span className="ml-2">←</span>
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
        {/* Card 1: From Left */}
        <motion.div 
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 group cursor-pointer"
        >
          <div className="w-full aspect-[4/3] bg-[#ff8cc2] text-[#1a1a1a] rounded-xl p-8 flex flex-col items-center justify-center text-center transition-transform duration-500 group-hover:scale-[0.98]">
            <p className="text-xs font-semibold mb-4 opacity-60">SERIOUS.BUSINESS</p>
            <p className="font-playfair text-sm italic mb-2 tracking-wide">The Heart of the Shift:</p>
            <h3 className="text-3xl font-black leading-tight tracking-tight" style={{ fontFamily: "var(--font-geist-sans)" }}>
              Brand Messaging is the<br/>Soul of Rebranding
            </h3>
          </div>
          <p className="font-semibold text-sm leading-tight group-hover:opacity-70 transition-opacity">The Heart of the Shift: Brand Messaging is the Soul of Rebranding</p>
          <div className="border-b border-current pb-2 mt-4">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Knowledge</span>
          </div>
        </motion.div>

        {/* Card 2: From Bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-col gap-4 group cursor-pointer"
        >
          <div className="w-full aspect-[4/3] bg-[#fdf8e7] text-[#1a1a1a] rounded-xl p-8 flex flex-col items-center justify-center text-center transition-transform duration-500 group-hover:scale-[0.98]">
            <p className="text-xs font-semibold mb-4 opacity-60">SERIOUS.BUSINESS</p>
            <p className="font-playfair text-sm italic mb-2 tracking-wide text-[#ff8cc2]">Research Is Our Love Language:</p>
            <h3 className="text-3xl font-black leading-tight tracking-tight" style={{ fontFamily: "var(--font-geist-sans)" }}>
              The Art of<br/>Gathering Insights
            </h3>
          </div>
          <p className="font-semibold text-sm leading-tight group-hover:opacity-70 transition-opacity">Research Is Our Love Language: The Art of Gathering Insights</p>
          <div className="border-b border-current pb-2 mt-4">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Knowledge</span>
          </div>
        </motion.div>

        {/* Card 3: From Right */}
        <motion.div 
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex flex-col gap-4 group cursor-pointer"
        >
          <div className="w-full aspect-[4/3] bg-[#f3f3f3] text-[#1a1a1a] rounded-xl p-8 flex flex-col items-center justify-center text-center transition-transform duration-500 group-hover:scale-[0.98]">
            <p className="text-xs font-semibold mb-4 opacity-60">SERIOUS.BUSINESS</p>
            <p className="font-playfair text-sm italic mb-2 tracking-wide">The Founders' Guide to Rebranding</p>
            <h3 className="text-[3.5rem] font-black leading-tight tracking-tighter" style={{ fontFamily: "var(--font-geist-sans)" }}>
              ...is it time?
            </h3>
          </div>
          <p className="font-semibold text-sm leading-tight group-hover:opacity-70 transition-opacity">The Founders' Guide to Rebranding</p>
          <div className="border-b border-current pb-2 mt-4">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Knowledge</span>
          </div>
        </motion.div>
      </div>

      {/* Relationships */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-current/20 pt-16 mb-20 items-center">
        <h3 className="lg:col-span-3 text-2xl font-playfair font-semibold tracking-tight">
          In a serious<br/>relationships with:
        </h3>
        <div className="lg:col-span-9 overflow-hidden relative w-full flex" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-current/20 pt-16 mb-20">
        <h3 className="lg:col-span-3 text-2xl font-playfair font-semibold tracking-tight">
          Getting love from:
        </h3>
        <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-3 gap-y-16 gap-x-8">
          <div>
            <h4 className="text-4xl font-black mb-4">W.</h4>
            <p className="font-bold text-sm mb-2">Awwwards.</p>
            <p className="text-[10px] font-semibold opacity-80 leading-tight">2 x Agency of the year Nominee<br/>7 x Site of the day<br/>2 x Developer Award</p>
          </div>
          <div>
            <h4 className="text-4xl font-black mb-4">L.</h4>
            <p className="font-bold text-sm mb-2">The Lovie Awards</p>
            <p className="text-[10px] font-semibold opacity-80 leading-tight">2 x Gold Lovie<br/>2 x Silver Lovie<br/>2 x People's choice</p>
          </div>
          <div>
            <h4 className="text-4xl font-black mb-4 tracking-tighter">FWA</h4>
            <p className="font-bold text-sm mb-2">The FWA</p>
            <p className="text-[10px] font-semibold opacity-80 leading-tight">2 x FWA of the Day</p>
          </div>
          <div>
            <h4 className="text-4xl font-black mb-4">GDA</h4>
            <p className="font-bold text-sm mb-2">German Design Award</p>
            <p className="text-[10px] font-semibold opacity-80 leading-tight">Special Mention Award</p>
          </div>
          <div>
            <h4 className="text-4xl font-black mb-4">Bē</h4>
            <p className="font-bold text-sm mb-2">Behance</p>
            <p className="text-[10px] font-semibold opacity-80 leading-tight">1x Graphic Design</p>
          </div>
          <div>
            <h4 className="text-4xl font-black mb-4">R.</h4>
            <p className="font-bold text-sm mb-2">Red Dot Design Award</p>
            <p className="text-[10px] font-semibold opacity-80 leading-tight">Communication Design Award</p>
          </div>
        </div>
      </div>

    </div>
  );
}
