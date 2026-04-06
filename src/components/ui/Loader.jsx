import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigation } from "../../context/NavigationContext";

const COLORS = ["#1a1a1a", "#fac541", "#cba6f7", "#f9c4d2"];
const SLIDE = 0.55;
const STAGGER = 0.08;
const ALL_IN_MS = (SLIDE + (COLORS.length - 1) * STAGGER) * 1000; // ~790ms

function LoaderPanel({ color, index, isLoading }) {
  const controls = useAnimation();

  useEffect(() => {
    if (isLoading) {
      controls.set({ y: "100%" });
      controls.start({
        y: "0%",
        transition: { duration: SLIDE, delay: index * STAGGER, ease: [0.76, 0, 0.24, 1] },
      });
    } else {
      controls.start({
        y: "-100%",
        transition: {
          duration: SLIDE,
          delay: (COLORS.length - 1 - index) * STAGGER,
          ease: [0.76, 0, 0.24, 1],
        },
      });
    }
  }, [isLoading]);

  return (
    <motion.div
      animate={controls}
      initial={{ y: "100%" }}
      style={{ position: "absolute", inset: 0, backgroundColor: color, zIndex: index }}
    />
  );
}

export default function Loader() {
  const { isLoading, isNavigating } = useNavigation();
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    if (isLoading && !isNavigating) {
      // Initial load only — show logo immediately
      setShowLogo(true);
    } else {
      setShowLogo(false);
    }
  }, [isLoading, isNavigating]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 99998 }}>

      {/* Colored panels — only shown during link navigation, not on initial load */}
      {isNavigating && COLORS.map((color, i) => (
        <LoaderPanel key={color} color={color} index={i} isLoading={isLoading} />
      ))}

      {/* On initial load: plain pink background matching homepage */}
      {!isNavigating && isLoading && (
        <div style={{ position: "absolute", inset: 0, backgroundColor: "#f9c4d2", zIndex: 0 }} />
      )}

      {/* Logo — always shown during load */}
      <motion.div
        style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: COLORS.length }}
        animate={{ opacity: showLogo ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <img
          src="/footerLogoBlack.png"
          alt="Marshall Haber Creative Group"
          style={{ height: "clamp(40px, 8vw, 100px)", width: "auto" }}
        />
      </motion.div>
    </div>
  );
}
