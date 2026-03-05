import { NextResponse } from "next/server";
import { confirmBookingPayment } from "@/lib/db";
import { sendPaymentConfirmedEmail } from "@/lib/mailer";
import { confirmPaymentSchema } from "@/lib/validators/payment";

export async function POST(request: Request) {
  const callbackSecret = process.env.PAYMENT_CALLBACK_SECRET;
  if (!callbackSecret) {
    return NextResponse.json(
      {
        success: false,
        error: "Payment callback secret is not configured"
      },
      { status: 500 }
    );
  }

  const incomingSecret = request.headers.get("x-payment-callback-secret");
  if (incomingSecret !== callbackSecret) {
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
          error: "Invalid payment confirmation payload",
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
      receiptNumber: booking.receiptNumber,
      paymentStatus: booking.paymentStatus
    });
  } catch (error) {
    console.error("Payment confirmation route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to confirm payment"
      },
      { status: 500 }
    );
  }
}
