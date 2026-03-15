import SectionTitle from "../../components/SectionTitle";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

export const metadata = {
  title: "İletişim",
  description: "Federasyon iletişim bilgileri ve iletişim formu.",
};

export default function ContactPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-6xl space-y-10 px-4">
        <SectionTitle
          eyebrow="İletişim"
          title="Federasyon ile iletişime geçin"
          description="Kurumsal iş birliği, üyelik ve medya talepleriniz için bize yazın."
        />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 rounded-3xl border border-[#e5dfd8] bg-white p-6 text-sm text-[#5f677a]">
            <div>
              <p className="text-xs font-semibold uppercase text-[#8f1e2d]">
                İletişim Bilgileri
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-[#8f1e2d]" />
                  <span>
                    Kocatepe mah. Meşrutiyet Cad No:31/8 Kat:4 Kızılay / ANKARA
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[#8f1e2d]" />
                  <span>0 312 419 03 19</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[#8f1e2d]" />
                  <span>info@corumhdf.org.tr</span>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="https://www.facebook.com/corumhdf19/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="transition-transform hover:scale-110"
                >
                  <Facebook className="h-5 w-5 text-[#8f1e2d] transition-colors hover:text-red-600" />
                </a>
                <a
                  href="https://www.instagram.com/corumhdf19/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="transition-transform hover:scale-110"
                >
                  <Instagram className="h-5 w-5 text-[#8f1e2d] transition-colors hover:text-red-600" />
                </a>
                <a
                  href="https://x.com/corumhdf"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                  className="transition-transform hover:scale-110"
                >
                  <Twitter className="h-5 w-5 text-[#8f1e2d] transition-colors hover:text-red-600" />
                </a>
              </div>
            </div>
            <div className="aspect-video overflow-hidden rounded-2xl border border-[#e5dfd8] bg-[#f7f5f3]">
              <iframe
                title="HDF Konum"
                src="https://www.google.com/maps?q=K%C4%B1z%C4%B1lay%20Ankara&output=embed"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>

          <form className="rounded-3xl border border-[#e5dfd8] bg-white p-6 text-sm text-[#5f677a]">
            <p className="text-xs font-semibold uppercase text-[#8f1e2d]">
              İletişim Formu
            </p>
            <div className="mt-4 grid gap-4">
              <input
                placeholder="Ad Soyad"
                className="rounded-2xl border border-[#e5dfd8] px-4 py-3"
              />
              <input
                placeholder="E-posta"
                className="rounded-2xl border border-[#e5dfd8] px-4 py-3"
              />
              <input
                placeholder="Konu"
                className="rounded-2xl border border-[#e5dfd8] px-4 py-3"
              />
              <textarea
                placeholder="Mesajınız"
                rows={5}
                className="rounded-2xl border border-[#e5dfd8] px-4 py-3"
              />
              <button
                type="button"
                className="rounded-full bg-[#8f1e2d] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-20px_rgba(127,29,29,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(127,29,29,0.8)]"
              >
                Mesaj Gönder
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
