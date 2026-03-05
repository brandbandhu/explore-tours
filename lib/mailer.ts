import nodemailer from "nodemailer";
import { BookingInput } from "@/lib/validators/booking";
import { AppBooking } from "@/lib/db";

const getTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });
};

export async function sendBookingEmail(booking: BookingInput): Promise<void> {
  const transporter = getTransporter();
  const to = process.env.BOOKING_ALERT_EMAIL;

  if (!transporter || !to) {
    return;
  }

  const html = `
    <h2>New Explorers Group Booking</h2>
    <p><strong>Trip:</strong> ${booking.tripName}</p>
    <p><strong>Trip ID:</strong> ${booking.tripId}</p>
    <p><strong>Price:</strong> INR ${booking.tripPrice}</p>
    <p><strong>Name:</strong> ${booking.fullName}</p>
    <p><strong>Email:</strong> ${booking.email}</p>
    <p><strong>Phone:</strong> ${booking.phone}</p>
    <p><strong>Travelers:</strong> ${booking.travelers}</p>
    <p><strong>Departure Month:</strong> ${booking.departureMonth}</p>
    <p><strong>Notes:</strong> ${booking.notes ?? "N/A"}</p>
  `;

  await transporter.sendMail({
    from: process.env.BOOKING_FROM_EMAIL ?? process.env.SMTP_USER,
    to,
    subject: `[Explorers Group] Booking - ${booking.tripName}`,
    html
  });
}

export async function sendPaymentConfirmedEmail(booking: AppBooking): Promise<void> {
  const transporter = getTransporter();
  const to = process.env.BOOKING_ALERT_EMAIL;

  if (!transporter || !to) {
    return;
  }

  const html = `
    <h2>Booking Payment Confirmed</h2>
    <p><strong>Trip:</strong> ${booking.tripName}</p>
    <p><strong>Booking ID:</strong> ${booking.id}</p>
    <p><strong>Receipt Number:</strong> ${booking.receiptNumber ?? "N/A"}</p>
    <p><strong>Payment Ref:</strong> ${booking.paymentRef}</p>
    <p><strong>UPI UTR:</strong> ${booking.paymentUtr ?? "N/A"}</p>
    <p><strong>Amount:</strong> INR ${booking.tripPrice.toLocaleString("en-IN")}</p>
    <p><strong>Name:</strong> ${booking.fullName}</p>
    <p><strong>Email:</strong> ${booking.email}</p>
    <p><strong>Phone:</strong> ${booking.phone}</p>
  `;

  await transporter.sendMail({
    from: process.env.BOOKING_FROM_EMAIL ?? process.env.SMTP_USER,
    to,
    subject: `[Explorers Group] Payment Confirmed - ${booking.tripName}`,
    html
  });
}
