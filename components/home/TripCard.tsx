"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Trip } from "@/types/trip";

interface TripCardProps {
  trip: Trip;
}

const difficultyClassMap: Record<Trip["difficulty"], string> = {
  Easy: "bg-[#e3eadf] text-[#4f6146] border-[#cad7c3]",
  Moderate: "bg-[#efe3d1] text-[#785637] border-[#e1c9a9]",
  Challenging: "bg-[#f2d9c9] text-[#8a4f2a] border-[#e4b892]",
  Expedition: "bg-[#e8d5cc] text-[#7a4332] border-[#d6b3a6]"
};

export default function TripCard({ trip }: TripCardProps) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const rotateY = ((offsetX / rect.width) * 2 - 1) * 6;
    const rotateX = -((offsetY / rect.height) * 2 - 1) * 6;
    setTilt({ rotateX, rotateY });
  };

  return (
    <motion.article
      onPointerMove={onPointerMove}
      onPointerLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
      }}
      className="group relative overflow-hidden rounded-2xl border border-[#dbc9b1] bg-[#fffaf2] shadow-sm transition duration-300 hover:shadow-xl"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={trip.heroImage}
          alt={trip.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white">
          {trip.region}
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${difficultyClassMap[trip.difficulty]}`}
          >
            {trip.difficulty}
          </span>
          <span className="text-sm text-[#6f5a44]">{trip.durationDays} Days</span>
        </div>

        <h3 className="font-display text-xl text-[#2f251a]">{trip.name}</h3>
        <p className="line-clamp-2 text-sm text-[#6f5a44]">{trip.summary}</p>

        <div className="flex items-end justify-between pt-1">
          <p className="text-[#8b765d]">Starting from</p>
          <p className="font-display text-2xl text-[#7b5a3b]">INR {trip.price.toLocaleString()}</p>
        </div>

        <Link
          href={`/tours/${trip.slug}`}
          className="inline-flex rounded-lg bg-[#7b5a3b] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#66492e]"
        >
          View Trip
        </Link>
      </div>
    </motion.article>
  );
}
