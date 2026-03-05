import { notFound } from "next/navigation";
import PaymentLandingClient from "@/components/booking/PaymentLandingClient";
import { fetchBookingById } from "@/lib/db";
import { buildUpiIntent } from "@/lib/payment";

interface PaymentPageProps {
  params: {
    bookingId: string;
  };
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  const booking = await fetchBookingById(params.bookingId);
  if (!booking) {
    notFound();
  }

  const upiIntent = buildUpiIntent({
    amount: booking.tripPrice,
    tripName: booking.tripName,
    paymentRef: booking.paymentRef
  });

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-5 pb-16 pt-10">
      <PaymentLandingClient
        bookingId={booking.id}
        tripName={booking.tripName}
        amount={booking.tripPrice}
        paymentRef={booking.paymentRef}
        upiIntent={upiIntent}
        initialPaymentStatus={booking.paymentStatus}
        initialReceiptNumber={booking.receiptNumber}
      />
    </main>
  );
}
