import Link from "next/link";

type DownloadButtonProps = {
  label: string;
  href: string;
};

export default function DownloadButton({ label, href }: DownloadButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-[#e5dfd8] px-4 py-2 text-xs font-semibold text-[#394256]"
      target="_blank"
      rel="noreferrer"
    >
      {label}
    </Link>
  );
}
