import Link from "next/link";

type ShareButtonsProps = {
  title: string;
  url: string;
};

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-full border border-[#e5dfd8] px-4 py-2 text-xs font-semibold text-[#394256]"
      >
        WhatsApp
      </Link>
      <Link
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-full border border-[#e5dfd8] px-4 py-2 text-xs font-semibold text-[#394256]"
      >
        X
      </Link>
      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-full border border-[#e5dfd8] px-4 py-2 text-xs font-semibold text-[#394256]"
      >
        Facebook
      </Link>
    </div>
  );
}
