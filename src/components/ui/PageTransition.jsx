import { motion, AnimatePresence } from "framer-motion";
import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TransitionContext = createContext();

const STRIP_COLORS = ["#1a1a1a", "#f5c842", "#b8a9f0"];

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }) {
  const [isActive, setIsActive] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);
  const lockRef = useRef(false);

  const startTransition = useCallback((path) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setPendingPath(path);
    setIsActive(true);
  }, []);

  const finish = useCallback(() => {
    setIsActive(false);
    setPendingPath(null);
    lockRef.current = false;
  }, []);

  return (
    <TransitionContext.Provider value={{ startTransition, isTransitioning: isActive }}>
      {children}
      <AnimatePresence>
        {isActive && (
          <TransitionOverlay
            key="transition"
            pendingPath={pendingPath}
            onFinish={finish}
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

function TransitionOverlay({ pendingPath, onFinish }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("enter"); // enter -> show -> exit -> done

  useEffect(() => {
    // Phase 1: strips enter (500ms + stagger)
    const enterDone = setTimeout(() => {
      setPhase("show");
    }, 700);

    // Phase 2: show logo, then navigate
    const navTimer = setTimeout(() => {
      navigate(pendingPath);
      window.scrollTo(0, 0);
    }, 1400);

    // Phase 3: start exit
    const exitTimer = setTimeout(() => {
      setPhase("exit");
    }, 1800);

    // Phase 4: fully done
    const doneTimer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => {
      clearTimeout(enterDone);
      clearTimeout(navTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  const isExiting = phase === "exit";

  return (
    <motion.div
      className="fixed inset-0 z-[99999]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      {/* Colored strips */}
      {STRIP_COLORS.map((color, i) => (
        <motion.div
          key={color}
          initial={{ y: "100%" }}
          animate={{ y: isExiting ? "-100%" : "0%" }}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            delay: isExiting
              ? i * 0.08
              : (STRIP_COLORS.length - 1 - i) * 0.08,
          }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: color,
            zIndex: STRIP_COLORS.length - i,
          }}
        />
      ))}

      {/* Logo + page name */}
      <div className="absolute inset-0 flex items-center justify-center z-[10] pointer-events-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={
            isExiting
              ? { scale: 1.1, opacity: 0 }
              : phase === "show"
              ? { scale: 1, opacity: 1 }
              : { scale: 0.8, opacity: 0 }
          }
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <img
            src="/logonewlong.png"
            alt="Marshall Haber Creative Group"
            className="h-[8vw] md:h-[5vw] w-auto"
          />
          <div className="h-[2px] bg-white/30 w-full" />
          <span
            className="text-white text-[6vw] md:text-[4vw] font-black tracking-tighter uppercase"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            {getPageName(pendingPath)}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function getPageName(path) {
  if (!path || path === "/") return "Home";
  // Handle nested paths like /work/motorio
  const segments = path.split("/").filter(Boolean);
  const name = segments[segments.length - 1].replace(/-/g, " ");
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default TransitionProvider;
