import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

const quickLinks = [
  { label: "Kurumsal", href: "/kurumsal" },
  { label: "Dernekler", href: "/dernekler" },
  { label: "Haberler", href: "/haberler" },
  { label: "Etkinlikler", href: "/etkinlikler" },
  { label: "Medya", href: "/medya" },
  { label: "İletişim", href: "/iletisim" },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/corumhdf19/", icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/corumhdf19/", icon: Instagram },
  { label: "X", href: "https://x.com/corumhdf", icon: Twitter },
];

export default function Footer() {
  return (
    <footer className="border-t-4 border-[#8f1e2d] bg-[#131b2e] text-white/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div className="space-y-4">
          <p className="text-base font-semibold text-white">
            Çorum Hitit Dernekleri Federasyonu
          </p>
          <div className="space-y-3 text-sm text-white/70">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-[#8f1e2d]" />
              <span>Kocatepe mah. Meşrutiyet Cad No:31/8 Kat:4 Kızılay / ANKARA</span>
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
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold text-white">Hızlı Linkler</p>
          <div className="grid gap-2 text-sm">
            {quickLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold text-white">Sosyal Medya</p>
          <div className="flex items-center gap-6 text-white/70">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="transition-transform hover:scale-110"
                >
                  <Icon className="h-6 w-6 text-[#8f1e2d] transition-colors hover:text-red-600" />
                </a>
              );
            })}
          </div>
          <Link
            href="/uye-girisi"
            className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#1f2a44]"
          >
            Üye Girişi
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs md:flex-row">
          <p>Çorum HDF © 2026 - Tüm Hakları Saklıdır</p>
          <div className="flex items-center gap-4">
            <Link href="/kurumsal/kvkk">KVKK</Link>
            <Link href="/kurumsal/tuzuk">Tüzük</Link>
            <Link href="/arsiv">Dijital Arşiv</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
