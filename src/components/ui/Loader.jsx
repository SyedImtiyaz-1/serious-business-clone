
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loader after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null; // Unmount after it finishes to free up DOM

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 2.2 }}
      onAnimationComplete={() => setIsLoading(false)}
      className="fixed inset-0 z-[99999] bg-primary flex items-center justify-center pointer-events-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
        className="overflow-hidden"
      >
        <img src="/logonewlong.png" alt="Marshall Haber Creative Group" className="h-[8vw] md:h-[6vw] w-auto" />
      </motion.div>
    </motion.div>
  );
}
