"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type BoardMember = {
  id: string;
  name: string;
  role: string;
  photo: string;
};

export default function AdminBoardPage() {
  const [message, setMessage] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);

  useEffect(() => {
    const loadBoard = async () => {
      const response = await fetch("/api/local/board-members");
      const data = await response.json();
      if (Array.isArray(data)) setBoardMembers(data);
    };
    loadBoard();
    setIsAuthed(localStorage.getItem("hdf_admin") === "true");
  }, []);

  const handleBoardUpdate = async (member: BoardMember) => {
    setMessage("");
    const response = await fetch("/api/local/board-members", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(member),
    });
    setMessage(response.ok ? "Yönetim kurulu güncellendi." : "Güncelleme başarısız.");
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
              Yönetim Kurulu Düzenleme
            </h1>
            <p className="text-sm text-[#5f677a]">
              Yönetim kurulu isim ve görev bilgilerini güncelleyin.
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
          <h2 className="text-lg font-semibold text-[#1f2a44]">Yönetim Kurulu</h2>
          <div className="mt-4 grid gap-4">
            {boardMembers.map((member, index) => (
              <div
                key={member.id}
                className="grid gap-3 rounded-2xl border border-[#e5dfd8] p-4 md:grid-cols-[1.2fr_1.2fr_1fr_120px]"
              >
                <input
                  value={member.name}
                  onChange={(event) => {
                    const updated = [...boardMembers];
                    updated[index] = { ...member, name: event.target.value };
                    setBoardMembers(updated);
                  }}
                  className="rounded-xl border border-[#e5dfd8] px-3 py-2 text-sm"
                />
                <input
                  value={member.role}
                  onChange={(event) => {
                    const updated = [...boardMembers];
                    updated[index] = { ...member, role: event.target.value };
                    setBoardMembers(updated);
                  }}
                  className="rounded-xl border border-[#e5dfd8] px-3 py-2 text-sm"
                />
                <input
                  placeholder="Foto URL"
                  value={member.photo ?? ""}
                  onChange={(event) => {
                    const updated = [...boardMembers];
                    updated[index] = { ...member, photo: event.target.value };
                    setBoardMembers(updated);
                  }}
                  className="rounded-xl border border-[#e5dfd8] px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleBoardUpdate(member)}
                  className="rounded-full bg-[#8f1e2d] px-4 py-2 text-xs font-semibold text-white shadow-[0_12px_30px_-20px_rgba(127,29,29,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(127,29,29,0.8)]"
                >
                  Kaydet
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
