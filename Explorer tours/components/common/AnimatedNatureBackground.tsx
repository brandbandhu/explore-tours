"use client";

import { motion } from "framer-motion";

export default function AnimatedNatureBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f2ecdf]" aria-hidden>
      <motion.div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 12%, rgba(120, 93, 66, 0.25) 0%, transparent 32%), radial-gradient(circle at 82% 10%, rgba(91, 120, 93, 0.2) 0%, transparent 30%)"
        }}
        animate={{ backgroundPosition: ["0% 0%", "4% 2%", "0% 0%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -bottom-12 -left-[22%] h-[52vh] w-[155%]"
        style={{
          background: "rgba(185, 165, 136, 0.55)",
          clipPath:
            "polygon(0% 100%, 6% 70%, 14% 88%, 23% 56%, 31% 82%, 42% 44%, 52% 79%, 60% 51%, 71% 85%, 82% 48%, 92% 78%, 100% 62%, 100% 100%)"
        }}
        animate={{ x: [0, -60, 0] }}
        transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -bottom-10 -left-[18%] h-[44vh] w-[148%]"
        style={{
          background: "rgba(140, 116, 88, 0.42)",
          clipPath:
            "polygon(0% 100%, 10% 68%, 18% 90%, 28% 52%, 37% 82%, 48% 45%, 57% 78%, 68% 49%, 77% 86%, 88% 55%, 100% 80%, 100% 100%)"
        }}
        animate={{ x: [0, 45, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-0 -left-[12%] h-44 w-[132%] opacity-75"
        style={{
          background: "linear-gradient(to top, rgba(86, 104, 77, 0.55), rgba(86, 104, 77, 0.1))",
          clipPath:
            "polygon(0% 100%, 4% 68%, 8% 100%, 12% 62%, 16% 100%, 20% 70%, 24% 100%, 29% 58%, 34% 100%, 39% 72%, 44% 100%, 49% 64%, 54% 100%, 59% 67%, 64% 100%, 69% 60%, 74% 100%, 80% 69%, 86% 100%, 92% 66%, 100% 100%)"
        }}
        animate={{ x: [0, -36, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
