"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PostForm = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export default function AdminPostsPage() {
  const [message, setMessage] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [coverFileName, setCoverFileName] = useState("");
  const [postForm, setPostForm] = useState<PostForm>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "Kurumsal",
    tags: "",
  });

  useEffect(() => {
    setIsAuthed(localStorage.getItem("hdf_admin") === "true");
  }, []);

  const handlePostSubmit = async () => {
    setMessage("");
    const payload = {
      title: postForm.title,
      slug: postForm.slug || slugify(postForm.title),
      excerpt: postForm.excerpt,
      content: postForm.content,
      coverImage: postForm.coverImage,
      category: postForm.category,
      tags: postForm.tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };
    const response = await fetch("/api/local/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setMessage(response.ok ? "Haber kaydedildi." : "Haber kaydedilemedi.");
    if (response.ok) {
      setCoverFileName("");
      setPostForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        category: "Kurumsal",
        tags: "",
      });
    }
  };

  return (
    <main className="py-16">
      <div className="mx-auto max-w-6xl space-y-8 px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-[#8f1e2d]">
              Yönetim Paneli
            </p>
            <h1 className="text-3xl font-semibold text-[#1f2a44]">Haber Girişi</h1>
            <p className="text-sm text-[#5f677a]">
              Başlık, özet, içerik ve görsel bilgilerini ekleyin.
            </p>
          </div>
          <Link href="/admin" className="text-sm font-semibold text-[#8f1e2d]">
            Yönetim Paneline Dön
          </Link>
        </div>

        {message ? (
          <div className="rounded-2xl border border-[#e5dfd8] bg-white px-4 py-3 text-sm text-[#394256]">
            {message}
          </div>
        ) : null}

        {!isAuthed ? (
          <div className="rounded-3xl border border-[#e5dfd8] bg-white p-6 text-sm text-[#5f677a]">
            Bu sayfa sadece yerel test içindir. Giriş için önce{" "}
            <Link href="/uye-girisi" className="font-semibold text-[#8f1e2d]">
              Üye Girişi
            </Link>{" "}
            sayfasına gidin.
          </div>
        ) : null}

        <section className="rounded-3xl border border-[#e5dfd8] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1f2a44]">Yeni Haber</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input
              placeholder="Başlık"
              value={postForm.title}
              onChange={(event) =>
                setPostForm((prev) => ({
                  ...prev,
                  title: event.target.value,
                  slug: slugify(event.target.value),
                }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm"
            />
            <input
              placeholder="Slug"
              value={postForm.slug}
              onChange={(event) =>
                setPostForm((prev) => ({ ...prev, slug: event.target.value }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm"
            />
            <input
              placeholder="Kapak görsel URL"
              value={postForm.coverImage}
              onChange={(event) =>
                setPostForm((prev) => ({ ...prev, coverImage: event.target.value }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm md:col-span-2"
            />
            <div className="md:col-span-2">
              <label className="text-xs font-semibold uppercase text-[#8f1e2d]">
                Kapak Görseli Yükle
              </label>
              <div className="mt-2 flex flex-wrap items-center gap-3 rounded-2xl border border-[#e5dfd8] bg-white px-4 py-3">
                <label
                  htmlFor="post-cover-upload"
                  className="cursor-pointer rounded-full bg-[#8f1e2d] px-4 py-2 text-xs font-semibold text-white"
                >
                  Dosya Seç
                </label>
                <span className="text-xs text-[#5f677a]">
                  {coverFileName || "Dosya seçilmedi"}
                </span>
                <input
                  id="post-cover-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    setCoverFileName(file.name);
                    const reader = new FileReader();
                    reader.onload = () => {
                      setPostForm((prev) => ({
                        ...prev,
                        coverImage: String(reader.result ?? ""),
                      }));
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </div>
            </div>
            <textarea
              placeholder="Özet"
              value={postForm.excerpt}
              onChange={(event) =>
                setPostForm((prev) => ({ ...prev, excerpt: event.target.value }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm md:col-span-2"
            />
            <textarea
              placeholder="İçerik"
              rows={6}
              value={postForm.content}
              onChange={(event) =>
                setPostForm((prev) => ({ ...prev, content: event.target.value }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm md:col-span-2"
            />
            <input
              placeholder="Kategori"
              value={postForm.category}
              onChange={(event) =>
                setPostForm((prev) => ({ ...prev, category: event.target.value }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm"
            />
            <input
              placeholder="Etiketler (virgülle)"
              value={postForm.tags}
              onChange={(event) =>
                setPostForm((prev) => ({ ...prev, tags: event.target.value }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm"
            />
          </div>
          <button
            type="button"
            onClick={handlePostSubmit}
            className="mt-6 rounded-full bg-[#8f1e2d] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-20px_rgba(127,29,29,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(127,29,29,0.8)]"
          >
            Haberi Kaydet
          </button>
        </section>
      </div>
    </main>
  );
}
