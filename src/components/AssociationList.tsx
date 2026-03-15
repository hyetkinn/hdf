"use client";

import { useMemo, useState } from "react";
import type { Association } from "../types/content";
import FilterBar from "./FilterBar";
import { AssociationCard } from "./cards";
import EmptyState from "./EmptyState";

type AssociationListProps = {
  associations: Association[];
};

export default function AssociationList({ associations }: AssociationListProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [letter, setLetter] = useState("");

  const alphabet = [
    "A",
    "B",
    "C",
    "Ç",
    "D",
    "E",
    "F",
    "G",
    "Ğ",
    "H",
    "I",
    "İ",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "Ö",
    "P",
    "R",
    "S",
    "Ş",
    "T",
    "U",
    "Ü",
    "V",
    "Y",
    "Z",
  ];

  const districts = useMemo(
    () => Array.from(new Set(associations.map((item) => item.district))),
    [associations]
  );

  const filtered = useMemo(() => {
    const normalizedSearch = search.toLowerCase();
    return associations.filter((association) => {
      const villageName = association.name.replace(" Köyü Derneği", "");
      const matchesSearch =
        villageName.toLowerCase().includes(normalizedSearch) ||
        association.president.toLowerCase().includes(normalizedSearch) ||
        association.district.toLowerCase().includes(normalizedSearch) ||
        association.city.toLowerCase().includes(normalizedSearch);
      const matchesCategory = category ? association.district === category : true;
      const matchesLetter = letter
        ? villageName.toLocaleUpperCase("tr-TR").startsWith(letter)
        : true;
      return matchesSearch && matchesCategory && matchesLetter;
    });
  }, [associations, search, category, letter]);

  return (
    <div className="space-y-6">
      <p className="text-sm font-semibold text-[#1f2a44]">Köyünü veya Derneğini Bul</p>
      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        categories={districts}
        categoryValue={category}
        onCategoryChange={setCategory}
        placeholder="Köyünü veya Derneğini Bul"
      />
      <div className="flex flex-wrap gap-2 rounded-2xl border border-[#e5dfd8] bg-white p-3 text-xs font-semibold text-[#5f677a]">
        <button
          type="button"
          onClick={() => setLetter("")}
          className={`rounded-full px-3 py-1 transition-colors ${
            letter === ""
              ? "bg-[#8f1e2d] text-white"
              : "border border-[#e5dfd8] hover:border-[#8f1e2d] hover:text-[#8f1e2d]"
          }`}
        >
          Tümü
        </button>
        {alphabet.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setLetter(item)}
            className={`rounded-full px-3 py-1 transition-colors ${
              letter === item
                ? "bg-[#8f1e2d] text-white"
                : "border border-[#e5dfd8] hover:border-[#8f1e2d] hover:text-[#8f1e2d]"
            }`}
          >
            {item}
          </button>
        ))}
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
