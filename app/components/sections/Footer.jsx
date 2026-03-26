"use client";
import Reveal from "../ui/Reveal";

export default function Footer() {
  return (
    <footer className="w-full pt-20 pb-6 px-6 relative overflow-hidden z-50">
      
      {/* Top CTA Cards */}
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-4 mb-20">
        {/* Left Card */}
        <div className="bg-[#1a1a1a] text-white p-8 md:p-10 h-[300px] md:h-[350px] flex flex-col justify-between cursor-pointer group hover:opacity-95 transition-opacity">
          <p className="font-playfair text-lg md:text-xl leading-tight">
            <span className="font-bold">You feel it too?</span><br />
            Let's talk, no strings attached
          </p>
          <h2 className="text-[10vw] md:text-[64px] font-bold tracking-tight leading-none group-hover:pl-2 transition-all duration-300" style={{ fontFamily: "var(--font-geist-sans)" }}>
            Send Request
          </h2>
        </div>
        
        {/* Right Card */}
        <div className="bg-[#cba6f7] text-black p-8 md:p-10 h-[300px] md:h-[350px] flex flex-col justify-between cursor-pointer group hover:opacity-95 transition-opacity">
          <p className="font-playfair text-base md:text-lg leading-snug max-w-sm">
            Our free offer for B2B tech scaleups!<br />
            We identify high-impact messaging and brand fixes you can implement within 24 hours.
          </p>
          <h2 className="text-[10vw] md:text-[64px] font-bold tracking-tight leading-none group-hover:pl-2 transition-all duration-300" style={{ fontFamily: "var(--font-geist-sans)" }}>
            Brand <br className="hidden md:block"/> Masterplan
          </h2>
        </div>
      </div>

      {/* Grid Links Section */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between mb-32 text-base font-medium tracking-tight">
        <div className="flex flex-col md:flex-row gap-12 flex-1">
          <div className="flex flex-col sm:flex-row gap-4">
            <h4 className="text-[10px] uppercase font-bold tracking-widest mt-1">Explore</h4>
            <ul className="space-y-1 text-xl sm:text-lg">
              <li><a href="#" className="hover:opacity-60 transition-opacity">Work</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity">About</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity">Services</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity">Blog</a></li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <h4 className="text-[10px] uppercase font-bold tracking-widest mt-1">Stalk us</h4>
            <ul className="space-y-1 text-xl sm:text-lg">
              <li><a href="#" className="hover:opacity-60 transition-opacity">LinkedIn</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col gap-8 text-left md:text-right mt-12 md:mt-0">
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest mb-1">Say Hello</h4>
            <a href="mailto:hello@serious.business" className="text-xl md:text-lg hover:opacity-60 transition-opacity">hello@serious.business</a>
          </div>
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest mb-1">Exceptional talent?</h4>
            <a href="mailto:apply@serious.business" className="text-xl md:text-lg hover:opacity-60 transition-opacity">apply@serious.business</a>
          </div>
        </div>
      </div>

      {/* Bottom Massive Logo with Inline Smile */}
      <div className="w-full flex justify-center items-center mb-12 md:mb-6 mt-16 md:mt-0">
        <div className="flex flex-col md:flex-row items-center text-[12vw] md:text-[6vw] lg:text-[5.5vw] xl:text-[7vw] font-black leading-[0.8] tracking-tighter uppercase text-[#1a1a1a]" style={{ fontFamily: "var(--font-geist-sans)" }}>
          <span>SERIOUS</span>
          <svg viewBox="0 0 200 200" className="w-[0.8em] h-[0.8em] my-4 md:my-0 md:mx-2">
            <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="20" fill="none" />
            <circle cx="65" cy="75" r="12" fill="currentColor" />
            <circle cx="135" cy="75" r="12" fill="currentColor" />
            <path d="M50 120 Q100 170 150 120" stroke="currentColor" strokeWidth="20" strokeLinecap="round" fill="none" />
          </svg>
          <span>BUSINESS</span>
        </div>
      </div>
      
      {/* Bottom Legal Links */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest px-4 border-t border-black pt-4">
        <p>© Serious Business GmbH</p>
        <p className="mt-2 md:mt-0 font-playfair lowercase tracking-normal text-sm font-normal">München, Germany / Stockholm, Sweden</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:opacity-60 transition-opacity">Imprint</a>
          <span>|</span>
          <a href="#" className="hover:opacity-60 transition-opacity">Privacy</a>
          <span>|</span>
          <a href="#" className="hover:opacity-60 transition-opacity">Press</a>
        </div>
      </div>
    </footer>
  );
}
