"use client";

type FilterBarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  categoryValue: string;
  onCategoryChange: (value: string) => void;
  placeholder?: string;
};

export default function FilterBar({
  searchValue,
  onSearchChange,
  categories,
  categoryValue,
  onCategoryChange,
  placeholder = "Ara...",
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-[#e5dfd8] bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <input
        value={searchValue}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-[#e5dfd8] bg-[#f7f5f3] px-5 py-3 text-sm text-[#1f2a44] outline-none transition-colors focus:border-[#8f1e2d]"
      />
      <select
        value={categoryValue}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="w-full rounded-full border border-[#e5dfd8] bg-white px-4 py-3 text-sm text-[#394256] md:w-56"
      >
        <option value="">Tüm Kategoriler</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
