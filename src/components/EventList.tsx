"use client";

import { useMemo, useState } from "react";
import { parseDateTime } from "../lib/date";
import type { Event } from "../types/content";
import { EventCard } from "./cards";
import EmptyState from "./EmptyState";

type EventListProps = {
  events: Event[];
};

export default function EventList({ events }: EventListProps) {
  const [filter, setFilter] = useState<"upcoming" | "past" | "all">("upcoming");

  const filtered = useMemo(() => {
    const now = new Date();
    return events.filter((event) => {
      const start = parseDateTime(event.startDateTime);
      if (!start) return filter === "all";
      if (filter === "all") return true;
      if (filter === "upcoming") return start >= now;
      return start < now;
    });
  }, [events, filter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {([
          { key: "upcoming", label: "Yaklaşan" },
          { key: "past", label: "Geçmiş" },
          { key: "all", label: "Tümü" },
        ] as const).map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setFilter(item.key)}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              filter === item.key
                ? "bg-[#8f1e2d] text-white"
                : "border border-[#e5dfd8] text-[#394256]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Etkinlik bulunamadı"
          description="Farklı bir filtre seçerek tekrar deneyin."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
