import Link from "next/link";
import SectionTitle from "../../components/SectionTitle";
import DownloadButton from "../../components/DownloadButton";

export const metadata = {
  title: "İş Birliği / Sponsorluk",
  description: "Kurumsal paydaşlık ve sponsorluk çalışmaları.",
};

export default function PartnershipPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-6xl space-y-10 px-4">
        <SectionTitle
          eyebrow="İş Birliği"
          title="Kurumsal paydaşlık ve sponsorluk"
          description="Federasyonumuzla ortak projeler geliştirmek için bizimle iletişime geçin."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[#e5dfd8] bg-white p-6 text-sm text-[#5f677a]">
            <p>
              Toplumsal dayanışma, kültürel hafıza ve eğitim programlarımız için
              iş birliği yapabileceğimiz kurumları bekliyoruz.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <DownloadButton label="Sponsorluk Dosyası" href="/media/placeholder.pdf" />
              <Link
                href="/iletisim"
                className="rounded-full bg-[#8f1e2d] px-4 py-2 text-xs font-semibold text-white shadow-[0_12px_30px_-20px_rgba(127,29,29,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(127,29,29,0.8)]"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-[#e5dfd8] bg-white p-6">
            <p className="text-xs font-semibold uppercase text-[#8f1e2d]">
              Paydaş Duvarı
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {["Kurumsal Partner", "Yerel Yönetim", "Eğitim Paydaşı", "Medya"].map(
                (label) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-[#e5dfd8] bg-[#f7f5f3] px-4 py-3 text-sm font-semibold text-[#394256]"
                  >
                    {label}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
