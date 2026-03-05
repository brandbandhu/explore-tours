export type TripDifficulty = "Easy" | "Moderate" | "Challenging" | "Expedition";
export type TripRegion =
  | "Sahyadri"
  | "Himalaya"
  | "Western Ghats"
  | "Northeast"
  | "Desert"
  | "Coastal";
export type TripCategory =
  | "Weekend Treks"
  | "Himalayan Treks"
  | "Monsoon Treks"
  | "Spiritual Trails"
  | "Desert Expeditions"
  | "Coastal Escapes"
  | "Forest Trails";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TripFaq {
  question: string;
  answer: string;
}

export interface Trip {
  id: string;
  slug: string;
  name: string;
  summary: string;
  region: TripRegion;
  category: TripCategory;
  destination: string;
  durationDays: number;
  difficulty: TripDifficulty;
  bestMonths: string[];
  price: number;
  heroVideo: string;
  heroImage: string;
  gallery: string[];
  highlights: string[];
  itinerary: ItineraryDay[];
  overview?: string;
  inclusions?: string[];
  exclusions?: string[];
  faqs?: TripFaq[];
  featured?: boolean;
}
