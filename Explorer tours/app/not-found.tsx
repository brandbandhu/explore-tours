import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-xs uppercase tracking-[0.2em] text-brand-mint">404</p>
      <h1 className="mt-2 font-display text-4xl text-white">Expedition Not Found</h1>
      <p className="mt-3 text-brand-fog/80">
        The tour URL is unavailable or no longer active.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-brand-amber px-4 py-2 text-sm font-semibold text-brand-ink"
      >
        Back to Home
      </Link>
    </main>
  );
}
