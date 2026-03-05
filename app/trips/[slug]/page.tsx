import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TripDetailsTemplate from "@/components/trips/TripDetailsTemplate";
import { featuredTripSlugs, tripBySlug } from "@/lib/data/trips";

interface FeaturedTripPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return featuredTripSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: FeaturedTripPageProps): Metadata {
  const trip = tripBySlug.get(params.slug);
  if (!trip || !featuredTripSlugs.includes(params.slug as (typeof featuredTripSlugs)[number])) {
    return {
      title: "Trip Not Found | Explorers Group"
    };
  }

  return {
    title: `${trip.name} | Explorers Group`,
    description: trip.summary
  };
}

export default function FeaturedTripPage({ params }: FeaturedTripPageProps) {
  const isFeatured = featuredTripSlugs.includes(params.slug as (typeof featuredTripSlugs)[number]);
  if (!isFeatured) {
    notFound();
  }

  const trip = tripBySlug.get(params.slug);
  if (!trip) {
    notFound();
  }

  return <TripDetailsTemplate trip={trip} />;
}
