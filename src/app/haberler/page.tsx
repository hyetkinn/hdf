import SectionTitle from "../../components/SectionTitle";
import NewsList from "../../components/NewsList";
import { getPosts } from "../../lib/content";

export const metadata = {
  title: "Haberler",
  description: "Federasyonun güncel haberleri ve duyuruları.",
};
export const runtime = "nodejs";

export default async function NewsPage() {
  const posts = await getPosts();

  return (
    <main className="py-16">
      <div className="mx-auto max-w-6xl space-y-10 px-4">
        <SectionTitle
          eyebrow="Haberler"
          title="Güncel duyurular ve basın açıklamaları"
          description="Kültürel hafıza, sosyal sorumluluk ve hak savunuculuğu içerikleri."
        />
        <NewsList posts={posts} />
      </div>
    </main>
  );
}
