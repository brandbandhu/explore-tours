import { Parser } from "json2csv";
import { NextResponse } from "next/server";
import { fetchAllBookings } from "@/lib/db";

export async function GET(request: Request) {
  const adminKey = request.headers.get("x-admin-key");
  if (!adminKey || adminKey !== process.env.ADMIN_EXPORT_KEY) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized"
      },
      { status: 401 }
    );
  }

  try {
    const rows = await fetchAllBookings();
    const parser = new Parser({
      fields: [
        "id",
        "tripId",
        "tripName",
        "tripPrice",
        "fullName",
        "email",
        "phone",
        "travelers",
        "departureMonth",
        "paymentStatus",
        "paymentRef",
        "paymentUtr",
        "paymentConfirmedAt",
        "receiptNumber",
        "notes",
        "createdAt",
        "updatedAt"
      ]
    });

    const csv = parser.parse(
      rows.map((booking) => ({
        ...booking,
        tripPrice: booking.tripPrice,
        paymentConfirmedAt: booking.paymentConfirmedAt
          ? booking.paymentConfirmedAt.toISOString()
          : null,
        createdAt: booking.createdAt.toISOString(),
        updatedAt: booking.updatedAt.toISOString()
      }))
    );

    const dateLabel = new Date().toISOString().slice(0, 10);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename=explorers-bookings-${dateLabel}.csv`
      }
    });
  } catch (error) {
    console.error("CSV export route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to generate export"
      },
      { status: 500 }
    );
  }
}
