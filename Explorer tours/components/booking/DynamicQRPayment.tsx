"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { bookingSchema } from "@/lib/validators/booking";

type FormErrors = Partial<
  Record<"fullName" | "email" | "phone" | "travelers" | "departureMonth" | "notes", string>
>;

interface DynamicQRPaymentProps {
  tripId: string;
  tripName: string;
  tripPrice: number;
}

interface StartPaymentResponse {
  success: boolean;
  bookingId?: string;
  error?: string;
}

const departureMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default function DynamicQRPayment({ tripId, tripName, tripPrice }: DynamicQRPaymentProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelers: "1",
    departureMonth: departureMonths[new Date().getMonth()] ?? "January",
    notes: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProceeding, setIsProceeding] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const totalAmount = useMemo(() => tripPrice * Number(form.travelers || 1), [tripPrice, form.travelers]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateBookingDetails = () => {
    const parsed = bookingSchema.safeParse({
      tripId,
      tripName,
      tripPrice: totalAmount,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      travelers: Number(form.travelers),
      departureMonth: form.departureMonth,
      notes: form.notes.trim() || undefined
    });

    if (parsed.success) {
      setErrors({});
      return parsed.data;
    }

    const fieldErrors = parsed.error.flatten().fieldErrors;
    setErrors({
      fullName: fieldErrors.fullName?.[0],
      email: fieldErrors.email?.[0],
      phone: fieldErrors.phone?.[0],
      travelers: fieldErrors.travelers?.[0],
      departureMonth: fieldErrors.departureMonth?.[0],
      notes: fieldErrors.notes?.[0]
    });

    return null;
  };

  const proceedToPayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerMessage("");

    const payload = validateBookingDetails();
    if (!payload) {
      return;
    }

    setIsProceeding(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as StartPaymentResponse;
      if (!response.ok || !result.success || !result.bookingId) {
        throw new Error(result.error ?? "Unable to initiate payment.");
      }

      router.push(`/payment/${result.bookingId}`);
    } catch (error) {
      setServerMessage(error instanceof Error ? error.message : "Unable to initiate payment.");
      setIsProceeding(false);
    }
  };

  return (
    <div className="glass-panel space-y-5 rounded-2xl p-4 md:p-5">
      <div>
        <h3 className="font-display text-2xl text-white">Reserve This Trip</h3>
        <p className="mt-1 text-sm text-brand-fog/80">
          Step 1: Fill details and proceed to payment page for QR, confirmation, and PDF receipt.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-black/20 p-3">
        <p className="text-sm text-brand-fog/75">{tripName}</p>
        <p className="font-display text-2xl text-brand-mint">INR {totalAmount.toLocaleString()}</p>
      </div>

      <form onSubmit={proceedToPayment} className="space-y-3">
        <div>
          <input
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            placeholder="Full Name"
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-mint"
          />
          {errors.fullName ? <p className="mt-1 text-xs text-rose-300">{errors.fullName}</p> : null}
        </div>

        <div>
          <input
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-mint"
          />
          {errors.email ? <p className="mt-1 text-xs text-rose-300">{errors.email}</p> : null}
        </div>

        <div>
          <input
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="Phone"
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-mint"
          />
          {errors.phone ? <p className="mt-1 text-xs text-rose-300">{errors.phone}</p> : null}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-1">
            <span className="text-xs text-brand-fog/75">Travelers</span>
            <input
              value={form.travelers}
              onChange={(event) => updateField("travelers", event.target.value)}
              type="number"
              min={1}
              max={12}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-mint"
            />
            {errors.travelers ? <p className="text-xs text-rose-300">{errors.travelers}</p> : null}
          </label>

          <label className="space-y-1">
            <span className="text-xs text-brand-fog/75">Departure Month</span>
            <select
              value={form.departureMonth}
              onChange={(event) => updateField("departureMonth", event.target.value)}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-mint"
            >
              {departureMonths.map((month) => (
                <option key={month} value={month} className="bg-brand-ink">
                  {month}
                </option>
              ))}
            </select>
            {errors.departureMonth ? (
              <p className="text-xs text-rose-300">{errors.departureMonth}</p>
            ) : null}
          </label>
        </div>

        <textarea
          value={form.notes}
          onChange={(event) => updateField("notes", event.target.value)}
          placeholder="Notes (optional)"
          rows={3}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-mint"
        />

        <button
          type="submit"
          disabled={isProceeding}
          className="w-full rounded-xl bg-brand-amber px-3 py-2.5 text-sm font-semibold text-brand-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isProceeding ? "Proceeding..." : "Proceed to Payment"}
        </button>
      </form>

      {serverMessage ? <p className="text-sm text-rose-300">{serverMessage}</p> : null}
    </div>
  );
}
