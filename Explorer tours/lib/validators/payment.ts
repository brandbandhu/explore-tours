import { z } from "zod";

export const confirmPaymentSchema = z.object({
  bookingId: z.string().min(1, "Booking ID is required"),
  paymentUtr: z
    .string()
    .trim()
    .min(6, "Enter a valid UPI transaction reference")
    .max(64, "UPI transaction reference is too long")
});

export type ConfirmPaymentInput = z.infer<typeof confirmPaymentSchema>;
