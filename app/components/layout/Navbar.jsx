"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import MenuOverlay from "./MenuOverlay";

const SmileIcon = () => (
  <svg viewBox="0 0 100 100" className="w-5 h-5 fill-current">
    <circle cx="33" cy="40" r="6" />
    <circle cx="67" cy="40" r="6" />
    <path d="M30 65 Q50 85 70 65" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 100 100" className="w-6 h-6 fill-current">
    <circle cx="25" cy="50" r="6" />
    <circle cx="50" cy="50" r="6" />
    <circle cx="75" cy="50" r="6" />
  </svg>
);

const NavButton = ({ text, hoverText, icon, hoverIcon, onClick, isLetsWork = false }) => {
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
  const staticStyle = { backgroundColor: "#ffffff", color: "#1a1a1a" };

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
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.span
              key="text"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="whitespace-nowrap"
            >
              {text}
            </motion.span>
          ) : (
            <motion.div
              key="hoverText"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex gap-6 whitespace-nowrap"
            >
              {hoverText || text}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Circle with Icon - Color REMAIN STATIC */}
      <motion.div 
        style={staticStyle}
        animate={{ 
          opacity: (isLetsWork && !isHovered && !icon) ? 0 : 1,
          scale: (isLetsWork && !isHovered && !icon) ? 0.8 : 1,
          rotate: isHovered ? 360 : 0
        }}
        transition={{ 
          rotate: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.3 },
          scale: { duration: 0.3 }
        }}
        className="w-11 h-11 rounded-full shadow-sm flex items-center justify-center text-xl flex-shrink-0 relative"
      >
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300" style={{ opacity: isHovered ? 0 : 1 }}>
           {icon}
        </div>
        <div 
          ref={iconWrapperRef}
          className="absolute inset-0 flex items-center justify-center" 
          style={{ opacity: isHovered ? 1 : 0 }}
        >
           {hoverIcon}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Navbar() {
  const { scrollY } = useScroll();
  const [showCenterLogo, setShowCenterLogo] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setShowCenterLogo(latest > 300);

      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const maxScroll = scrollHeight - clientHeight;
      setHideNavbar(latest > maxScroll - 600);
    });
  }, [scrollY]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ y: hideNavbar ? -100 : 0, opacity: hideNavbar ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full flex items-center justify-between px-4 md:px-8 py-4 md:py-8 pointer-events-none z-[100]"
    >
      <div className="md:hidden block text-[1.35rem] font-black tracking-tighter text-[#1a1a1a] pointer-events-auto leading-none" style={{ fontFamily: "var(--font-geist-sans)" }}>
        SERIOUS.BUSINESS
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

      {/* Center: Desktop Logo (Scroll-triggered) */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:block pointer-events-none">
        <AnimatePresence>
          {showCenterLogo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="text-xl font-black tracking-tighter text-[#1a1a1a] pointer-events-auto"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              SERIOUS.BUSINESS
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right: Grouped Buttons on Mobile, Menu on Desktop */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Mobile-only Layout (Pill + Ellipsis) */}
        <div className="md:hidden flex items-center gap-2">
          <div className="bg-white px-5 py-2.5 rounded-full shadow-sm font-bold text-[13px] text-[#1a1a1a] whitespace-nowrap leading-none h-[44px] flex items-center">
            Let's work
          </div>
          <div 
            onClick={() => setMenuOpen(true)}
            className="w-11 h-11 bg-white rounded-full shadow-sm flex items-center justify-center text-[#1a1a1a] cursor-pointer"
          >
            <MenuIcon />
          </div>
        </div>

        {/* Desktop-only Menu */}
        <div className="hidden md:block">
          <NavButton 
            text="Menu" 
            hoverText={
              <div className="flex gap-6">
                <span className="hover:opacity-60 transition-opacity">Work</span>
                <span className="hover:opacity-60 transition-opacity">About</span>
                <span className="hover:opacity-60 transition-opacity">Services</span>
                <span className="hover:opacity-60 transition-opacity">Blog</span>
              </div>
            }
            icon={<span className="leading-none text-xl">←</span>} 
            hoverIcon={<span className="leading-none text-xl">↘</span>}
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </div>

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </motion.div>
  );
}