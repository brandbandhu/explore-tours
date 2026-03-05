import { NextResponse } from "next/server";
import { confirmBookingPayment } from "@/lib/db";
import { sendPaymentConfirmedEmail } from "@/lib/mailer";
import { confirmPaymentSchema } from "@/lib/validators/payment";

export async function POST(request: Request) {
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
    const payload = await request.json();
    const parsed = confirmPaymentSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid confirmation payload",
          details: parsed.error.flatten()
        },
        { status: 400 }
      );
    }

    const booking = await confirmBookingPayment(parsed.data);
    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking not found"
        },
        { status: 404 }
      );
    }

    await sendPaymentConfirmedEmail(booking);

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      paymentStatus: booking.paymentStatus,
      receiptNumber: booking.receiptNumber
    });
  } catch (error) {
    console.error("Admin booking confirm route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to confirm booking payment"
      },
      { status: 500 }
    );
  }
}
