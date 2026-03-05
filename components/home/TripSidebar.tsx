"use client";

interface TripSidebarProps {
  items: string[];
  activeItem: string;
  onSelect: (item: string) => void;
}

export default function TripSidebar({ items, activeItem, onSelect }: TripSidebarProps) {
  return (
    <aside className="rounded-2xl border border-[#dbcab2] bg-[#fffaf1] p-3 shadow-sm md:p-4">
      <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8a7458]">
        Trip Categories
      </p>
      <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        {items.map((item) => {
          const isActive = activeItem === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm font-medium transition md:w-full ${
                isActive
                  ? "bg-[#7b5a3b] text-white"
                  : "bg-[#f7efe3] text-[#5e4a35] hover:bg-[#ecdfcb] hover:text-[#4f3d2a]"
              }`}
            >
              {item}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
