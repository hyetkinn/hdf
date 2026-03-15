import Link from "next/link";
import SectionTitle from "../../../components/SectionTitle";
import { Facebook, Instagram, Twitter } from "lucide-react";

export const metadata = {
  title: "Kadın Konseyi",
  description: "Kadın Konseyi çalışmaları ve katılım bilgileri.",
};

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/corumhdf19/", icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/corumhdf19/", icon: Instagram },
  { label: "X", href: "https://x.com/corumhdf", icon: Twitter },
];

export default function WomenCouncilPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-5xl space-y-10 px-4">
        <SectionTitle
          eyebrow="Kadın Konseyi"
          title="Kadın Eliyle Büyüyen Bir Gelecek"
          description="Hitit mirasını yaşatan kadınların dayanışma, eğitim ve toplumsal gelişim projeleri."
        />

        <div className="rounded-3xl border border-[#e5dfd8] bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase text-[#8f1e2d]">Başkan</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#1f2a44]">
            Gül Sağdıç Tuncar
          </h2>
          <p className="mt-4 text-sm text-[#5f677a]">
            Kadın Konseyi; kültürel bellek, sosyal dayanışma ve güçlü sivil toplum
            değerleriyle federasyonun sahadaki etkisini büyütür.
          </p>

          <div className="mt-6 flex items-center gap-4">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="transition-transform hover:scale-110"
                >
                  <Icon className="h-5 w-5 text-[#8f1e2d] transition-colors hover:text-red-600" />
                </a>
              );
            })}
          </div>

          <Link
            href="/iletisim"
            className="mt-8 inline-flex rounded-full bg-[#8f1e2d] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-20px_rgba(127,29,29,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(127,29,29,0.8)]"
          >
            Bize Katılın
          </Link>
        </div>
      </div>
    </main>
  );
}
