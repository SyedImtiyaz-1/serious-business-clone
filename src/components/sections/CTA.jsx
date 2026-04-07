import Reveal from "../ui/Reveal";

export default function CTA() {
  return (
    <section className="w-full px-6 mb-20 bg-transparent">
      {/* Top CTA Cards */}
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-4">
        {/* Left Card */}
        <div className="bg-[#F4EDD9] text-[#0b1121] p-8 md:p-10 h-[300px] md:h-[350px] flex flex-col justify-between cursor-pointer group hover:opacity-95 transition-opacity border border-white/10 rounded-xl">
          <p className="font-playfair text-lg md:text-xl leading-tight">
            <span className="font-bold">You feel it too?</span><br />
            Let's talk, no strings attached
          </p>
          <h2 className="text-[10vw] md:text-[64px] font-bold tracking-tight leading-none group-hover:pl-2 transition-all duration-300" style={{ fontFamily: "var(--font-geist-sans)" }}>
            Send Request
          </h2>
        </div>

        {/* Right Card */}
        <div className="bg-[#2B59C3] text-white p-8 md:p-10 h-[300px] md:h-[350px] flex flex-col justify-between cursor-pointer group hover:opacity-95 transition-opacity rounded-xl">
          <p className="font-playfair text-base md:text-lg leading-snug max-w-sm">
            Our free offer for B2B tech scaleups!<br />
            We identify high-impact messaging and brand fixes you can implement within 24 hours.
          </p>
          <h2 className="text-[10vw] md:text-[64px] font-bold tracking-tight leading-none group-hover:pl-2 transition-all duration-300" style={{ fontFamily: "var(--font-geist-sans)" }}>
            Brand <br className="hidden md:block" /> Masterplan
          </h2>
        </div>
      </div>
    </section>
  );
}
