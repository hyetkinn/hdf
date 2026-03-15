"use client";

import { useMemo, useState } from "react";
import type { ArchiveItem } from "../types/content";
import FilterBar from "./FilterBar";
import EmptyState from "./EmptyState";
import DownloadButton from "./DownloadButton";
import Link from "next/link";

type ArchiveListProps = {
  items: ArchiveItem[];
};

export default function ArchiveList({ items }: ArchiveListProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => String(item.year)))),
    [items]
  );

  const filtered = useMemo(() => {
    const normalizedSearch = search.toLowerCase();
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(normalizedSearch) ||
        item.summary.toLowerCase().includes(normalizedSearch) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));
      const matchesCategory = category ? String(item.year) === category : true;
      return matchesSearch && matchesCategory;
    });
  }, [items, search, category]);

  return (
    <div className="space-y-6">
      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        categories={categories}
        categoryValue={category}
        onCategoryChange={setCategory}
        placeholder="Arşivde ara"
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="Arşiv kaydı bulunamadı"
          description="Farklı bir filtre ile tekrar deneyin."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-[#e5dfd8] bg-white p-6"
            >
              <p className="text-xs font-semibold uppercase text-[#8f1e2d]">
                {item.type} • {item.year}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[#1f2a44]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[#5f677a]">{item.summary}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href={`/arsiv/${item.slug}`}
                  className="text-sm font-semibold text-[#8f1e2d]"
                >
                  Detay →
                </Link>
                <DownloadButton label="PDF İndir" href={item.fileUrl} />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
