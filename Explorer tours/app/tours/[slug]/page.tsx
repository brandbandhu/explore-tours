import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TripDetailsTemplate from "@/components/trips/TripDetailsTemplate";
import { tripBySlug, trips } from "@/lib/data/trips";

interface TourPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return trips.map((trip) => ({ slug: trip.slug }));
}

export function generateMetadata({ params }: TourPageProps): Metadata {
  const trip = tripBySlug.get(params.slug);
  if (!trip) {
    return {
      title: "Tour Not Found | Explorers Group"
    };
  }

  return {
    title: `${trip.name} | Explorers Group`,
    description: trip.summary
  };
}

export default function TourDetailPage({ params }: TourPageProps) {
  const trip = tripBySlug.get(params.slug);
  if (!trip) {
    notFound();
  }

  return <TripDetailsTemplate trip={trip} />;
}
