import SectionTitle from "../../components/SectionTitle";
import ArchiveList from "../../components/ArchiveList";
import { getArchiveItems } from "../../lib/content";

export const metadata = {
  title: "Dijital Arşiv",
  description: "Basın açıklamaları, raporlar ve dijital hafıza merkezi.",
};

export default async function ArchivePage() {
  const items = await getArchiveItems();

  return (
    <main className="py-16">
      <div className="mx-auto max-w-6xl space-y-10 px-4">
        <SectionTitle
          eyebrow="Dijital Arşiv"
          title="Hafıza merkezi ve dokümanlar"
          description="Yıl, konu ve etiket filtreleriyle arşivde gezinin."
        />
        <ArchiveList items={items} />
      </div>
    </main>
  );
}
