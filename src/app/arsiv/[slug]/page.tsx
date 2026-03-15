import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../../components/Breadcrumbs";
import DownloadButton from "../../../components/DownloadButton";
import SectionTitle from "../../../components/SectionTitle";
import { getArchiveItemBySlug, getArchiveItems } from "../../../lib/content";
import { siteConfig } from "../../../lib/site";

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = params;
  const item = await getArchiveItemBySlug(slug);

  if (!item) {
    return { title: "Arşiv kaydı bulunamadı" };
  }

  return {
    title: item.title,
    description: item.summary,
    openGraph: {
      title: item.title,
      description: item.summary,
      url: `${siteConfig.url}/arsiv/${item.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const items = await getArchiveItems();
  return items.map((item) => ({ slug: item.slug }));
}

export default async function ArchiveDetailPage({ params }: PageProps) {
  const { slug } = params;
  const item = await getArchiveItemBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="py-16">
      <div className="mx-auto max-w-4xl space-y-8 px-4">
        <Breadcrumbs
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Dijital Arşiv", href: "/arsiv" },
            { label: item.title },
          ]}
        />
        <SectionTitle
          eyebrow={item.type}
          title={item.title}
          description={`${item.year} • ${item.tags.join(", ")}`}
        />
        {item.coverImage ? (
          <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-[#f7f5f3]">
            <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
          </div>
        ) : null}
        <div className="rounded-3xl border border-[#e5dfd8] bg-white p-8 text-sm text-[#5f677a]">
          <p>{item.summary}</p>
        </div>
        <DownloadButton label="Dosyayı İndir" href={item.fileUrl} />
      </div>
    </main>
  );
}
