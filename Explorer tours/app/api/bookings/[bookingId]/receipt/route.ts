import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { NextResponse } from "next/server";
import { fetchBookingById } from "@/lib/db";

interface RouteParams {
  params: {
    bookingId: string;
  };
}

async function createReceiptPdf(booking: Awaited<ReturnType<typeof fetchBookingById>>) {
  if (!booking) {
    throw new Error("Booking is required to generate receipt");
  }

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const colorDark = rgb(0.2, 0.15, 0.1);
  const colorAccent = rgb(0.48, 0.35, 0.23);
  let y = 800;

  page.drawText("Explorers Group", {
    x: 50,
    y,
    size: 24,
    font: bold,
    color: colorAccent
  });

  y -= 34;
  page.drawText("Payment Receipt", {
    x: 50,
    y,
    size: 16,
    font: bold,
    color: colorDark
  });

  y -= 24;
  page.drawLine({
    start: { x: 50, y },
    end: { x: 545, y },
    color: rgb(0.82, 0.73, 0.62),
    thickness: 1
  });

  const tripPrice = booking.tripPrice;
  const lines = [
    `Receipt Number: ${booking.receiptNumber ?? "N/A"}`,
    `Booking ID: ${booking.id}`,
    `Payment Ref: ${booking.paymentRef}`,
    `UPI UTR: ${booking.paymentUtr ?? "N/A"}`,
    `Payment Confirmed At: ${booking.paymentConfirmedAt ? booking.paymentConfirmedAt.toISOString() : "N/A"}`,
    "",
    `Trip: ${booking.tripName}`,
    `Trip ID: ${booking.tripId}`,
    `Travelers: ${booking.travelers}`,
    `Departure Month: ${booking.departureMonth}`,
    `Customer: ${booking.fullName}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    "",
    `Amount Paid: INR ${tripPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  ];

  y -= 32;
  for (const line of lines) {
    page.drawText(line, {
      x: 50,
      y,
      size: 11,
      font,
      color: colorDark
    });
    y -= 18;
  }

  y -= 12;
  page.drawText("Thank you for booking with Explorers Group.", {
    x: 50,
    y,
    size: 11,
    font: bold,
    color: colorAccent
  });

  return pdf.save();
}

export async function GET(_: Request, { params }: RouteParams) {
  try {
    const booking = await fetchBookingById(params.bookingId);
    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    if (booking.paymentStatus !== "CONFIRMED") {
      return NextResponse.json(
        {
          success: false,
          error: "Payment is not confirmed. Receipt is available only after confirmation."
        },
        { status: 400 }
      );
    }

    const pdfBytes = await createReceiptPdf(booking);
    const normalizedBytes = Uint8Array.from(pdfBytes);
    const fileName = `explorers-receipt-${booking.id}.pdf`;

    return new NextResponse(normalizedBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${fileName}`
      }
    });
  } catch (error) {
    console.error("Receipt PDF route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to generate receipt PDF"
      },
      { status: 500 }
    );
  }
}
