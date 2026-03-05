import { NextRequest, NextResponse } from "next/server";
import { trips } from "@/lib/data/trips";

const ALL_VALUES = new Set(["all", "all trips", "all destinations", "any", "any month", "any duration"]);

function isAllFilter(value: string | null): boolean {
  if (!value) {
    return true;
  }
  return ALL_VALUES.has(value.trim().toLowerCase());
}

function durationMatches(durationDays: number, selectedDuration: string | null): boolean {
  if (!selectedDuration || isAllFilter(selectedDuration)) {
    return true;
  }

  if (selectedDuration === "1-3 Days") {
    return durationDays >= 1 && durationDays <= 3;
  }

  if (selectedDuration === "4-6 Days") {
    return durationDays >= 4 && durationDays <= 6;
  }

  if (selectedDuration === "7+ Days") {
    return durationDays >= 7;
  }

  return true;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const sidebarCategory = searchParams.get("sidebarCategory");
  const destination = searchParams.get("destination");
  const month = searchParams.get("month");
  const difficulty = searchParams.get("difficulty");
  const duration = searchParams.get("duration");
  const query = searchParams.get("q")?.trim().toLowerCase() ?? "";

  const page = Math.max(1, Number(searchParams.get("page") ?? 1) || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 24) || 24));

  const filtered = trips.filter((trip) => {
    const categoryMatch = isAllFilter(category) ? true : trip.category === category;
    const sidebarMatch = isAllFilter(sidebarCategory) ? true : trip.category === sidebarCategory;
    const destinationMatch = isAllFilter(destination) ? true : trip.destination === destination;
    const monthMatch = isAllFilter(month) ? true : trip.bestMonths.includes(month ?? "");
    const difficultyMatch = isAllFilter(difficulty) ? true : trip.difficulty === difficulty;
    const durationMatch = durationMatches(trip.durationDays, duration);

    const textMatch = query
      ? [trip.name, trip.destination, trip.summary, trip.region, trip.category]
          .join(" ")
          .toLowerCase()
          .includes(query)
      : true;

    return (
      categoryMatch &&
      sidebarMatch &&
      destinationMatch &&
      monthMatch &&
      difficultyMatch &&
      durationMatch &&
      textMatch
    );
  });

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return NextResponse.json({
    success: true,
    total: filtered.length,
    page,
    limit,
    trips: paginated
  });
}
