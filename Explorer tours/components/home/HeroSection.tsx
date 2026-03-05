"use client";

import { motion } from "framer-motion";
import { TripCategory, TripDifficulty } from "@/types/trip";

export interface HeroFilters {
  query: string;
  category: TripCategory | "All Trips";
  destination: string;
  month: string;
  duration: string;
  difficulty: TripDifficulty | "Any";
}

interface HeroSectionProps {
  destinations: string[];
  months: string[];
  categories: Array<TripCategory | "All Trips">;
  durations: string[];
  filters: HeroFilters;
  onFilterChange: <K extends keyof HeroFilters>(key: K, value: HeroFilters[K]) => void;
  onSearch?: () => void;
}

const difficultyOptions: Array<TripDifficulty | "Any"> = [
  "Any",
  "Easy",
  "Moderate",
  "Challenging",
  "Expedition"
];

export default function HeroSection({
  destinations,
  months,
  categories,
  durations,
  filters,
  onFilterChange,
  onSearch
}: HeroSectionProps) {
  const submitFilters = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch?.();
  };

  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#3d2f22] p-5 sm:p-6">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#3d2f22]/88 via-[#6e543a]/80 to-[#8a6e4d]/70" />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <p className="text-xs uppercase tracking-[0.22em] text-[#f3e5cf]/85">Explorers Group</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-white sm:text-5xl">
          Your Indian Trip Starts Here
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-[#f5e8d4] sm:text-base">
          Premium trekking departures, curated itineraries, and direct booking for Indian adventures.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
        className="relative z-10 mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2"
      >
        {categories.slice(0, 5).map((item) => {
          const isActive = filters.category === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => onFilterChange("category", item)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                isActive
                  ? "border-[#f2e6d4] bg-[#f2e6d4] text-[#5f4630]"
                  : "border-[#f2e6d4]/45 bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {item}
            </button>
          );
        })}
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
        onSubmit={submitFilters}
        className="relative z-10 mx-auto mt-6 max-w-6xl rounded-xl bg-[#fffaf1] p-4 shadow-xl"
      >
        <div className="grid gap-2 md:grid-cols-6">
          <label className="space-y-1 rounded-lg border border-[#dcccb4] px-3 py-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8f7659]">
              Trip Name
            </span>
            <input
              value={filters.query}
              onChange={(event) => onFilterChange("query", event.target.value)}
              placeholder="Kedarkantha, Sahyadri..."
              className="w-full bg-transparent text-sm font-medium text-[#4e3c2b] outline-none placeholder:text-[#9f8b73]"
            />
          </label>

          <label className="space-y-1 rounded-lg border border-[#dcccb4] px-3 py-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8f7659]">
              Destination
            </span>
            <select
              value={filters.destination}
              onChange={(event) => onFilterChange("destination", event.target.value)}
              className="w-full bg-transparent text-sm font-medium text-[#4e3c2b] outline-none"
            >
              {destinations.map((destination) => (
                <option key={destination} value={destination}>
                  {destination}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1 rounded-lg border border-[#dcccb4] px-3 py-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8f7659]">
              Month
            </span>
            <select
              value={filters.month}
              onChange={(event) => onFilterChange("month", event.target.value)}
              className="w-full bg-transparent text-sm font-medium text-[#4e3c2b] outline-none"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1 rounded-lg border border-[#dcccb4] px-3 py-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8f7659]">
              Difficulty
            </span>
            <select
              value={filters.difficulty}
              onChange={(event) =>
                onFilterChange("difficulty", event.target.value as HeroFilters["difficulty"])
              }
              className="w-full bg-transparent text-sm font-medium text-[#4e3c2b] outline-none"
            >
              {difficultyOptions.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1 rounded-lg border border-[#dcccb4] px-3 py-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8f7659]">
              Duration
            </span>
            <select
              value={filters.duration}
              onChange={(event) => onFilterChange("duration", event.target.value)}
              className="w-full bg-transparent text-sm font-medium text-[#4e3c2b] outline-none"
            >
              {durations.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="rounded-lg bg-[#7b5a3b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#66492e]"
          >
            Search Trips
          </button>
        </div>
      </motion.form>
    </section>
  );
}
