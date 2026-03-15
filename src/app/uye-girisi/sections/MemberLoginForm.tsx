"use client";

import { useState } from "react";
import Link from "next/link";
import SectionTitle from "../../../components/SectionTitle";

export default function MemberLoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage("");
    const normalized = identifier.trim().toLowerCase();
    if (normalized === "yetkin" && password === "hdfyetkin") {
      localStorage.setItem("hdf_admin", "true");
      setMessage("Giriş başarılı. /admin paneline geçebilirsiniz.");
      window.location.href = "/admin";
      return;
    }
    setMessage("Kullanıcı adı veya şifre hatalı.");
  };

  return (
    <main className="py-16">
      <div className="mx-auto max-w-4xl space-y-10 px-4">
        <SectionTitle
          eyebrow="Üye Girişi"
          title="Dernek başkanları ve editörler için"
          description="İçerik yönetimi ve güncellemeler için güvenli giriş."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[#e5dfd8] bg-white p-6 text-sm text-[#5f677a]">
            <p className="text-xs font-semibold uppercase text-[#8f1e2d]">
              Giriş Yap
            </p>
            <div className="mt-4 grid gap-4">
              <input
                placeholder="Kullanıcı adı veya e-posta"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                className="rounded-2xl border border-[#e5dfd8] px-4 py-3"
              />
              <input
                placeholder="Şifre"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-2xl border border-[#e5dfd8] px-4 py-3"
              />
              <button
                type="button"
                onClick={handleLogin}
                className="rounded-full bg-[#8f1e2d] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-20px_rgba(127,29,29,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(127,29,29,0.8)]"
              >
                Giriş Yap
              </button>
              <Link href="/admin" className="text-xs font-semibold text-[#8f1e2d]">
                Admin Paneline Git
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-[#e5dfd8] bg-white p-6 text-sm text-[#5f677a]">
            <p className="text-xs font-semibold uppercase text-[#8f1e2d]">
              Şifre Yenileme
            </p>
            <div className="mt-4 grid gap-4">
              <div className="rounded-2xl border border-[#e5dfd8] bg-[#f7f5f3] px-4 py-3 text-xs text-[#5f677a]">
                Yerel modda şifre yenileme kapalıdır.
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-[#f7f5f3] p-4 text-xs text-[#5f677a]">
              Local test girişi: kullanıcı adı <strong>yetkin</strong>, şifre{" "}
              <strong>hdfyetkin</strong>.
            </div>
          </div>
        </div>
        {message ? (
          <div className="rounded-2xl border border-[#e5dfd8] bg-white px-4 py-3 text-sm text-[#394256]">
            {message}
          </div>
        ) : null}
      </div>
    </main>
  );
}
