"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Review {
  id: string;
  author: string;
  rating: 5;
  text: string;
  location: string;
}

const reviews: Review[] = [
  {
    id: "rv-1",
    author: "Ananya S.",
    rating: 5,
    location: "Pune",
    text: "Exceptional logistics. The summit push felt premium, safe, and perfectly timed."
  },
  {
    id: "rv-2",
    author: "Rahul M.",
    rating: 5,
    location: "Mumbai",
    text: "Booking was smooth and the trek support team was highly professional."
  },
  {
    id: "rv-3",
    author: "Tanya R.",
    rating: 5,
    location: "Bengaluru",
    text: "Excellent itinerary design and clear communication from briefing to return."
  },
  {
    id: "rv-4",
    author: "Karan J.",
    rating: 5,
    location: "Delhi",
    text: "Felt like a premium expedition. Safety process was very strong."
  },
  {
    id: "rv-5",
    author: "Ishita P.",
    rating: 5,
    location: "Hyderabad",
    text: "Everything was on-time and the trail experience was unforgettable."
  }
];

export default function SocialProof() {
  const [active, setActive] = useState(0);
  const review = useMemo(() => reviews[active], [active]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="mx-auto w-full rounded-2xl border border-[#dbcab2] bg-[#fffaf1] p-6 shadow-sm">
      <p className="font-display text-sm uppercase tracking-[0.16em] text-[#7b5a3b]">
        Trusted By Indian Travelers
      </p>

      <AnimatePresence mode="wait">
        <motion.article
          key={review.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28 }}
          className="mt-4 space-y-3"
        >
          <p className="text-[#b17a2d]">{"*****"}</p>
          <p className="text-lg text-[#3f3124]">"{review.text}"</p>
          <p className="text-sm text-[#7d6853]">
            {review.author} | {review.location}
          </p>
        </motion.article>
      </AnimatePresence>

      <div className="mt-5 flex gap-2">
        {reviews.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(index)}
            className={`h-1.5 rounded-full transition ${
              active === index ? "w-8 bg-[#7b5a3b]" : "w-4 bg-[#c7b59d]"
            }`}
            aria-label={`Show review ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
