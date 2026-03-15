"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Association } from "../../../types/content";

type AssociationForm = {
  president: string;
  district: string;
  city: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  facebook: string;
  instagram: string;
  mapsLink: string;
  mapsEmbedLink: string;
  announcements: string;
  coverImage: string;
  galleryImages: string;
};

const toForm = (association: Association): AssociationForm => ({
  president: association.president ?? "",
  district: association.district ?? "",
  city: association.city ?? "",
  phone: association.phone ?? "",
  email: association.email ?? "",
  address: association.address ?? "",
  description: association.description ?? "",
  facebook: association.socialLinks?.facebook ?? "",
  instagram: association.socialLinks?.instagram ?? "",
  mapsLink: association.mapsLink ?? "",
  mapsEmbedLink: association.mapsEmbedLink ?? "",
  announcements: (association.announcements ?? []).join("\n"),
  coverImage: association.galleryImages?.[0] ?? "",
  galleryImages: (association.galleryImages ?? []).join(", "),
});

export default function AdminAssociationsPage() {
  const [message, setMessage] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [associations, setAssociations] = useState<Association[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [form, setForm] = useState<AssociationForm>({
    president: "",
    district: "",
    city: "",
    phone: "",
    email: "",
    address: "",
    description: "",
    facebook: "",
    instagram: "",
    mapsLink: "",
    mapsEmbedLink: "",
    announcements: "",
    coverImage: "",
    galleryImages: "",
  });
  const [search, setSearch] = useState("");
  const [coverFileName, setCoverFileName] = useState("");
  const [galleryFileName, setGalleryFileName] = useState("");

  useEffect(() => {
    const loadAssociations = async () => {
      const response = await fetch("/api/local/associations");
      const data = await response.json();
      if (Array.isArray(data)) {
        setAssociations(data);
        if (data[0]?.id) {
          setSelectedId(data[0].id);
          setForm(toForm(data[0]));
        }
      }
    };
    loadAssociations();
    setIsAuthed(localStorage.getItem("hdf_admin") === "true");
  }, []);

  const filtered = useMemo(() => {
    const normalized = search.toLowerCase().trim();
    if (!normalized) return associations;
    return associations.filter((item) =>
      item.name.toLowerCase().includes(normalized)
    );
  }, [associations, search]);

  const selected = associations.find((item) => item.id === selectedId) ?? null;

  const handleSelect = (association: Association) => {
    setSelectedId(association.id);
    setForm(toForm(association));
    setCoverFileName("");
    setGalleryFileName("");
    setMessage("");
  };

  const handleSave = async () => {
    if (!selected) return;
    setMessage("");
    const galleryImages = form.galleryImages
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    if (form.coverImage) {
      if (galleryImages[0] !== form.coverImage) {
        galleryImages.unshift(form.coverImage);
      }
    }
    const payload: Association = {
      ...selected,
      president: form.president,
      district: form.district,
      city: form.city,
      phone: form.phone || undefined,
      email: form.email || undefined,
      address: form.address || undefined,
      description: form.description || undefined,
      mapsLink: form.mapsLink || undefined,
      mapsEmbedLink: form.mapsEmbedLink || undefined,
      socialLinks: {
        ...selected.socialLinks,
        facebook: form.facebook || undefined,
        instagram: form.instagram || undefined,
      },
      announcements: form.announcements
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      galleryImages: galleryImages.length ? galleryImages : undefined,
    };
    const response = await fetch("/api/local/associations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      setAssociations((prev) =>
        prev.map((item) => (item.id === payload.id ? payload : item))
      );
      setMessage("Köy derneği güncellendi.");
    } else {
      setMessage("Güncelleme başarısız.");
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
            <h1 className="text-3xl font-semibold text-[#1f2a44]">
              Köy Derneği İçerik Düzenleme
            </h1>
            <p className="text-sm text-[#5f677a]">
              Köy derneklerinin başkan ve iletişim bilgilerini güncelleyin.
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

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.6fr]">
          <div className="rounded-3xl border border-[#e5dfd8] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#1f2a44]">Köy Listesi</h2>
            <input
              placeholder="Köy ara"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="mt-4 w-full rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm"
            />
            <div className="mt-4 max-h-[420px] space-y-2 overflow-auto">
              {filtered.map((association) => (
                <button
                  key={association.id}
                  type="button"
                  onClick={() => handleSelect(association)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition-all ${
                    association.id === selectedId
                      ? "border-[#8f1e2d] bg-[#8f1e2d]/5 text-[#8f1e2d]"
                      : "border-[#e5dfd8] bg-white text-[#1f2a44]"
                  }`}
                >
                  {association.name}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#e5dfd8] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#1f2a44]">Köy Bilgileri</h2>
            {selected ? (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <input
                  value={selected.name}
                  readOnly
                  className="rounded-2xl border border-[#e5dfd8] bg-[#f7f5f3] px-4 py-3 text-sm md:col-span-2"
                />
                <input
                  placeholder="Dernek Başkanı"
                  value={form.president}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, president: event.target.value }))
                  }
                  className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm"
                />
                <input
                  placeholder="İlçe"
                  value={form.district}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, district: event.target.value }))
                  }
                  className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm"
                />
                <input
                  placeholder="İl"
                  value={form.city}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, city: event.target.value }))
                  }
                  className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm"
                />
                <input
                  placeholder="Telefon"
                  value={form.phone}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, phone: event.target.value }))
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
                <input
                  placeholder="E-posta"
                  value={form.email}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, email: event.target.value }))
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
                <textarea
                  placeholder="Adres"
                  value={form.address}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, address: event.target.value }))
                  }
                  className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm md:col-span-2"
                />
                <textarea
                  placeholder="Köy açıklaması"
                  value={form.description}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, description: event.target.value }))
                  }
                  className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm md:col-span-2"
                  rows={4}
                />
                <textarea
                  placeholder="Duyurular (her satıra bir madde)"
                  value={form.announcements}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, announcements: event.target.value }))
                  }
                  className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm md:col-span-2"
                  rows={4}
                />
                <input
                  placeholder="Google Maps linki"
                  value={form.mapsLink}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, mapsLink: event.target.value }))
                  }
                  className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm md:col-span-2"
                />
                <input
                  placeholder="Google Maps embed linki (iframe)"
                  value={form.mapsEmbedLink}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, mapsEmbedLink: event.target.value }))
                  }
                  className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm md:col-span-2"
                />
                <input
                  placeholder="Kapak Fotoğrafı URL"
                  value={form.coverImage}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, coverImage: event.target.value }))
                  }
                  className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm md:col-span-2"
                />
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold uppercase text-[#8f1e2d]">
                    Kapak Fotoğrafı Yükle
                  </label>
                  <div className="mt-2 flex flex-wrap items-center gap-3 rounded-2xl border border-[#e5dfd8] bg-white px-4 py-3">
                    <label
                      htmlFor="association-cover-upload"
                      className="cursor-pointer rounded-full bg-[#8f1e2d] px-4 py-2 text-xs font-semibold text-white"
                    >
                      Dosya Seç
                    </label>
                    <span className="text-xs text-[#5f677a]">
                      {coverFileName || "Dosya seçilmedi"}
                    </span>
                    <input
                      id="association-cover-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (event) => {
                        const file = event.target.files?.[0];
                        if (!file) return;
                        setCoverFileName(file.name);
                        const reader = new FileReader();
                        reader.onload = () => {
                          setForm((prev) => ({
                            ...prev,
                            coverImage: String(reader.result ?? ""),
                          }));
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </div>
                </div>
                <input
                  placeholder="Galeri fotoğrafları (virgülle)"
                  value={form.galleryImages}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, galleryImages: event.target.value }))
                  }
                  className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm md:col-span-2"
                />
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold uppercase text-[#8f1e2d]">
                    Galeri Fotoğrafı Yükle
                  </label>
                  <div className="mt-2 flex flex-wrap items-center gap-3 rounded-2xl border border-[#e5dfd8] bg-white px-4 py-3">
                    <label
                      htmlFor="association-gallery-upload"
                      className="cursor-pointer rounded-full bg-[#8f1e2d] px-4 py-2 text-xs font-semibold text-white"
                    >
                      Dosya Seç
                    </label>
                    <span className="text-xs text-[#5f677a]">
                      {galleryFileName || "Dosya seçilmedi"}
                    </span>
                    <input
                      id="association-gallery-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (event) => {
                        const file = event.target.files?.[0];
                        if (!file) return;
                        setGalleryFileName(file.name);
                        const reader = new FileReader();
                        reader.onload = () => {
                          const image = String(reader.result ?? "");
                          setForm((prev) => ({
                            ...prev,
                            galleryImages: prev.galleryImages
                              ? `${prev.galleryImages}, ${image}`
                              : image,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-full bg-[#8f1e2d] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-20px_rgba(127,29,29,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(127,29,29,0.8)] md:col-span-2"
                >
                  Kaydet
                </button>
              </div>
            ) : (
              <p className="mt-4 text-sm text-[#5f677a]">
                Lütfen listeden bir köy seçin.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
