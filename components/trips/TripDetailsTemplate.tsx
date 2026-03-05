import Image from "next/image";
import DynamicQRPayment from "@/components/booking/DynamicQRPayment";
import ItineraryAccordion from "@/components/trips/ItineraryAccordion";
import TripFaqAccordion from "@/components/trips/TripFaqAccordion";
import { Trip } from "@/types/trip";

interface TripDetailsTemplateProps {
  trip: Trip;
}

export default function TripDetailsTemplate({ trip }: TripDetailsTemplateProps) {
  const inclusions =
    trip.inclusions ?? [
      "Trip lead and on-ground coordination",
      "Stay and meals as per itinerary",
      "Local permits and access support"
    ];
  const exclusions =
    trip.exclusions ?? [
      "Personal expenses and optional activities",
      "Transport outside itinerary scope",
      "Anything not listed in inclusions"
    ];
  const faqs =
    trip.faqs ?? [
      {
        question: "How do I reserve this trip?",
        answer:
          "Use the booking widget on the right, fill details, and pay through generated UPI QR."
      },
      {
        question: "Do you provide support on trek days?",
        answer:
          "Yes. Every trip includes a lead coordinator and guided support team."
      }
    ];

  return (
    <div className="pb-16">
      <section className="relative isolate h-[65vh] overflow-hidden">
        <Image src={trip.heroImage} alt={trip.name} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/65" />

        <div className="relative mx-auto flex h-full w-full max-w-7xl items-end px-6 pb-12 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <p className="font-display text-xs uppercase tracking-[0.24em] text-[#f2d8b2]">
              {trip.region} Expedition
            </p>
            <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">{trip.name}</h1>
            <p className="mt-3 text-[#f3ebde]">{trip.summary}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#f8efe2]">
              <span className="rounded-full border border-white/30 px-3 py-1">{trip.destination}</span>
              <span className="rounded-full border border-white/30 px-3 py-1">{trip.durationDays} Days</span>
              <span className="rounded-full border border-white/30 px-3 py-1">{trip.difficulty}</span>
              {trip.featured ? (
                <span className="rounded-full bg-[#7b5a3b] px-3 py-1 text-white">Featured Page</span>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-6 pt-10 sm:px-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-16">
        <div className="space-y-8">
          <article className="space-y-4 rounded-2xl border border-[#dbcab2] bg-[#fffaf1]/95 p-6">
            <h2 className="font-display text-2xl text-[#2f2418]">Trip Overview</h2>
            <p className="text-[#6f5b44]">
              {trip.overview ??
                "This departure is designed for structured pacing, guided trail support, and smooth end-to-end logistics for your group."}
            </p>
          </article>

          <article className="space-y-5 rounded-2xl border border-[#dbcab2] bg-[#fffaf1]/95 p-6">
            <h2 className="font-display text-2xl text-[#2f2418]">Trip Highlights</h2>
            <ul className="space-y-2 text-[#6f5b44]">
              {trip.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="mt-[3px] text-[#7b5a3b]">*</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="space-y-5 rounded-2xl border border-[#dbcab2] bg-[#fffaf1]/95 p-6">
            <h2 className="font-display text-2xl text-[#2f2418]">Immersive Gallery</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {trip.gallery.map((image, index) => (
                <div
                  key={image}
                  className={`relative overflow-hidden rounded-xl ${
                    index === 0 ? "h-72 sm:col-span-2" : "h-52"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${trip.name} image ${index + 1}`}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                    sizes={index === 0 ? "100vw" : "(max-width: 640px) 100vw, 50vw"}
                  />
                </div>
              ))}
            </div>
          </article>

          <article className="space-y-5 rounded-2xl border border-[#dbcab2] bg-[#fffaf1]/95 p-6">
            <h2 className="font-display text-2xl text-[#2f2418]">Daily Itinerary</h2>
            <ItineraryAccordion days={trip.itinerary} />
          </article>

          <article className="grid gap-4 rounded-2xl border border-[#dbcab2] bg-[#fffaf1]/95 p-6 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl text-[#2f2418]">Inclusions</h2>
              <ul className="mt-3 space-y-2 text-[#6f5b44]">
                {inclusions.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[2px] text-[#7b5a3b]">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl text-[#2f2418]">Exclusions</h2>
              <ul className="mt-3 space-y-2 text-[#6f5b44]">
                {exclusions.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[2px] text-[#7b5a3b]">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="space-y-5 rounded-2xl border border-[#dbcab2] bg-[#fffaf1]/95 p-6">
            <h2 className="font-display text-2xl text-[#2f2418]">Frequently Asked Questions</h2>
            <TripFaqAccordion faqs={faqs} />
          </article>
        </div>

        <aside className="h-fit space-y-4 lg:sticky lg:top-6">
          <div className="rounded-2xl border border-[#dbcab2] bg-[#fffaf1]/95 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#8f7659]">Best Months</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {trip.bestMonths.map((month) => (
                <span key={month} className="rounded-full bg-[#f0e4d2] px-3 py-1 text-xs text-[#5e4a35]">
                  {month}
                </span>
              ))}
            </div>
          </div>
          <DynamicQRPayment tripId={trip.id} tripName={trip.name} tripPrice={trip.price} />
        </aside>
      </section>
    </div>
  );
}
