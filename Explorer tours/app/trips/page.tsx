import Image from "next/image";
import Link from "next/link";
import { featuredTrips } from "@/lib/data/trips";

export const metadata = {
  title: "Featured Trip Pages | Explorers Group",
  description: "Explore detailed pages for our 4 flagship Indian trips."
};

export default function FeaturedTripsIndexPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-5 pb-16 pt-10 sm:px-8">
      <section className="rounded-2xl border border-[#dbcab2] bg-[#fffaf1]/95 p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-[#8f7659]">Explorers Group</p>
        <h1 className="mt-3 font-display text-4xl text-[#2f2418]">Featured Trip Pages</h1>
        <p className="mt-2 max-w-3xl text-[#6f5b44]">
          Detailed itinerary and booking pages for four flagship trips.
        </p>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        {featuredTrips.map((trip) => (
          <Link
            key={trip.slug}
            href={`/trips/${trip.slug}`}
            className="group overflow-hidden rounded-2xl border border-[#dbcab2] bg-[#fffaf2] shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="relative h-56">
              <Image
                src={trip.heroImage}
                alt={trip.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="space-y-2 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-[#8f7659]">{trip.region}</p>
              <h2 className="font-display text-2xl text-[#2f2418]">{trip.name}</h2>
              <p className="line-clamp-2 text-sm text-[#6f5b44]">{trip.summary}</p>
              <p className="font-semibold text-[#7b5a3b]">Open full page</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
