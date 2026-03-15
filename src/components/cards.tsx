import Image from "next/image";
import Link from "next/link";
import { parseDateTime } from "../lib/date";
import type { Association, Event, Post } from "../types/content";

export function NewsCard({ post }: { post: Post }) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-3xl border border-[#e5dfd8] bg-white p-6 shadow-lg transition-all hover:-translate-y-1">
      <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-[#f7f5f3]">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
      </div>
      <div className="text-xs font-semibold uppercase text-[#8f1e2d]">
        {post.category}
      </div>
      <h3 className="text-lg font-semibold text-[#1f2a44]">{post.title}</h3>
      <p className="text-sm text-[#5f677a]">{post.excerpt}</p>
      <Link href={`/haberler/${post.slug}`} className="text-sm font-semibold text-[#8f1e2d]">
        Devamını Oku →
      </Link>
    </article>
  );
}

export function EventCard({ event }: { event: Event }) {
  const startDate = parseDateTime(event.startDateTime);
  const day = startDate ? startDate.toLocaleDateString("tr-TR", { day: "2-digit" }) : "--";
  const month = startDate
    ? startDate.toLocaleDateString("tr-TR", { month: "long" }).toLocaleUpperCase("tr-TR")
    : "TARİH";

  return (
    <article className="flex h-full flex-col gap-4 rounded-3xl border border-[#e5dfd8] bg-white p-6 shadow-lg transition-all hover:-translate-y-1">
      <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-[#f7f5f3]">
        <Image src={event.posterImage} alt={event.title} fill className="object-cover" />
      </div>
      <div className="flex items-start gap-4">
        <div className="flex min-w-[72px] flex-col items-center justify-center rounded-2xl bg-[#8f1e2d] px-3 py-3 text-white">
          <span className="text-2xl font-semibold leading-none">{day}</span>
          <span className="mt-1 text-[11px] font-semibold tracking-wide">{month}</span>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase text-[#1f2a44]/60">
            {startDate
              ? startDate.toLocaleDateString("tr-TR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Tarih eklenmedi"}
          </p>
          <h3 className="text-lg font-semibold text-[#1f2a44]">{event.title}</h3>
          <p className="text-sm text-[#5f677a]">{event.location}</p>
          <Link
            href={`/etkinlikler/${event.slug}`}
            className="text-sm font-semibold text-[#8f1e2d]"
          >
            Detayları Gör →
          </Link>
        </div>
      </div>
    </article>
  );
}

export function AssociationCard({ association }: { association: Association }) {
  const villageName = association.name.replace(" Köyü Derneği", "");

  return (
    <article className="flex h-full flex-col justify-between gap-4 rounded-3xl border border-[#e5dfd8] bg-white p-6 shadow-lg transition-all hover:-translate-y-1">
      <div>
        <p className="text-xs font-semibold uppercase text-[#8f1e2d]">Köy Derneği</p>
        <h3 className="mt-2 text-lg font-semibold text-[#1f2a44]">{villageName}</h3>
        <p className="mt-2 text-sm text-[#5f677a]">Başkan: {association.president}</p>
        <p className="mt-1 text-sm text-[#5f677a]">
          Bağlı Olduğu İlçe: {association.district}
        </p>
      </div>
      <div className="flex items-center justify-between text-sm text-[#5f677a]">
        <span>{association.city}</span>
        <Link
          href={`/dernekler/${association.slug}`}
          className="font-semibold text-[#8f1e2d]"
        >
          İncele →
        </Link>
      </div>
    </article>
  );
}
