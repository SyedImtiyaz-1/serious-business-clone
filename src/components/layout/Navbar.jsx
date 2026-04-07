import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
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

  const staticStyle = { backgroundColor: "var(--accent-bg)", color: "var(--accent-text, #020817)" };

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
        transition={{ layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        className="px-6 py-3 rounded-full shadow-sm font-bold text-sm flex items-center overflow-hidden h-[44px]"
      >
        <div className="relative h-5 overflow-hidden flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!isHovered && !isActive ? (
              <motion.span key="text" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="whitespace-nowrap">
                {text}
              </motion.span>
            ) : isActive ? (
              <motion.span key="activeText" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="whitespace-nowrap">
                {activeText || "Close"}
              </motion.span>
            ) : (
              <motion.div key="hoverText" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="flex gap-6 whitespace-nowrap">
                {hoverText || text}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        style={staticStyle}
        animate={{
          opacity: (isLetsWork && !isHovered && !icon) ? 0 : 1,
          scale: (isLetsWork && !isHovered && !icon) ? 0.8 : 1,
        }}
        transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
        className="w-11 h-11 rounded-full shadow-sm flex items-center justify-center flex-shrink-0 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-500"
          style={{ opacity: isHovered || isActive ? 0 : 1, transform: isHovered || isActive ? "scale(0) rotate(-180deg)" : "scale(1) rotate(0deg)" }}
        >
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

const menuItems = [
  { label: "Home", to: "/", sub: [] },
  { label: "Work", to: "/work", sub: [] },
  { label: "About", to: "/about", sub: [] },
  { label: "Clients", to: "/clients", sub: [] },
  { label: "Services", to: "/services", sub: [] },
];

const subRoutes = {
  "Featured": "/work/featured",
  "Video": "/work/video",
  "All Projects": "/work",
  "Filter Industries": "/work/industries",
  "20 Years": "/about/story",
  "Brand Strategy": "/services/brand-strategy",
  "Visual Identity": "/services/visual-identity",
  "Website": "/services/website",
  "Product": "/services/product",
};

const DropdownPortal = ({ children }) => createPortal(children, document.body);

const DesktopMenu = () => {
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const staticStyle = { backgroundColor: "var(--accent-bg, #F4EDD9)", color: "var(--accent-text, #020817)" };

  const menuTimeoutRef = useRef(null);
  const itemTimeoutRef = useRef(null);
  const itemRefs = useRef({});

  const handleMenuEnter = () => {
    clearTimeout(menuTimeoutRef.current);
    setIsMenuHovered(true);
  };

  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setIsMenuHovered(false);
      setActiveItem(null);
    }, 200);
  };

  const handleItemEnter = (label) => {
    clearTimeout(itemTimeoutRef.current);
    setActiveItem(label);
    const el = itemRefs.current[label];
    if (el) {
      const rect = el.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 8,
        left: rect.left + rect.width / 2,
      });
    }
  };

  const handleItemLeave = () => {
    itemTimeoutRef.current = setTimeout(() => {
      setActiveItem(null);
    }, 200);
  };

  const handleDropdownEnter = () => {
    clearTimeout(menuTimeoutRef.current);
    clearTimeout(itemTimeoutRef.current);
    setIsMenuHovered(true);
    setActiveItem(activeItem);
  };

  const handleDropdownLeave = () => {
    handleMenuLeave();
  };

  const activeMenuData = menuItems.find((m) => m.label === activeItem);

  return (
    <div
      className="flex items-center gap-1.5"
      onMouseEnter={handleMenuEnter}
      onMouseLeave={handleMenuLeave}
    >
      {/* Pill */}
      <motion.div
        layout
        style={staticStyle}
        transition={{ layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        className="px-6 py-3 rounded-full shadow-sm font-bold text-sm flex items-center overflow-hidden h-[44px] cursor-pointer"
      >
        <div className="relative h-5 overflow-hidden flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!isMenuHovered ? (
              <motion.span
                key="closed"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                className="whitespace-nowrap"
              >
                Menu
              </motion.span>
            ) : (
              <motion.div
                key="open"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                className="flex gap-6 items-center whitespace-nowrap"
              >
                {menuItems.map((item) => (
                  <div
                    key={item.label}
                    ref={(el) => (itemRefs.current[item.label] = el)}
                    onMouseEnter={() => handleItemEnter(item.label)}
                    onMouseLeave={handleItemLeave}
                    className="relative flex items-center gap-0.5 hover:opacity-60 transition-opacity cursor-pointer"
                  >
                    <TransitionLink to={item.to}>
                      <span>{item.label}</span>
                    </TransitionLink>
                    {item.sub.length > 0 && (
                      <motion.svg
                        animate={{ rotate: activeItem === item.label ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                      >
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </motion.svg>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Icon circle */}
      <motion.div
        style={staticStyle}
        className="w-11 h-11 rounded-full shadow-sm flex items-center justify-center flex-shrink-0 cursor-pointer"
      >
        <MenuIcon isOpen={isMenuHovered} />
      </motion.div>

      {/* Dropdown via portal */}
      <DropdownPortal>
        <AnimatePresence>
          {activeItem && activeMenuData && activeMenuData.sub.length > 0 && (
            <motion.div
              key={activeItem}
              initial={{ opacity: 0, y: -4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
              style={{
                backgroundColor: "var(--accent-bg, #F4EDD9)",
                color: "var(--accent-text, #020817)",
                position: "fixed",
                top: dropdownPos.top,
                left: dropdownPos.left,
                transform: activeItem === "Services" ? "translateX(-80%)" : "translateX(-50%)",
                zIndex: 99999,
              }}
              className="rounded-2xl shadow-xl p-3 flex flex-col gap-1.5 min-w-max"
            >
              {activeMenuData.sub.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <TransitionLink to={subRoutes[s] || activeMenuData.to}>
                    <div
                      style={{
                        border: "1px solid color-mix(in srgb, var(--accent-text, #020817) 20%, transparent)"
                      }}
                      className="text-sm px-4 py-2 rounded-full text-center hover:bg-black/5 hover:opacity-100 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {s}
                    </div>
                  </TransitionLink>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </DropdownPortal>
    </div>
  );
};

export default function Navbar() {
  const { scrollY } = useScroll();
  const [showCenterLogo, setShowCenterLogo] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", (latest) => {
      setShowCenterLogo(latest > 300);
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    const footer = document.getElementById("main-footer");
    if (footer) observer.observe(footer);

    return () => {
      unsub();
      if (footer) observer.unobserve(footer);
    };
  }, [scrollY]);

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ 
        opacity: isFooterVisible ? 0 : 1,
        y: isFooterVisible ? -20 : 0,
        pointerEvents: isFooterVisible ? "none" : "auto"
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full flex items-center justify-between px-4 md:px-8 py-4 md:py-8 pointer-events-none"
      style={{ position: "relative", zIndex: 9999 }}
    >
      <div className="md:hidden block pointer-events-auto leading-none mt-4">
        <TransitionLink to="/">
          <img src="/logonewlong.png" alt="Marshall Haber Creative Group" className="h-6 w-auto cursor-pointer" />
        </TransitionLink>
      </div>

      {/* Desktop Left: Let's Work */}
      <div className="hidden md:block shrink-0">
        <NavButton
          text="Let's work"
          icon={null}
          hoverIcon={<SmileIcon />}
          isLetsWork={true}
        />
      </div>

      {/* Center: Desktop Logo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center pointer-events-auto h-24">
        <TransitionLink to="/">
          <div className="relative flex items-center justify-center">
            {/* Invisible placeholder for maintaining container dimensions */}
            <img
              src="/footerLogoBlack.png"
              alt=""
              className="h-24 w-auto opacity-0 pointer-events-none"
            />
            <img
              src="/logonewlong.png"
              alt="Marshall Haber Creative Group"
              className="absolute h-24 w-auto cursor-pointer transition-opacity duration-700 ease-in-out"
              style={{ opacity: showCenterLogo ? 0 : 1 }}
            />
            <img
              src="/logo.png"
              alt="MHCG"
              className="absolute h-14 w-auto cursor-pointer transition-opacity duration-700 ease-in-out"
              style={{ 
                opacity: showCenterLogo ? 1 : 0,
                filter: "invert(1)" 
              }}
            />
          </div>
        </TransitionLink>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 pointer-events-auto shrink-0">
        {/* Mobile toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(true)}>
            <MenuIcon isOpen={isOpen} />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center">
          <DesktopMenu />
        </div>
      </div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#020817] z-[200] pointer-events-auto flex flex-col justify-between px-6 py-8 md:hidden text-[#F4EDD9]"
          >
            <div className="flex justify-between items-center">
              <img src="/logonewlong.png" className="h-6" />
              <button
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="w-10 h-10 rounded-full bg-[#F4EDD9] text-[#020817] flex items-center justify-center cursor-pointer border border-white/20"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-6 text-3xl font-semibold">
              <TransitionLink to="/" onClick={() => setIsOpen(false)}>Home</TransitionLink>
              <TransitionLink to="/work" onClick={() => setIsOpen(false)}>Work</TransitionLink>
              <TransitionLink to="/about" onClick={() => setIsOpen(false)}>About</TransitionLink>
              <TransitionLink to="/services" onClick={() => setIsOpen(false)}>Services</TransitionLink>
              <TransitionLink to="/contact" onClick={() => setIsOpen(false)}>Contact</TransitionLink>
            </div>

            <div className="text-sm">
              <p className="uppercase text-xs opacity-50">Say hello</p>
              <p className="underline mb-4">newbiz@marshallhaber.com</p>
              <p className="uppercase text-xs opacity-50">Exceptional talent?</p>
              <p className="underline">apply@marshallhaber.com</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}