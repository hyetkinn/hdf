"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CouncilForm = {
  president: string;
  subheads: string;
  instagram: string;
  facebook: string;
  events: string;
};

const toForm = (data: any): CouncilForm => ({
  president: data?.president ?? "",
  subheads: Array.isArray(data?.subheads) ? data.subheads.join(", ") : "",
  instagram: data?.instagram ?? "",
  facebook: data?.facebook ?? "",
  events: Array.isArray(data?.events) ? data.events.join(", ") : "",
});

export default function YouthCouncilPage() {
  const [message, setMessage] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [form, setForm] = useState<CouncilForm>({
    president: "",
    subheads: "",
    instagram: "",
    facebook: "",
    events: "",
  });

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/local/councils");
      const data = await response.json();
      const target = Array.isArray(data)
        ? data.find((item) => item.slug === "genclik" || item.id === "council-youth")
        : null;
      if (target) setForm(toForm(target));
    };
    load();
    setIsAuthed(localStorage.getItem("hdf_admin") === "true");
  }, []);

  const handleSave = async () => {
    setMessage("");
    const payload = {
      id: "council-youth",
      slug: "genclik",
      name: "Gençlik Konseyi",
      president: form.president,
      subheads: form.subheads
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      instagram: form.instagram,
      facebook: form.facebook,
      events: form.events
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };
    const response = await fetch("/api/local/councils", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setMessage(response.ok ? "Gençlik konseyi güncellendi." : "Güncelleme başarısız.");
  };

  return (
    <main className="py-16">
      <div className="mx-auto max-w-6xl space-y-8 px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-[#8f1e2d]">
              Yönetim Paneli
            </p>
            <h1 className="text-3xl font-semibold text-[#1f2a44]">
              Gençlik Konseyi Yönetimi
            </h1>
            <p className="text-sm text-[#5f677a]">
              Başkan, alt başlıklar ve sosyal medya bilgilerini düzenleyin.
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
          <h2 className="text-lg font-semibold text-[#1f2a44]">Konsey Bilgileri</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input
              placeholder="Başkan"
              value={form.president}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, president: event.target.value }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm"
            />
            <input
              placeholder="Alt başlıklar (virgülle)"
              value={form.subheads}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, subheads: event.target.value }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm"
            />
            <input
              placeholder="Instagram linki"
              value={form.instagram}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, instagram: event.target.value }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm"
            />
            <input
              placeholder="Facebook linki"
              value={form.facebook}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, facebook: event.target.value }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm"
            />
            <textarea
              placeholder="Etkinlikler (virgülle)"
              value={form.events}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, events: event.target.value }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm md:col-span-2"
            />
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="mt-6 rounded-full bg-[#8f1e2d] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-20px_rgba(127,29,29,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(127,29,29,0.8)]"
          >
            Kaydet
          </button>
        </section>
      </div>
    </main>
  );
}
