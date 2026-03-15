type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#e5dfd8] bg-white px-4 py-3 text-sm">
      <span className="text-[#5f677a]">
        Sayfa {currentPage} / {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-full border border-[#e5dfd8] px-3 py-1 text-xs text-[#394256]"
        >
          Önceki
        </button>
        <button
          type="button"
          className="rounded-full border border-[#e5dfd8] px-3 py-1 text-xs text-[#394256]"
        >
          Sonraki
        </button>
      </div>
    </div>
  );
}
