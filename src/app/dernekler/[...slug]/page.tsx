import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import {
  readLocalAssociations,
  renderAssociation,
  resolveAssociation,
} from "../[slug]/page";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type PageProps = {
  params: { slug?: string[] };
};

export default async function AssociationCatchAllPage({ params }: PageProps) {
  noStore();
  const slugValue = params.slug?.[0];
  const association = slugValue ? await resolveAssociation(slugValue) : null;

  if (!association) {
    const fallbackList = await readLocalAssociations();
    const fallback = fallbackList[0];
    if (!fallback) {
      notFound();
    }
    return renderAssociation({
      association: fallback,
      banner:
        "Bu köy bulunamadı. Yereldeki ilk köy gösteriliyor. Doğru linkler aşağıda.",
      allSlugs: fallbackList.map((item) => String(item.slug ?? "")),
    });
  }

  return renderAssociation({ association });
}
