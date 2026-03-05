export function generatePaymentRef(): string {
  const randomPart = Math.floor(Math.random() * 900000) + 100000;
  return `EXP${Date.now()}${randomPart}`;
}

export function generateReceiptNumber(bookingId: string): string {
  const idPart = bookingId.replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase();
  const datePart = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `EGR-${datePart}-${idPart}`;
}

export function buildUpiIntent(params: {
  amount: number;
  tripName: string;
  paymentRef: string;
  payeeAddress?: string;
  payeeName?: string;
}) {
  const search = new URLSearchParams({
    pa: params.payeeAddress ?? "explorerspune@upi",
    pn: params.payeeName ?? "Explorers Group",
    am: params.amount.toFixed(2),
    tn: `${params.tripName} booking`,
    tr: params.paymentRef,
    cu: "INR"
  });

  return `upi://pay?${search.toString()}`;
}
