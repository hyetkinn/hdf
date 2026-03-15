import "server-only";
import Image from "next/image";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ShareButtons from "../../../components/ShareButtons";
import SectionTitle from "../../../components/SectionTitle";
import { getPostBySlug } from "../../../lib/content";
import { siteConfig } from "../../../lib/site";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps) {
  noStore();
  const { slug } = params;
  const post = await resolvePost(slug);

  if (!post) {
    return { title: "Haber bulunamadı" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/haberler/${post.slug}`,
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  noStore();
  const { slug } = params;
  const post = await resolvePost(slug);

  if (!post) {
    const fallbackPosts = await readLocalPosts();
    const fallbackPost = fallbackPosts[0];
    if (!fallbackPost) {
      return (
        <main className="py-16">
          <div className="mx-auto max-w-4xl space-y-6 px-4">
            <SectionTitle
              eyebrow="Haberler"
              title="Haber bulunamadı"
              description="Yerel veri dosyasında eşleşen haber yok."
            />
          </div>
        </main>
      );
    }

    return renderPost({
      post: fallbackPost,
      banner:
        "Bu slug bulunamadı. Yereldeki ilk haber gösteriliyor. Doğru linkler aşağıda.",
      allSlugs: fallbackPosts.map((item) => String(item.slug ?? "")),
    });
  }

  const shareUrl = `${siteConfig.url}/haberler/${post.slug}`;

  return renderPost({ post });
}

const resolvePost = async (slug: string) => {
  const normalized = decodeURIComponent(slug).trim().toLowerCase();
  const fromContent = await getPostBySlug(slug);
  if (fromContent) return fromContent;

  const posts = await readLocalPosts();
  const post = posts.find((item) => String(item.slug ?? "").trim().toLowerCase() === normalized);
  return post ?? null;
};

const readLocalPosts = async () => {
  try {
    const dbPath =
      process.env.LOCAL_DB_PATH ?? path.join(process.cwd(), "data", "local-db.json");
    const raw = await fs.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw) as { posts?: Array<Record<string, unknown>> };
    return (db.posts ?? []) as Array<Record<string, unknown>>;
  } catch {
    return [];
  }
};

const renderPost = ({
  post,
  banner,
  allSlugs,
}: {
  post: any;
  banner?: string;
  allSlugs?: string[];
}) => {
  const shareUrl = `${siteConfig.url}/haberler/${post.slug}`;
  return (
    <main className="py-16">
      <div className="mx-auto max-w-4xl space-y-8 px-4">
        <Breadcrumbs
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Haberler", href: "/haberler" },
            { label: post.title },
          ]}
        />
        {banner ? (
          <div className="rounded-2xl border border-[#e5dfd8] bg-white px-4 py-3 text-sm text-[#394256]">
            {banner}
          </div>
        ) : null}
        <SectionTitle
          eyebrow={post.category}
          title={post.title}
          description={new Date(post.date).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        />
        <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-[#f7f5f3]">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
        </div>
        <div className="rounded-3xl border border-[#e5dfd8] bg-white p-8 text-sm text-[#5f677a]">
          <p>{post.content}</p>
        </div>
        {allSlugs?.length ? (
          <div className="rounded-3xl border border-[#e5dfd8] bg-white p-6 text-sm text-[#5f677a]">
            <p className="mb-3 font-semibold text-[#1f2a44]">Mevcut haber linkleri</p>
            <div className="flex flex-wrap gap-2">
              {allSlugs.map((slug) => (
                <a
                  key={slug}
                  href={`/haberler/${slug}`}
                  className="rounded-full border border-[#e5dfd8] px-3 py-1 text-xs text-[#8f1e2d]"
                >
                  {slug}
                </a>
              ))}
            </div>
          </div>
        ) : null}
        <ShareButtons title={post.title} url={shareUrl} />
      </div>
    </main>
  );
};
