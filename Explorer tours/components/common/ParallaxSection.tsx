"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}

export default function ParallaxSection({
  children,
  className,
  offset = 70
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <section ref={sectionRef} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </section>
  );
}
