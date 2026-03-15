"use client";

import { useMemo, useState } from "react";
import type { Association } from "../types/content";
import { AssociationCard } from "./cards";
import EmptyState from "./EmptyState";

type HomeAssociationSectionProps = {
  associations: Association[];
};

export default function HomeAssociationSection({
  associations,
}: HomeAssociationSectionProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    const sorted = [...associations].sort((a, b) =>
      a.name.localeCompare(b.name, "tr-TR")
    );
    const source = normalized ? sorted : sorted.slice(0, 6);
    if (!normalized) return source;
    return source.filter((association) => {
      return (
        association.name.toLowerCase().includes(normalized) ||
        association.president.toLowerCase().includes(normalized) ||
        association.district.toLowerCase().includes(normalized) ||
        association.city.toLowerCase().includes(normalized)
      );
    });
  }, [associations, search]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-[#1f2a44]">Köyünü veya Derneğini Bul</p>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Köyünü veya Derneğini Bul"
          className="w-full rounded-full border border-[#e5dfd8] bg-white px-5 py-3 text-sm text-[#1f2a44] shadow-sm outline-none transition-colors focus:border-[#8f1e2d]"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Eşleşen dernek bulunamadı"
          description="Arama kriterlerinizi değiştirip tekrar deneyin."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((association) => (
            <AssociationCard key={association.id} association={association} />
          ))}
        </div>
      )}
    </div>
  );
}
