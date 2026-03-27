
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import TransitionLink from "../ui/TransitionLink";
import gsap from "gsap";

const SmileIcon = () => (
  <svg viewBox="0 0 100 100" className="w-5 h-5 fill-current">
    <circle cx="33" cy="40" r="6" />
    <circle cx="67" cy="40" r="6" />
    <path d="M30 65 Q50 85 70 65" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" />
  </svg>
);

const MenuIcon = ({ isOpen }) => (
  <div className="w-6 h-6 relative flex flex-col items-center justify-center">
    <motion.span
      animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 1 : -4 }}
      className="w-6 h-[2px] bg-current absolute rounded-full"
    />
    <motion.span
      animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 1 : 4 }}
      className="w-6 h-[2px] bg-current absolute rounded-full"
    />
  </div>
);

const NavButton = ({ text, activeText, isActive = false, hoverText, icon, hoverIcon, onClick, isLetsWork = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const iconWrapperRef = useRef(null);

  // Smooth GSAP animation for the smile
  useEffect(() => {
    if (isLetsWork && iconWrapperRef.current) {
      if (isHovered) {
        gsap.fromTo(iconWrapperRef.current,
          { scale: 0, rotate: -180, opacity: 0 },
          { scale: 1, rotate: 0, opacity: 1, duration: 0.6, ease: "power4.out" }
        );
      }
    }
  }, [isHovered, isLetsWork]);

  // Static colors as requested - NO CHANGE ON HOVER
  const staticStyle = { backgroundColor: "var(--accent-bg)", color: "var(--accent-text, #111111)" };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex items-center gap-1.5 pointer-events-auto cursor-none shrink-0"
      onClick={onClick}
    >
      <motion.div
        layout
        style={staticStyle}
        transition={{
          layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } // Premium smooth ease
        }}
        className="px-6 py-3 rounded-full shadow-sm font-bold text-sm flex items-center overflow-hidden h-[44px]"
      >
        <div className="relative h-5 overflow-hidden flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!isHovered && !isActive ? (
              <motion.span
                key="text"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                className="whitespace-nowrap"
              >
                {text}
              </motion.span>
            ) : isActive ? (
              <motion.span
                key="activeText"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                className="whitespace-nowrap"
              >
                {activeText || "Close"}
              </motion.span>
            ) : (
              <motion.div
                key="hoverText"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                className="flex gap-6 whitespace-nowrap"
              >
                {hoverText || text}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Circle with Icon - Color REMAIN STATIC */}
      <motion.div
        style={staticStyle}
        animate={{
          opacity: (isLetsWork && !isHovered && !icon) ? 0 : 1,
          scale: (isLetsWork && !isHovered && !icon) ? 0.8 : 1,
        }}
        transition={{
          opacity: { duration: 0.3 },
          scale: { duration: 0.3 }
        }}
        className="w-11 h-11 rounded-full shadow-sm flex items-center justify-center flex-shrink-0 relative overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-500" style={{ opacity: isHovered || isActive ? 0 : 1, transform: isHovered || isActive ? "scale(0) rotate(-180deg)" : "scale(1) rotate(0deg)" }}>
          {icon}
        </div>
        <div
          ref={iconWrapperRef}
          className="absolute inset-0 flex items-center justify-center transition-all duration-500"
          style={{ opacity: isHovered || isActive ? 1 : 0, transform: isHovered || isActive ? "scale(1) rotate(0deg)" : "scale(0) rotate(180deg)" }}
        >
          {hoverIcon || icon}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Navbar() {
  const { scrollY } = useScroll();
  const [showCenterLogo, setShowCenterLogo] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setShowCenterLogo(latest > 300);

      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const maxScroll = scrollHeight - clientHeight;

      // Only hide navbar if the page is long enough (> 1000px scrollable) 
      // and we are near the very bottom
      setHideNavbar(maxScroll > 1000 && latest > maxScroll - 400);
    });
  }, [scrollY]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ y: hideNavbar ? -100 : 0, opacity: hideNavbar ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full flex items-center justify-between px-4 md:px-8 py-4 md:py-8 pointer-events-none z-[100]"
    >
      <div className="md:hidden block pointer-events-auto leading-none">
        <TransitionLink to="/">
          <img src="/logonewlong.png" alt="Marshall Haber Creative Group" className="h-6 w-auto cursor-pointer" />
        </TransitionLink>
      </div>

      {/* Desktop-only Left: Let's Work */}
      <div className="hidden md:block">
        <NavButton
          text="Let's work"
          icon={null}
          hoverIcon={<SmileIcon />}
          isLetsWork={true}
        />
      </div>

      {/* Center: Desktop Logo (Always visible) */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:block pointer-events-auto">
        <TransitionLink to="/">
          <img src="/logonewlong.png" alt="Marshall Haber Creative Group" className="h-24 w-auto cursor-pointer" />
        </TransitionLink>
      </div>

      {/* Right: Grouped Buttons on Mobile, Menu on Desktop */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Mobile-only Layout: Direct Links */}
        <div className="md:hidden flex items-center gap-4 overflow-x-auto no-scrollbar">
          <TransitionLink to="/" className="text-[13px] font-bold opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap">Home</TransitionLink>
          <TransitionLink to="/work" className="text-[13px] font-bold opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap">Work</TransitionLink>
          <TransitionLink to="/about" className="text-[13px] font-bold opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap">About</TransitionLink>
          <TransitionLink to="/services" className="text-[13px] font-bold opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap">Services</TransitionLink>
          <TransitionLink to="/contact" className="text-[13px] font-bold opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap">Contact</TransitionLink>
        </div>

        {/* Desktop-only Menu */}
        <div className="hidden md:block">
          <NavButton
            text="Menu"
            isActive={false}
            hoverText={
              <div className="flex gap-6">
                <TransitionLink to="/" className="hover:opacity-60 transition-opacity">Home</TransitionLink>
                <TransitionLink to="/work" className="hover:opacity-60 transition-opacity">Work</TransitionLink>
                <TransitionLink to="/about" className="hover:opacity-60 transition-opacity">About</TransitionLink>
                <TransitionLink to="/services" className="hover:opacity-60 transition-opacity">Services</TransitionLink>
                <TransitionLink to="/contact" className="hover:opacity-60 transition-opacity">Contact</TransitionLink>
              </div>
            }
            icon={<MenuIcon isOpen={false} />}
            hoverIcon={<MenuIcon isOpen={false} />}
            onClick={() => {}}
          />
        </div>
      </div>

    </motion.div>
  );
}
