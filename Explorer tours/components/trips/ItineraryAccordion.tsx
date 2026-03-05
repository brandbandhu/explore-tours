"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ItineraryDay } from "@/types/trip";

interface ItineraryAccordionProps {
  days: ItineraryDay[];
}

export default function ItineraryAccordion({ days }: ItineraryAccordionProps) {
  const [openDay, setOpenDay] = useState<number>(days[0]?.day ?? 1);

  return (
    <div className="space-y-3">
      {days.map((item) => {
        const isOpen = openDay === item.day;
        return (
          <div key={item.day} className="overflow-hidden rounded-xl border border-[#dbcab2] bg-[#f8efe2]">
            <button
              type="button"
              onClick={() => setOpenDay((prev) => (prev === item.day ? -1 : item.day))}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <span className="font-semibold text-[#2f2418]">
                Day {item.day}: {item.title}
              </span>
              <span className="text-[#7b5a3b]">{isOpen ? "-" : "+"}</span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <p className="px-4 pb-4 text-sm text-[#6f5b44]">{item.description}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
