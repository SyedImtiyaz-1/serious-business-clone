import { motion } from "framer-motion";
import AnimatedCounter from "../ui/AnimatedCounter";

export default function ServiceBlock({
  title,
  description,
  list,
  textColor = "text-[#1a1a1a]",
  imageContent,
  direction = "left",
}) {
  return (
    <div className={`w-full min-h-full flex flex-col md:flex-row px-6 md:px-12 py-12 md:py-16 lg:py-20 ${textColor} justify-center`}>

      {/* Left Half (Text + Lists) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center mb-12 md:mb-0">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[14vw] md:text-[6vw] lg:text-[7vw] font-black leading-[0.9] tracking-tighter mb-8 md:mb-12 lg:mb-16 text-inherit"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          {title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="flex flex-col md:flex-row gap-6 md:gap-8 max-w-[95%]"
        >
          <p className="text-[16px] md:text-[18px] lg:text-[20px] font-medium leading-[1.3] w-full md:w-1/2 pr-0 md:pr-4 opacity-90 tracking-tight" style={{ fontFamily: "var(--font-geist-sans)" }}>{description}</p>
          <ul className="text-[12px] md:text-[13px] font-semibold leading-relaxed w-full md:w-1/2 space-y-[4px]">
            {list.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Right Half (Image) — slides in from the right */}
      <motion.div
        initial={{ opacity: 0, x: 120 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="w-full md:w-1/2 flex items-center justify-end"
      >
        <div className="w-full md:w-[85%] lg:w-[75%] aspect-[4/3] rounded-md overflow-hidden relative shadow-sm">
          {imageContent}
        </div>
      </motion.div>

    </div>
  );
}

// Beautiful Placeholders replicating the images from the screenshot
export const StrategyImage = () => (
  <div className="w-full h-full bg-gradient-to-br from-[#ff6a00] to-[#e63900] text-white p-6 md:p-8 flex flex-col items-start justify-center relative overflow-hidden">
    <div className="absolute top-6 right-6 text-sm font-bold tracking-tighter flex items-center gap-2">
      <div className="w-4 h-4 bg-white/20 rotate-45" /> asconsystems
    </div>
    <h3 className="text-[28px] md:text-[38px] font-medium leading-[1.1] tracking-tight z-10" style={{ fontFamily: "var(--font-geist-sans)" }}>
      Imagination <br /> beyond limits
    </h3>
    <div className="absolute -bottom-10 -right-10 w-[80%] aspect-square border-4 border-white/20 rounded-full blur-[1px] scale-150" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-overlay pointer-events-none" />
  </div>
);

export const VisualImage = () => (
  <div className="w-full h-full bg-[#d2fb82] flex items-center justify-center relative">
    <div className="w-24 h-24 rounded-full border-[6px] border-black flex items-center justify-center relative">
      <div className="w-12 flex justify-between">
        <div className="w-3 h-1.5 bg-black rounded-full" />
        <div className="w-3 h-1.5 bg-black rounded-full" />
      </div>
      <div className="absolute bottom-4 w-12 h-1 bg-black rounded-full" />
    </div>
    <div className="absolute bottom-[35%] right-[38%] text-3xl font-black">⇧</div>
  </div>
);

export const WebsiteImage = () => (
  <div className="w-full h-full bg-[#1a1a1a] flex flex-col border-[12px] border-[#1a1a1a] rounded-xl overflow-hidden">
    <div className="h-6 w-full bg-[#ffffff] flex items-center px-4 gap-2">
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-red-400" />
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <div className="w-2 h-2 rounded-full bg-green-400" />
      </div>
    </div>
    <div className="flex-1 bg-gradient-to-t from-[#ff4500] to-[#ff8c00] w-full p-6 flex flex-col text-white">
      <div className="text-xs font-bold mb-4 flex items-center gap-2"> <span className="w-2 h-2 rounded-full bg-white" /> quivo </div>
      <div className="flex-1 border-t border-white/20 mt-4 relative">
        <div className="absolute bottom-0 left-0 text-6xl font-black opacity-20">
          <AnimatedCounter value={78} />
        </div>
      </div>
    </div>
  </div>
);

export const ProductImage = () => (
  <div className="w-full h-full bg-[#0b1121] flex items-center justify-center p-4">
    <div className="grid grid-cols-3 gap-3 w-full h-full opacity-90 p-4">
      <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 shadow-sm h-full flex flex-col p-2 gap-2">
        <div className="w-full h-4 bg-gray-100 rounded-full" />
        <div className="w-full flex-1 bg-gray-50 rounded-md" />
        <div className="w-full h-6 bg-[#b5a6ff] rounded-md opacity-20" />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm h-full flex flex-col relative overflow-hidden py-4 px-2">
        <div className="w-12 h-12 mx-auto rounded-full border-4 border-[#fac541] mb-2" />
        <div className="text-center font-black text-xl tracking-tighter">
          <AnimatedCounter value={33} />.0<AnimatedCounter value={30} /> €
        </div>
        <div className="w-full h-full border-dashed border-2 border-gray-200 rounded-md mt-4" />
      </div>
      <div className="bg-[#ccfbf1] rounded-xl border border-teal-100 shadow-sm h-full flex flex-col p-3 gap-2">
        <div className="w-full h-10 bg-white/50 rounded-md" />
        <div className="w-full h-10 bg-white/50 rounded-md mt-auto" />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm h-full" />
      <div className="bg-[#fac541] rounded-xl border border-yellow-300 shadow-sm h-full flex items-center justify-center">
        <span className="font-bold text-[12px] tracking-widest text-[#1a1a1a]">SWIPE</span>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm h-full" />
    </div>
  </div>
);