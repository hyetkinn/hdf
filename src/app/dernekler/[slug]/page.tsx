import "server-only";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import Breadcrumbs from "../../../components/Breadcrumbs";
import SectionTitle from "../../../components/SectionTitle";
import { getAssociationBySlug } from "../../../lib/content";
import { associations as baseAssociations } from "../../../lib/data/associations";
import { siteConfig } from "../../../lib/site";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps) {
  noStore();
  const { slug } = params;
  const association = await resolveAssociation(slug);

  if (!association) {
    return { title: "Dernek bulunamadı" };
  }

  return {
    title: association.name,
    description: `${association.name} dernek profili ve iletişim bilgileri.`,
    openGraph: {
      title: association.name,
      description: `${association.name} dernek profili ve iletişim bilgileri.`,
      url: `${siteConfig.url}/dernekler/${association.slug}`,
    },
  };
}

export default async function AssociationDetailPage({ params }: PageProps) {
  noStore();
  const { slug } = params;
  const association = await resolveAssociation(slug);

  if (!association) {
    const fallbackList = await readLocalAssociations();
    const fallback = fallbackList[0];
    if (!fallback) {
      return (
        <main className="py-16">
          <div className="mx-auto max-w-4xl space-y-6 px-4">
            <SectionTitle
              eyebrow="Dernekler"
              title="Dernek bulunamadı"
              description="Yerel veride kayıt yok."
            />
          </div>
        </main>
      );
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

export const renderAssociation = ({
  association,
  banner,
  allSlugs,
}: {
  association: any;
  banner?: string;
  allSlugs?: string[];
}) => {
  const villageName = association.name.replace(" Köyü Derneği", "");
  const presidentName = association.president ?? "Bilgi girilmedi";
  const announcements = association.announcements ?? [];

  return (
    <main className="py-16">
      <div className="mx-auto max-w-6xl space-y-8 px-4">
        <Breadcrumbs
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Dernekler", href: "/dernekler" },
            { label: association.name },
          ]}
        />
        {banner ? (
          <div className="rounded-2xl border border-[#e5dfd8] bg-white px-4 py-3 text-sm text-[#394256]">
            {banner}
          </div>
        ) : null}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8f1e2d]">
            Köy Derneği Profili
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#1f2a44] md:text-6xl">
            {villageName}
          </h1>
          <p className="text-sm font-semibold text-[#5f677a]">
            Bağlı Olduğu İlçe: {association.district}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 rounded-3xl border border-[#e5dfd8] bg-white p-6">
            {association.galleryImages?.[0] ? (
              <div className="relative h-56 overflow-hidden rounded-2xl bg-[#f7f5f3]">
                <Image
                  src={association.galleryImages[0]}
                  alt={association.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : null}
            {association.description ? (
              <div className="rounded-2xl border border-[#e5dfd8] bg-[#fdfaf7] p-4 text-sm text-[#5f677a]">
                {association.description}
              </div>
            ) : null}
            <h3 className="text-lg font-semibold text-[#1f2a44]">
              Köy Dernek Başkanı
            </h3>
            <div className="rounded-2xl border border-[#e5dfd8] bg-[#fdfaf7] p-4 text-sm text-[#5f677a]">
              {presidentName}
            </div>
            <div className="rounded-2xl border border-[#e5dfd8] bg-white p-4">
              <p className="text-xs font-semibold uppercase text-[#8f1e2d]">
                Duyurular
              </p>
              {announcements.length ? (
                <ul className="mt-3 space-y-2 text-sm text-[#5f677a]">
                  {announcements.slice(0, 3).map((item: string, index: number) => (
                    <li key={`${association.id}-ann-${index}`}>• {item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-[#5f677a]">
                  Henüz duyuru eklenmedi.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-[#e5dfd8] bg-white p-6 text-sm text-[#5f677a]">
              <p className="text-xs font-semibold uppercase text-[#8f1e2d]">İletişim</p>
              <p className="mt-2 text-lg font-semibold text-[#1f2a44]">
                {association.name}
              </p>
              {association.phone ? <p className="mt-4">Telefon: {association.phone}</p> : null}
              {association.email ? <p>E-posta: {association.email}</p> : null}
              {association.address ? <p className="mt-2">{association.address}</p> : null}
              <div className="mt-4 flex flex-wrap gap-2">
                {association.socialLinks?.facebook ? (
                  <Link
                    href={association.socialLinks.facebook}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full border border-[#e5dfd8] px-3 py-1 text-xs font-semibold text-[#1f2a44]"
                  >
                    <span>Facebook</span>
                  </Link>
                ) : null}
                {association.socialLinks?.instagram ? (
                  <Link
                    href={association.socialLinks.instagram}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full border border-[#e5dfd8] px-3 py-1 text-xs font-semibold text-[#1f2a44]"
                  >
                    <span>Instagram</span>
                  </Link>
                ) : null}
                {association.mapsLink ? (
                  <Link
                    href={association.mapsLink}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full border border-[#e5dfd8] px-3 py-1 text-xs font-semibold text-[#8f1e2d]"
                  >
                    Haritada Gör
                  </Link>
                ) : null}
              </div>
            </div>

            {association.address || association.mapsLink || association.mapsEmbedLink ? (
              <div className="rounded-3xl border border-[#e5dfd8] bg-white p-6 text-sm">
                <p className="text-xs font-semibold uppercase text-[#8f1e2d]">
                  Konum
                </p>
                <div className="mt-4 overflow-hidden rounded-2xl border border-[#e5dfd8]">
                  <iframe
                    title={`${association.name} haritası`}
                    src={
                      association.mapsEmbedLink
                        ? association.mapsEmbedLink
                        : `https://www.google.com/maps?q=${encodeURIComponent(
                            association.mapsLink || association.address || ""
                          )}&output=embed`
                    }
                    className="h-64 w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            ) : null}

            <div className="rounded-3xl border border-[#e5dfd8] bg-white p-6 text-sm">
              <p className="text-xs font-semibold uppercase text-[#8f1e2d]">
                Köy Fotoğrafları
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {association.galleryImages?.map((image: string, index: number) => (
                  <div
                    key={`${association.id}-image-${index}`}
                    className="relative h-36 overflow-hidden rounded-2xl bg-[#f7f5f3]"
                  >
                    <Image src={image} alt={association.name} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {allSlugs?.length ? (
          <div className="rounded-3xl border border-[#e5dfd8] bg-white p-6 text-sm text-[#5f677a]">
            <p className="mb-3 font-semibold text-[#1f2a44]">Mevcut köy linkleri</p>
            <div className="flex flex-wrap gap-2">
              {allSlugs.map((slug) => (
                <a
                  key={slug}
                  href={`/dernekler/${slug}`}
                  className="rounded-full border border-[#e5dfd8] px-3 py-1 text-xs text-[#8f1e2d]"
                >
                  {slug}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
};

export const resolveAssociation = async (slug: string) => {
  const normalized = decodeURIComponent(slug).trim().toLowerCase();
  const fromContent = await getAssociationBySlug(slug);
  if (fromContent) return fromContent;

  const list = await readLocalAssociations();
  const match = list.find(
    (item) => String(item.slug ?? "").trim().toLowerCase() === normalized
  );
  if (match) return match;
  return list[0] ?? null;
};

export const readLocalAssociations = async () => {
  try {
    const dbPath =
      process.env.LOCAL_DB_PATH ?? path.join(process.cwd(), "data", "local-db.json");
    const raw = await fs.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw) as { associations?: Array<Record<string, unknown>> };
    const list = (db.associations ?? []) as Array<Record<string, unknown>>;
    return list.length ? list : (baseAssociations as Array<Record<string, unknown>>);
  } catch {
    return baseAssociations as Array<Record<string, unknown>>;
  }
};
