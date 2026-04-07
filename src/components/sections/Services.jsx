import { motion } from "framer-motion";
import AnimatedCounter from "../ui/AnimatedCounter";

export default function ServiceBlock({
  title,
  description,
  list,
  textColor = "text-[#1a1a1a]",
  imageContent,
}) {
  return (
    <div
      className={`w-full h-full flex flex-col md:flex-row ${textColor}`}
      style={{
        padding: "clamp(20px, 3vh, 40px) clamp(24px, 3.5vw, 56px)",
        gap: "clamp(16px, 2vw, 32px)",
      }}
    >
      {/* LEFT: title + description + list grouped at top */}
      <div className="w-full md:w-[50%] flex flex-col justify-start shrink-0 min-h-0" style={{ gap: "clamp(16px, 3vh, 32px)" }}>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-inherit font-black leading-[0.88] tracking-tighter"
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "clamp(2.8rem, 7.5vw, 7rem)",
          }}
        >
          {title}
        </motion.h2>

        {/* Description + list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          className="flex flex-col md:flex-row gap-5 md:gap-8"
        >
          <p
            className="text-[14px] md:text-[15px] font-medium leading-[1.45] w-full md:w-1/2 opacity-85 tracking-tight"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            {description}
          </p>
          <ul className="text-[12px] md:text-[13px] font-semibold leading-relaxed w-full md:w-1/2 space-y-[5px]">
            {list.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </motion.div>

      </div>

      {/* RIGHT: square image box */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="shrink-0 self-start ml-auto"
        style={{ width: "clamp(260px, 48vh, 580px)", aspectRatio: "1 / 1" }}
      >
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-sm">
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