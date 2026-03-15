import SectionTitle from "../../components/SectionTitle";
import AssociationList from "../../components/AssociationList";
import { getAssociations } from "../../lib/content";

export const metadata = {
  title: "Dernekler",
  description: "Çorum HDF federasyonuna bağlı derneklerin listesi.",
};

export default async function AssociationsPage() {
  const associations = await getAssociations();

  return (
    <main className="py-16">
      <div className="mx-auto max-w-6xl space-y-10 px-4">
        <SectionTitle
          eyebrow="Dernekler"
          title="90 derneğin ortak platformu"
          description="Dernekleri arayın, filtreleyin ve detay sayfalarına ulaşın."
        />
        <AssociationList associations={associations} />
      </div>
    </main>
  );
}
