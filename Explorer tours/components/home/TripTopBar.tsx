export default function TripTopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#dcccb3] bg-[#f8f1e6]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1320px] items-center gap-3 px-4 py-3 sm:px-5">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#d7c6aa] text-[#6c5a43]"
          aria-label="Open navigation"
        >
          <span className="text-lg leading-none">=</span>
        </button>

        <div className="flex items-center gap-1">
          <span className="font-display text-2xl font-bold text-[#7b5a3b]">Explorers</span>
          <span className="text-sm font-semibold text-[#8d7a62]">Group</span>
        </div>

        <div className="hidden min-w-0 flex-1 items-center md:flex">
          <input
            placeholder="Search Indian treks, valleys, forts"
            className="w-full rounded-lg border border-[#d7c6aa] bg-[#fbf6ee] px-3 py-2 text-sm text-[#5a4732] outline-none transition focus:border-[#8d6842] focus:bg-white"
          />
        </div>

        <nav className="ml-auto flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="hidden rounded-md border border-[#d7c6aa] px-3 py-1.5 text-sm font-medium text-[#624c36] sm:inline-flex"
          >
            List Your Trip
          </button>
          <span className="rounded-md bg-[#ece2d3] px-2.5 py-1 text-xs font-semibold text-[#624c36]">
            INR
          </span>
        </nav>
      </div>
    </header>
  );
}
