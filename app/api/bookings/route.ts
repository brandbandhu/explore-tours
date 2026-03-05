import { NextResponse } from "next/server";
import { createPendingBooking } from "@/lib/db";
import { buildUpiIntent, generatePaymentRef } from "@/lib/payment";
import { sendBookingEmail } from "@/lib/mailer";
import { bookingSchema } from "@/lib/validators/booking";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = bookingSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid booking data",
          details: parsed.error.flatten()
        },
        { status: 400 }
      );
    }

    const paymentRef = generatePaymentRef();
    const booking = await createPendingBooking(parsed.data, paymentRef);
    await sendBookingEmail(parsed.data);

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      paymentRef: booking.paymentRef,
      paymentStatus: booking.paymentStatus,
      upiIntent: buildUpiIntent({
        amount: parsed.data.tripPrice,
        tripName: parsed.data.tripName,
        paymentRef: booking.paymentRef
      })
    });
  } catch (error) {
    console.error("Booking route error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unable to process booking request";

    return NextResponse.json(
      {
        success: false,
        error: process.env.NODE_ENV === "development" ? errorMessage : "Unable to process booking request"
      },
      { status: 500 }
    );
  }
}
