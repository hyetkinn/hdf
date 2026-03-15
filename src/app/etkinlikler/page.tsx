import SectionTitle from "../../components/SectionTitle";
import EventList from "../../components/EventList";
import { getEvents } from "../../lib/content";

export const metadata = {
  title: "Etkinlikler",
  description: "Federasyon ve derneklerin etkinlik takvimi.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main className="py-16">
      <div className="mx-auto max-w-6xl space-y-10 px-4">
        <SectionTitle
          eyebrow="Etkinlikler"
          title="Takvim ve programlar"
          description="Yaklaşan ve geçmiş etkinlikleri filtreleyin."
        />
        <EventList events={events} />
      </div>
    </main>
  );
}
