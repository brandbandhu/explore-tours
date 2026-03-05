import { Booking as PrismaBooking, PaymentStatus, Prisma, PrismaClient } from "@prisma/client";
import { BookingInput } from "@/lib/validators/booking";
import { generateReceiptNumber } from "@/lib/payment";

export type AppPaymentStatus = "PENDING" | "CONFIRMED";

export interface AppBooking {
  id: string;
  tripId: string;
  tripName: string;
  tripPrice: number;
  fullName: string;
  email: string;
  phone: string;
  travelers: number;
  departureMonth: string;
  notes: string | null;
  paymentStatus: AppPaymentStatus;
  paymentRef: string;
  paymentUtr: string | null;
  paymentConfirmedAt: Date | null;
  receiptNumber: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const globalForMemory = globalThis as unknown as { bookingStore?: Map<string, AppBooking> };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

const bookingStore = globalForMemory.bookingStore ?? new Map<string, AppBooking>();
if (process.env.NODE_ENV !== "production") {
  globalForMemory.bookingStore = bookingStore;
}

function canUsePrisma() {
  const url = process.env.DATABASE_URL?.trim();
  return Boolean(url && (url.startsWith("postgresql://") || url.startsWith("postgres://")));
}

function toAppBooking(booking: PrismaBooking): AppBooking {
  return {
    ...booking,
    tripPrice: Number(booking.tripPrice),
    paymentStatus: booking.paymentStatus as AppPaymentStatus
  };
}

export async function createPendingBooking(
  payload: BookingInput,
  paymentRef: string
): Promise<AppBooking> {
  if (canUsePrisma()) {
    try {
      const created = await prisma.booking.create({
        data: {
          ...payload,
          tripPrice: new Prisma.Decimal(payload.tripPrice),
          paymentStatus: PaymentStatus.PENDING,
          paymentRef
        }
      });
      return toAppBooking(created);
    } catch (error) {
      console.error("DB createPendingBooking failed, using in-memory fallback:", error);
    }
  }

  const now = new Date();
  const id = `mem_${crypto.randomUUID()}`;
  const booking: AppBooking = {
    id,
    tripId: payload.tripId,
    tripName: payload.tripName,
    tripPrice: payload.tripPrice,
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    travelers: payload.travelers,
    departureMonth: payload.departureMonth,
    notes: payload.notes ?? null,
    paymentStatus: "PENDING",
    paymentRef,
    paymentUtr: null,
    paymentConfirmedAt: null,
    receiptNumber: null,
    createdAt: now,
    updatedAt: now
  };

  bookingStore.set(id, booking);
  return booking;
}

export async function confirmBookingPayment(params: {
  bookingId: string;
  paymentUtr: string;
}): Promise<AppBooking | null> {
  if (canUsePrisma()) {
    try {
      const existing = await prisma.booking.findUnique({
        where: { id: params.bookingId }
      });

      if (!existing) {
        return null;
      }

      if (existing.paymentStatus === PaymentStatus.CONFIRMED) {
        if (existing.receiptNumber) {
          return toAppBooking(existing);
        }

        const updatedConfirmed = await prisma.booking.update({
          where: { id: params.bookingId },
          data: {
            receiptNumber: generateReceiptNumber(existing.id),
            paymentUtr: existing.paymentUtr ?? params.paymentUtr,
            paymentConfirmedAt: existing.paymentConfirmedAt ?? new Date()
          }
        });
        return toAppBooking(updatedConfirmed);
      }

      const updated = await prisma.booking.update({
        where: { id: params.bookingId },
        data: {
          paymentStatus: PaymentStatus.CONFIRMED,
          paymentUtr: params.paymentUtr,
          paymentConfirmedAt: new Date(),
          receiptNumber: existing.receiptNumber ?? generateReceiptNumber(existing.id)
        }
      });
      return toAppBooking(updated);
    } catch (error) {
      console.error("DB confirmBookingPayment failed, using in-memory fallback:", error);
    }
  }

  const current = bookingStore.get(params.bookingId);
  if (!current) {
    return null;
  }

  const now = new Date();
  const updated: AppBooking = {
    ...current,
    paymentStatus: "CONFIRMED",
    paymentUtr: params.paymentUtr,
    paymentConfirmedAt: current.paymentConfirmedAt ?? now,
    receiptNumber: current.receiptNumber ?? generateReceiptNumber(current.id),
    updatedAt: now
  };
  bookingStore.set(current.id, updated);
  return updated;
}

export async function submitBookingPaymentProof(params: {
  bookingId: string;
  paymentUtr: string;
}): Promise<AppBooking | null> {
  if (canUsePrisma()) {
    try {
      const existing = await prisma.booking.findUnique({
        where: { id: params.bookingId }
      });

      if (!existing) {
        return null;
      }

      const updated = await prisma.booking.update({
        where: { id: params.bookingId },
        data: {
          paymentUtr: params.paymentUtr
        }
      });

      return toAppBooking(updated);
    } catch (error) {
      console.error("DB submitBookingPaymentProof failed, using in-memory fallback:", error);
    }
  }

  const current = bookingStore.get(params.bookingId);
  if (!current) {
    return null;
  }

  const updated: AppBooking = {
    ...current,
    paymentUtr: params.paymentUtr,
    updatedAt: new Date()
  };
  bookingStore.set(current.id, updated);
  return updated;
}

export async function fetchBookingById(bookingId: string): Promise<AppBooking | null> {
  if (canUsePrisma()) {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId }
      });
      return booking ? toAppBooking(booking) : null;
    } catch (error) {
      console.error("DB fetchBookingById failed, using in-memory fallback:", error);
    }
  }

  return bookingStore.get(bookingId) ?? null;
}

export async function fetchAllBookings(): Promise<AppBooking[]> {
  if (canUsePrisma()) {
    try {
      const rows = await prisma.booking.findMany({
        orderBy: {
          createdAt: "desc"
        }
      });
      return rows.map(toAppBooking);
    } catch (error) {
      console.error("DB fetchAllBookings failed, using in-memory fallback:", error);
    }
  }

  return Array.from(bookingStore.values()).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}
