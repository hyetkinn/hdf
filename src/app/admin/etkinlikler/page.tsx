"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { parseDateTime } from "../../../lib/date";

type EventForm = {
  title: string;
  slug: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  posterImage: string;
  organizer: string;
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

export default function AdminEventsPage() {
  const [message, setMessage] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [posterFileName, setPosterFileName] = useState("");
  const [eventForm, setEventForm] = useState<EventForm>({
    title: "",
    slug: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
    location: "",
    posterImage: "",
    organizer: "Çorum HDF",
  });

  useEffect(() => {
    setIsAuthed(localStorage.getItem("hdf_admin") === "true");
  }, []);

  const handleEventSubmit = async () => {
    setMessage("");
    const parsedStart = parseDateTime(eventForm.startDateTime);
    if (!parsedStart) {
      setMessage("Lütfen geçerli bir başlangıç tarihi girin.");
      return;
    }
    if (eventForm.endDateTime && !parseDateTime(eventForm.endDateTime)) {
      setMessage("Lütfen geçerli bir bitiş tarihi girin.");
      return;
    }
    const payload = {
      title: eventForm.title,
      slug: eventForm.slug || slugify(eventForm.title),
      description: eventForm.description,
      startDateTime: eventForm.startDateTime,
      endDateTime: eventForm.endDateTime,
      location: eventForm.location,
      posterImage: eventForm.posterImage,
      organizer: eventForm.organizer,
    };
    const response = await fetch("/api/local/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setMessage(response.ok ? "Etkinlik kaydedildi." : "Etkinlik kaydedilemedi.");
    if (response.ok) {
      setPosterFileName("");
      setEventForm({
        title: "",
        slug: "",
        description: "",
        startDateTime: "",
        endDateTime: "",
        location: "",
        posterImage: "",
        organizer: "Çorum HDF",
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
            <h1 className="text-3xl font-semibold text-[#1f2a44]">Etkinlik Girişi</h1>
            <p className="text-sm text-[#5f677a]">
              Tarih, saat ve etkinlik detaylarını girin.
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
          <h2 className="text-lg font-semibold text-[#1f2a44]">Yeni Etkinlik</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input
              placeholder="Başlık"
              value={eventForm.title}
              onChange={(event) =>
                setEventForm((prev) => ({
                  ...prev,
                  title: event.target.value,
                  slug: slugify(event.target.value),
                }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm"
            />
            <input
              placeholder="Slug"
              value={eventForm.slug}
              onChange={(event) =>
                setEventForm((prev) => ({ ...prev, slug: event.target.value }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm"
            />
            <input
              placeholder="Poster görsel URL"
              value={eventForm.posterImage}
              onChange={(event) =>
                setEventForm((prev) => ({ ...prev, posterImage: event.target.value }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm md:col-span-2"
            />
            <div className="md:col-span-2">
              <label className="text-xs font-semibold uppercase text-[#8f1e2d]">
                Poster Görseli Yükle
              </label>
              <div className="mt-2 flex flex-wrap items-center gap-3 rounded-2xl border border-[#e5dfd8] bg-white px-4 py-3">
                <label
                  htmlFor="event-poster-upload"
                  className="cursor-pointer rounded-full bg-[#8f1e2d] px-4 py-2 text-xs font-semibold text-white"
                >
                  Dosya Seç
                </label>
                <span className="text-xs text-[#5f677a]">
                  {posterFileName || "Dosya seçilmedi"}
                </span>
                <input
                  id="event-poster-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    setPosterFileName(file.name);
                    const reader = new FileReader();
                    reader.onload = () => {
                      setEventForm((prev) => ({
                        ...prev,
                        posterImage: String(reader.result ?? ""),
                      }));
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </div>
            </div>
            <textarea
              placeholder="Açıklama"
              value={eventForm.description}
              onChange={(event) =>
                setEventForm((prev) => ({ ...prev, description: event.target.value }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm md:col-span-2"
            />
            <input
              type="datetime-local"
              value={eventForm.startDateTime}
              onChange={(event) =>
                setEventForm((prev) => ({ ...prev, startDateTime: event.target.value }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm"
            />
            <input
              type="datetime-local"
              value={eventForm.endDateTime}
              onChange={(event) =>
                setEventForm((prev) => ({ ...prev, endDateTime: event.target.value }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm"
            />
            <input
              placeholder="Konum"
              value={eventForm.location}
              onChange={(event) =>
                setEventForm((prev) => ({ ...prev, location: event.target.value }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm"
            />
            <input
              placeholder="Organizatör"
              value={eventForm.organizer}
              onChange={(event) =>
                setEventForm((prev) => ({ ...prev, organizer: event.target.value }))
              }
              className="rounded-2xl border border-[#e5dfd8] px-4 py-3 text-sm"
            />
          </div>
          <button
            type="button"
            onClick={handleEventSubmit}
            className="mt-6 rounded-full bg-[#8f1e2d] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-20px_rgba(127,29,29,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(127,29,29,0.8)]"
          >
            Etkinliği Kaydet
          </button>
        </section>
      </div>
    </main>
  );
}
