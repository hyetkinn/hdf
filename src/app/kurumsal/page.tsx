import Link from "next/link";
import SectionTitle from "../../components/SectionTitle";

export const metadata = {
  title: "Kurumsal",
  description: "Federasyonun kurumsal yapısı, tüzük ve yönetim bilgileri.",
};

const cards = [
  {
    title: "Hakkımızda",
    description: "Federasyonun misyonu ve kurum kültürü.",
    href: "/kurumsal/hakkimizda",
  },
  {
    title: "Yönetim Kurulu",
    description: "Başkan ve yönetim ekibi listesi.",
    href: "/kurumsal/yonetim-kurulu",
  },
  {
    title: "Tüzük",
    description: "Federasyon tüzüğü ve mevzuat metinleri.",
    href: "/kurumsal/tuzuk",
  },
  {
    title: "KVKK / Gizlilik",
    description: "Kişisel veriler ve gizlilik politikası.",
    href: "/kurumsal/kvkk",
  },
];

export default function CorporatePage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-6xl space-y-10 px-4">
        <SectionTitle
          eyebrow="Kurumsal"
          title="Kurumsal yapı ve mevzuat"
          description="Şeffaf, güçlü ve erişilebilir bir kurumsal yapı için gerekli tüm bilgilere buradan erişebilirsiniz."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-3xl border border-[#e5dfd8] bg-white p-6 transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-[#1f2a44]">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-[#5f677a]">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
