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

const NavButton = ({ text, hoverText, icon, hoverIcon, onClick, isLetsWork = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const circleRef = useRef(null);
  const iconWrapperRef = useRef(null);

  // GSAP animation for the smile appearing "from back with circulling"
  useEffect(() => {
    if (isLetsWork && iconWrapperRef.current) {
      if (isHovered) {
        gsap.fromTo(iconWrapperRef.current, 
          { scale: 0, rotate: -180, opacity: 0 },
          { scale: 1, rotate: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
      }
    }
  }, [isHovered, isLetsWork]);

  const pillVariants = {
    initial: { backgroundColor: "#ffffff", color: "#1a1a1a" },
    hover: { backgroundColor: "#1a1a1a", color: "#ffffff" }
  };

  const circleVariants = {
    initial: { backgroundColor: "#ffffff", color: "#1a1a1a" },
    hover: { backgroundColor: "#1a1a1a", color: "#ffffff" }
  };

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
        variants={pillVariants}
        transition={{ 
          duration: 0.3,
          layout: { duration: 0.4, ease: [0.33, 1, 0.68, 1] }
        }}
        className="px-6 py-3 rounded-full shadow-sm font-bold text-sm flex items-center overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.span
              key="text"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {text}
            </motion.span>
          ) : (
            <motion.div
              key="hoverText"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="flex gap-6 whitespace-nowrap"
            >
              {hoverText || text}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Circle with Icon */}
      {/* Always show circle for Menu, only on hover or if icon exists for others */}
      <motion.div 
        ref={circleRef}
        variants={circleVariants}
        transition={{ 
          backgroundColor: { duration: 0.3 },
          color: { duration: 0.3 }
        }}
        // Ensure circle is hidden if no icon and not hovered for Let's Work
        animate={{ 
          opacity: (isLetsWork && !isHovered && !icon) ? 0 : 1,
          scale: (isLetsWork && !isHovered && !icon) ? 0.8 : 1,
          rotate: isHovered ? 360 : 0
        }}
        className="w-11 h-11 rounded-full shadow-sm flex items-center justify-center text-xl flex-shrink-0 relative"
      >
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-200" style={{ opacity: isHovered ? 0 : 1 }}>
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
      if (latest > 300) {
        setShowCenterLogo(true);
      } else {
        setShowCenterLogo(false);
      }

      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const maxScroll = scrollHeight - clientHeight;
      if (latest > maxScroll - 600) { 
         setHideNavbar(true);
      } else {
         setHideNavbar(false);
      }
    });
  }, [scrollY]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ y: hideNavbar ? -100 : 0, opacity: hideNavbar ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      className="w-full flex items-center justify-between px-8 py-8 pointer-events-none z-[100]"
    >
      {/* Left: Let's Work (No arrow by default) */}
      <NavButton 
        text="Let's work" 
        icon={null} 
        hoverIcon={<SmileIcon />} 
        isLetsWork={true}
      />

      {/* Center: Website Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
        <AnimatePresence>
          {showCenterLogo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-xl font-black tracking-tighter mix-blend-difference text-white pointer-events-auto"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              SERIOUS.BUSINESS
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right: Menu transformed into Links Pill */}
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

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </motion.div>
  );
}