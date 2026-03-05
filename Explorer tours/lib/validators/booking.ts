import { z } from "zod";

export const bookingSchema = z.object({
  tripId: z.string().min(1, "Trip ID is required"),
  tripName: z.string().min(2, "Trip name is required"),
  tripPrice: z.number().positive("Trip price must be greater than zero"),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .regex(/^[0-9+\-() ]{8,20}$/, "Invalid phone number format"),
  travelers: z.number().int().min(1).max(12),
  departureMonth: z.string().min(3, "Departure month is required"),
  notes: z.string().max(500).optional()
});

export type BookingInput = z.infer<typeof bookingSchema>;
