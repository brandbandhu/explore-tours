"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

interface PaymentLandingClientProps {
  bookingId: string;
  tripName: string;
  amount: number;
  paymentRef: string;
  upiIntent: string;
  initialPaymentStatus: "PENDING" | "CONFIRMED";
  initialReceiptNumber: string | null;
}

interface BookingStatusResponse {
  success: boolean;
  paymentStatus?: "PENDING" | "CONFIRMED";
  receiptNumber?: string | null;
  error?: string;
}

interface SubmitProofResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export default function PaymentLandingClient({
  bookingId,
  tripName,
  amount,
  paymentRef,
  upiIntent,
  initialPaymentStatus,
  initialReceiptNumber
}: PaymentLandingClientProps) {
  const [paymentStatus, setPaymentStatus] = useState<"PENDING" | "CONFIRMED">(initialPaymentStatus);
  const [receiptNumber, setReceiptNumber] = useState<string | null>(initialReceiptNumber);
  const [paymentUtr, setPaymentUtr] = useState("");
  const [proofSubmitted, setProofSubmitted] = useState(false);
  const [isSubmittingProof, setIsSubmittingProof] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [message, setMessage] = useState("");

  const submitPaymentProof = async () => {
    setMessage("");
    if (paymentUtr.trim().length < 6) {
      setMessage("Enter a valid UPI transaction reference (UTR).");
      return;
    }

    setIsSubmittingProof(true);
    try {
      const response = await fetch("/api/bookings/proof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bookingId,
          paymentUtr: paymentUtr.trim()
        })
      });

      const result = (await response.json()) as SubmitProofResponse;
      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Unable to submit payment reference.");
      }

      setProofSubmitted(true);
      setMessage(
        result.message ??
          "Payment reference submitted. We will verify payment and unlock your receipt."
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to submit payment reference.");
    } finally {
      setIsSubmittingProof(false);
    }
  };

  const checkStatus = async () => {
    setIsCheckingStatus(true);
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "GET",
        cache: "no-store"
      });
      const result = (await response.json()) as BookingStatusResponse;
      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Unable to fetch booking status.");
      }

      const status = result.paymentStatus ?? "PENDING";
      setPaymentStatus(status);
      setReceiptNumber(result.receiptNumber ?? null);

      if (status === "CONFIRMED") {
        setMessage("Payment confirmed. Receipt is ready to download.");
      } else if (proofSubmitted) {
        setMessage("Payment is still under verification. Please check again shortly.");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to fetch booking status.");
    } finally {
      setIsCheckingStatus(false);
    }
  };

  useEffect(() => {
    if (!proofSubmitted || paymentStatus === "CONFIRMED") {
      return;
    }

    const interval = window.setInterval(() => {
      void checkStatus();
    }, 12000);

    return () => window.clearInterval(interval);
  }, [proofSubmitted, paymentStatus]);

  const downloadReceipt = () => {
    window.open(`/api/bookings/${bookingId}/receipt`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mx-auto w-full max-w-xl space-y-5 rounded-2xl border border-[#dbcab2] bg-[#fffaf1]/95 p-5 shadow-sm">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-[#8f7659]">Payment Checkout</p>
        <h1 className="mt-1 font-display text-3xl text-[#2f2418]">{tripName}</h1>
        <p className="mt-1 text-sm text-[#6f5b44]">
          Booking ID: {bookingId} | Payment Ref: {paymentRef}
        </p>
      </div>

      <div className="rounded-xl border border-[#d9c9b2] bg-[#f8efe2] p-4">
        <p className="text-sm text-[#6f5b44]">Amount to Pay</p>
        <p className="font-display text-3xl text-[#7b5a3b]">INR {amount.toLocaleString()}</p>
      </div>

      <div className="space-y-3 rounded-xl border border-[#d9c9b2] bg-white p-4">
        <div className="flex items-center justify-center rounded-lg bg-white p-2">
          <QRCodeSVG value={upiIntent} size={220} includeMargin />
        </div>
        <p className="text-center text-sm text-[#6f5b44]">
          Scan the QR in any UPI app and complete payment.
        </p>
      </div>

      {paymentStatus !== "CONFIRMED" ? (
        <div className="space-y-3 rounded-xl border border-[#d9c9b2] bg-[#f8efe2] p-4">
          <label className="space-y-1">
            <span className="text-xs text-[#8f7659]">Enter UPI UTR after payment</span>
            <input
              value={paymentUtr}
              onChange={(event) => setPaymentUtr(event.target.value)}
              placeholder="Example: 412345678901"
              className="w-full rounded-lg border border-[#d7c6aa] bg-white px-3 py-2 text-sm text-[#4e3c2b] outline-none focus:border-[#7b5a3b]"
            />
          </label>

          <button
            type="button"
            onClick={submitPaymentProof}
            disabled={isSubmittingProof}
            className="w-full rounded-xl bg-[#7b5a3b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#66492e] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmittingProof ? "Submitting..." : "Submit Payment Reference"}
          </button>

          <button
            type="button"
            onClick={() => void checkStatus()}
            disabled={isCheckingStatus}
            className="w-full rounded-xl border border-[#7b5a3b] bg-white px-4 py-2.5 text-sm font-semibold text-[#7b5a3b] transition hover:bg-[#f4ede2] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCheckingStatus ? "Checking..." : "Check Payment Status"}
          </button>
        </div>
      ) : (
        <div className="space-y-3 rounded-xl border border-emerald-300/40 bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-emerald-700">Payment confirmed.</p>
          {receiptNumber ? <p className="text-xs text-emerald-800">Receipt No: {receiptNumber}</p> : null}
          <button
            type="button"
            onClick={downloadReceipt}
            className="w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#2f2418] transition hover:bg-slate-100"
          >
            Download Receipt PDF
          </button>
        </div>
      )}

      {message ? (
        <p className={`text-sm ${paymentStatus === "CONFIRMED" ? "text-emerald-700" : "text-[#7a3d2f]"}`}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
