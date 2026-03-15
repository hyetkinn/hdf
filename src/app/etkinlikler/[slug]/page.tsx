import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ShareButtons from "../../../components/ShareButtons";
import SectionTitle from "../../../components/SectionTitle";
import { getEventBySlug, getEvents } from "../../../lib/content";
import { siteConfig } from "../../../lib/site";

type PageProps = {
  params: { slug: string };
};

const toGoogleDate = (date: string) =>
  new Date(date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

export async function generateMetadata({ params }: PageProps) {
  const { slug } = params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return { title: "Etkinlik bulunamadı" };
  }

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      url: `${siteConfig.url}/etkinlikler/${event.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const shareUrl = `${siteConfig.url}/etkinlikler/${event.slug}`;
  const calendarUrl = new URL("https://www.google.com/calendar/render");
  calendarUrl.searchParams.set("action", "TEMPLATE");
  calendarUrl.searchParams.set("text", event.title);
  calendarUrl.searchParams.set("details", event.description);
  calendarUrl.searchParams.set("location", event.location);
  calendarUrl.searchParams.set(
    "dates",
    `${toGoogleDate(event.startDateTime)}/${toGoogleDate(event.endDateTime)}`
  );

  return (
    <main className="py-16">
      <div className="mx-auto max-w-4xl space-y-8 px-4">
        <Breadcrumbs
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Etkinlikler", href: "/etkinlikler" },
            { label: event.title },
          ]}
        />
        <SectionTitle
          eyebrow="Etkinlik"
          title={event.title}
          description={`${new Date(event.startDateTime).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })} • ${event.location}`}
        />
        <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-[#f7f5f3]">
          <Image src={event.posterImage} alt={event.title} fill className="object-cover" />
        </div>
        <div className="rounded-3xl border border-[#e5dfd8] bg-white p-8 text-sm text-[#5f677a]">
          <p>{event.description}</p>
          <div className="mt-4 grid gap-2 text-sm text-[#5f677a]">
            <span>Organizatör: {event.organizer}</span>
            <span>
              Saat:{" "}
              {new Date(event.startDateTime).toLocaleTimeString("tr-TR", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(event.endDateTime).toLocaleTimeString("tr-TR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={calendarUrl.toString()}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#8f1e2d] px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_-20px_rgba(127,29,29,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(127,29,29,0.8)]"
          >
            Takvime Ekle
          </a>
          <ShareButtons title={event.title} url={shareUrl} />
        </div>
      </div>
    </main>
  );
}
