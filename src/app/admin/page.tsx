"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const adminModules = [
  {
    key: "posts",
    title: "Haber girişi",
    description: "Başlık, özet, içerik ve fotoğraf ekleyin.",
    href: "/admin/haberler",
  },
  {
    key: "events",
    title: "Etkinlik girişi",
    description: "Tarih/saat ve etkinlik detaylarını yönetin.",
    href: "/admin/etkinlikler",
  },
  {
    key: "board",
    title: "Yönetim kurulu düzenleme",
    description: "İsim, görev ve fotoğraf bilgilerini güncelleyin.",
    href: "/admin/yonetim-kurulu",
  },
  {
    key: "youth-council",
    title: "Gençlik konseyi yönetimi",
    description: "Başkan, etkinlik ve sosyal medya bilgileri.",
    href: "/admin/konsey-genclik",
  },
  {
    key: "women-council",
    title: "Kadın konseyi yönetimi",
    description: "Başkan, etkinlik ve sosyal medya bilgileri.",
    href: "/admin/konsey-kadin",
  },
  {
    key: "associations",
    title: "Köy derneği içerik düzenleme",
    description: "Köy bilgileri ve dernek başkanı düzenleyin.",
    href: "/admin/koy-dernekleri",
  },
] as const;

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    setIsAuthed(localStorage.getItem("hdf_admin") === "true");
  }, []);

  return (
    <main className="py-16">
      <div className="mx-auto max-w-6xl space-y-10 px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-[#8f1e2d]">
              Yönetim Paneli
            </p>
            <h1 className="text-3xl font-semibold text-[#1f2a44]">İçerik Yönetimi</h1>
            <p className="text-sm text-[#5f677a]">
              Haber, etkinlik ve yönetim kurulu bilgilerinin güncellenmesi.
            </p>
          </div>
          <Link href="/uye-girisi" className="text-sm font-semibold text-[#8f1e2d]">
            Üye Girişi
          </Link>
        </div>

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
          <h2 className="text-lg font-semibold text-[#1f2a44]">Yönetim Paneli</h2>
          <p className="mt-1 text-sm text-[#5f677a]">
            Hangi içerik türünü yöneteceğinizi seçin.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {adminModules.map((module) => (
              <Link
                key={module.key}
                href={module.href}
                className="flex flex-col gap-3 rounded-2xl border border-[#e5dfd8] bg-white px-5 py-4 text-left text-sm transition-all hover:-translate-y-0.5 hover:border-[#8f1e2d] hover:shadow-[0_18px_38px_-26px_rgba(31,42,68,0.6)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-[#1f2a44]">
                    {module.title}
                  </span>
                  <span className="rounded-full border border-[#8f1e2d] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#8f1e2d]">
                    Aç
                  </span>
                </div>
                <span className="text-sm text-[#5f677a]">{module.description}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
