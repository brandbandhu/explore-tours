"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TripFaq } from "@/types/trip";

interface TripFaqAccordionProps {
  faqs: TripFaq[];
}

export default function TripFaqAccordion({ faqs }: TripFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question} className="overflow-hidden rounded-xl border border-[#dbcab2] bg-[#f8efe2]">
            <button
              type="button"
              onClick={() => setOpenIndex((prev) => (prev === index ? -1 : index))}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <span className="font-semibold text-[#2f2418]">{faq.question}</span>
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
                  <p className="px-4 pb-4 text-sm text-[#6f5b44]">{faq.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
