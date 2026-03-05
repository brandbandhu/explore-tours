import { NextResponse } from "next/server";
import { fetchBookingById } from "@/lib/db";

interface RouteParams {
  params: {
    bookingId: string;
  };
}

export async function GET(_: Request, { params }: RouteParams) {
  try {
    const booking = await fetchBookingById(params.bookingId);
    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking not found"
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      paymentStatus: booking.paymentStatus,
      paymentRef: booking.paymentRef,
      paymentUtr: booking.paymentUtr,
      receiptNumber: booking.receiptNumber,
      canDownloadReceipt: booking.paymentStatus === "CONFIRMED"
    });
  } catch (error) {
    console.error("Booking status route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch booking status"
      },
      { status: 500 }
    );
  }
}
