import { NextResponse } from "next/server";
import { submitBookingPaymentProof } from "@/lib/db";
import { confirmPaymentSchema } from "@/lib/validators/payment";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = confirmPaymentSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid payment proof payload",
          details: parsed.error.flatten()
        },
        { status: 400 }
      );
    }

    const booking = await submitBookingPaymentProof(parsed.data);
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
      message: "Payment reference submitted. We will verify and confirm shortly."
    });
  } catch (error) {
    console.error("Payment proof route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to submit payment proof"
      },
      { status: 500 }
    );
  }
}
