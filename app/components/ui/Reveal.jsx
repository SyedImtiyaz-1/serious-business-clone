"use client";

import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0.2, y = 50 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.8, 
        delay: delay, 
        ease: [0.33, 1, 0.68, 1] 
      }}
    >
      {children}
    </motion.div>
  );
}
