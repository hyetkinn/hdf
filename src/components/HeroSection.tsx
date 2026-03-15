import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

type HeroSectionProps = {
  title: string;
  description: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  backgroundImage: string | StaticImageData;
};

export default function HeroSection({
  title,
  description,
  ctaPrimary,
  ctaSecondary,
  backgroundImage,
}: HeroSectionProps) {
  const highlightText = "90 Dernek, Tek Yürek";
  const shouldHighlight = title.includes(highlightText);
  const titleParts = shouldHighlight ? title.split(highlightText) : [];

  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <Image
          src={backgroundImage}
          alt="Hitit Güneşi"
          fill
          priority
          className="object-contain object-right opacity-40"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='none'/%3E%3Ccircle cx='2' cy='18' r='1' fill='%23b08d57' fill-opacity='0.35'/%3E%3Ccircle cx='54' cy='8' r='1' fill='%23b08d57' fill-opacity='0.25'/%3E%3Ccircle cx='96' cy='34' r='1' fill='%23b08d57' fill-opacity='0.3'/%3E%3Ccircle cx='22' cy='78' r='1' fill='%23b08d57' fill-opacity='0.3'/%3E%3Ccircle cx='74' cy='92' r='1' fill='%23b08d57' fill-opacity='0.25'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 py-24 text-white md:py-28">
        <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-6xl">
          {shouldHighlight ? (
            <>
              {titleParts[0]}
              <span className="text-red-600">{highlightText}</span>
              {titleParts[1] ?? ""}
            </>
          ) : (
            title
          )}
        </h1>
        <p className="max-w-2xl text-lg font-medium text-white/80 md:text-xl">
          {description}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href={ctaPrimary.href}
            className="rounded-full bg-[#8f1e2d] px-8 py-4 text-base font-semibold text-white shadow-[0_20px_40px_-20px_rgba(127,29,29,0.8)] transition-all hover:-translate-y-0.5 hover:bg-[#7a1826]"
          >
            {ctaPrimary.label}
          </Link>
          <Link
            href={ctaSecondary.href}
            className="rounded-full border border-white/40 px-8 py-4 text-base font-semibold text-white shadow-[0_20px_40px_-20px_rgba(127,29,29,0.4)] transition-all hover:-translate-y-0.5 hover:border-white"
          >
            {ctaSecondary.label}
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60">
        <div className="relative h-10 w-6 rounded-full border border-white/30">
          <span className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-white/70 animate-bounce" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em]">Kaydır</span>
      </div>
    </section>
  );
}
