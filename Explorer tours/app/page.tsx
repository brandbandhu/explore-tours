"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ExplorersAIBot from "@/components/ai/ExplorersAIBot";
import HeroSection, { HeroFilters } from "@/components/home/HeroSection";
import TripCard from "@/components/home/TripCard";
import TripSidebar from "@/components/home/TripSidebar";
import TripTopBar from "@/components/home/TripTopBar";
import SocialProof from "@/components/social/SocialProof";
import { featuredTrips, trips } from "@/lib/data/trips";
import { Trip, TripCategory } from "@/types/trip";

const months = [
  "Any Month",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const durations = ["Any Duration", "1-3 Days", "4-6 Days", "7+ Days"];

const sidebarItems = [
  "All Indian Trips",
  "Weekend Treks",
  "Himalayan Treks",
  "Monsoon Treks",
  "Spiritual Trails",
  "Desert Expeditions",
  "Coastal Escapes",
  "Forest Trails"
];

const defaultHeroFilters: HeroFilters = {
  query: "",
  category: "All Trips",
  destination: "All Destinations",
  month: "Any Month",
  difficulty: "Any",
  duration: "Any Duration"
};

interface TripListResponse {
  success: boolean;
  total: number;
  trips: Trip[];
  error?: string;
}

const sectionReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

function buildTripQuery(filters: HeroFilters, sidebarCategory: string) {
  const params = new URLSearchParams();

  if (filters.query.trim()) {
    params.set("q", filters.query.trim());
  }

  if (filters.category !== "All Trips") {
    params.set("category", filters.category);
  }

  if (filters.destination !== "All Destinations") {
    params.set("destination", filters.destination);
  }

  if (filters.month !== "Any Month") {
    params.set("month", filters.month);
  }

  if (filters.difficulty !== "Any") {
    params.set("difficulty", filters.difficulty);
  }

  if (filters.duration !== "Any Duration") {
    params.set("duration", filters.duration);
  }

  if (sidebarCategory !== "All Indian Trips") {
    params.set("sidebarCategory", sidebarCategory);
  }

  return params;
}

export default function HomePage() {
  const [activeSidebar, setActiveSidebar] = useState("All Indian Trips");
  const [heroFilters, setHeroFilters] = useState<HeroFilters>(defaultHeroFilters);
  const [listedTrips, setListedTrips] = useState<Trip[]>(trips);
  const [totalTrips, setTotalTrips] = useState<number>(trips.length);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string>("");

  const destinations = useMemo(
    () => ["All Destinations", ...Array.from(new Set(trips.map((trip) => trip.destination)))],
    []
  );

  const categories = useMemo(
    () =>
      ["All Trips", ...Array.from(new Set(trips.map((trip) => trip.category)))] as Array<
        TripCategory | "All Trips"
      >,
    []
  );

  const fetchTrips = useCallback(async (filters: HeroFilters, sidebarCategory: string) => {
    setIsLoading(true);
    setLoadError("");

    try {
      const query = buildTripQuery(filters, sidebarCategory);
      const response = await fetch(`/api/trips?${query.toString()}`, {
        method: "GET",
        cache: "no-store"
      });

      const data = (await response.json()) as TripListResponse;
      if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Unable to load trips.");
      }

      setListedTrips(data.trips);
      setTotalTrips(data.total);
    } catch (error) {
      setListedTrips([]);
      setTotalTrips(0);
      setLoadError(error instanceof Error ? error.message : "Unable to load trips.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchTrips(defaultHeroFilters, "All Indian Trips");
  }, [fetchTrips]);

  const handleFilterChange = <K extends keyof HeroFilters>(key: K, value: HeroFilters[K]) => {
    setHeroFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    void fetchTrips(heroFilters, activeSidebar);
  };

  const handleSidebarSelect = (item: string) => {
    setActiveSidebar(item);
    void fetchTrips(heroFilters, item);
  };

  const destinationCards = trips.slice(0, 5);

  return (
    <main className="min-h-screen bg-transparent text-[#2f2418]">
      <TripTopBar />

      <div className="mx-auto w-full max-w-[1320px] px-4 pb-16 pt-4 sm:px-5">
        <div className="grid gap-4 md:grid-cols-[240px_minmax(0,1fr)]">
          <div>
            <TripSidebar
              items={sidebarItems}
              activeItem={activeSidebar}
              onSelect={handleSidebarSelect}
            />
          </div>

          <div className="space-y-6">
            <HeroSection
              destinations={destinations}
              months={months}
              categories={categories}
              durations={durations}
              filters={heroFilters}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
            />

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionReveal}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="rounded-2xl border border-[#dbcab2] bg-[#fffaf1]/95 p-4 shadow-sm sm:p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-2xl text-[#2f2418]">Detailed Trip Pages</h2>
                <Link href="/trips" className="text-sm font-semibold text-[#7b5a3b] hover:underline">
                  View all 4 pages
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {featuredTrips.map((trip, index) => (
                  <motion.div
                    key={`featured-${trip.slug}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: index * 0.08, duration: 0.35, ease: "easeOut" }}
                  >
                    <Link
                      href={`/trips/${trip.slug}`}
                      className="group block overflow-hidden rounded-xl border border-[#d7c5ad] bg-[#fbf3e7]"
                    >
                      <div className="relative h-32">
                        <Image
                          src={trip.heroImage}
                          alt={trip.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-black/10" />
                        <p className="absolute bottom-2 left-3 right-3 text-sm font-semibold text-white">
                          {trip.name}
                        </p>
                      </div>
                      <div className="px-3 py-2 text-xs text-[#6f5b44]">
                        {trip.durationDays} Days | {trip.difficulty}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionReveal}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="rounded-2xl border border-[#dbcab2] bg-[#fffaf1]/95 p-4 shadow-sm sm:p-5"
            >
              <h2 className="font-display text-2xl text-[#2f2418]">New User Exclusive</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-[#e3d1b8] bg-[#f8efe2] p-4">
                  <p className="text-sm font-semibold text-[#2f2418]">Flat 10% Off on First Trip</p>
                  <p className="mt-1 text-sm text-[#6f5b44]">Use code: EXPLORE10 at checkout.</p>
                </div>
                <div className="rounded-xl border border-[#d8ccb9] bg-[#f2eee6] p-4">
                  <p className="text-sm font-semibold text-[#2f2418]">Free Trek Leader Briefing Kit</p>
                  <p className="mt-1 text-sm text-[#6f5b44]">For all Himalayan departures.</p>
                </div>
                <div className="rounded-xl border border-[#ebd8bf] bg-[#f6eee2] p-4">
                  <p className="text-sm font-semibold text-[#2f2418]">Zero-fee UPI Payments</p>
                  <p className="mt-1 text-sm text-[#6f5b44]">Instant booking confirmation after payment.</p>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionReveal}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="rounded-2xl border border-[#dbcab2] bg-[#fffaf1]/95 p-4 shadow-sm sm:p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-2xl text-[#2f2418]">Get Inspired For Your Next Trip</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {destinationCards.map((trip, index) => (
                  <motion.button
                    key={`inspire-${trip.id}`}
                    type="button"
                    onClick={() => {
                      const nextFilters = { ...heroFilters, destination: trip.destination };
                      setHeroFilters(nextFilters);
                      void fetchTrips(nextFilters, activeSidebar);
                    }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: index * 0.07, duration: 0.35, ease: "easeOut" }}
                    className="relative h-28 overflow-hidden rounded-xl text-left"
                  >
                    <Image
                      src={trip.heroImage}
                      alt={trip.destination}
                      fill
                      sizes="(max-width: 640px) 100vw, 20vw"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/20" />
                    <div className="absolute bottom-2 left-3 right-3">
                      <p className="text-sm font-semibold text-white">{trip.destination}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionReveal}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="rounded-2xl border border-[#dbcab2] bg-[#fffaf1]/95 p-4 shadow-sm sm:p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-2xl text-[#2f2418]">Indian Trips You May Like</h2>
                <motion.p
                  key={totalTrips}
                  initial={{ opacity: 0.3, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="text-sm text-[#7a6853]"
                >
                  {totalTrips} trips found
                </motion.p>
              </div>

              {isLoading ? (
                <div className="rounded-xl border border-[#d4c2a7] bg-[#f7f0e4] p-6 text-center text-[#6f5b44]">
                  Fetching trips...
                </div>
              ) : loadError ? (
                <div className="rounded-xl border border-[#e3b5a4] bg-[#f8e7e1] p-6 text-center text-[#7a3d2f]">
                  {loadError}
                </div>
              ) : listedTrips.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#d4c2a7] bg-[#f7f0e4] p-6 text-center text-[#6f5b44]">
                  No trips match your filters. Try changing search, month, destination, or difficulty.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {listedTrips.map((trip, index) => (
                    <motion.div
                      key={trip.id}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: index * 0.03, duration: 0.35, ease: "easeOut" }}
                    >
                      <TripCard trip={trip} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.section>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionReveal}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <SocialProof />
            </motion.div>
          </div>
        </div>
      </div>

      <ExplorersAIBot />
    </main>
  );
}
