"use client";

import { useMemo, useState } from "react";
import type { Post } from "../types/content";
import FilterBar from "./FilterBar";
import { NewsCard } from "./cards";
import EmptyState from "./EmptyState";

type NewsListProps = {
  posts: Post[];
};

export default function NewsList({ posts }: NewsListProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(posts.map((post) => post.category))),
    [posts]
  );

  const filtered = useMemo(() => {
    const normalizedSearch = search.toLowerCase();
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(normalizedSearch) ||
        post.excerpt.toLowerCase().includes(normalizedSearch);
      const matchesCategory = category ? post.category === category : true;
      return matchesSearch && matchesCategory;
    });
  }, [posts, search, category]);

  return (
    <div className="space-y-6">
      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        categories={categories}
        categoryValue={category}
        onCategoryChange={setCategory}
        placeholder="Haber ara"
      />
      {filtered.length === 0 ? (
        <EmptyState
          title="Haber bulunamadı"
          description="Filtreleri temizleyip tekrar deneyebilirsiniz."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
