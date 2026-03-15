export const siteConfig = {
  name: "Çorum Hitit Dernekleri Federasyonu",
  description:
    "Hitit mirası, kültürel bellek ve güçlü sivil toplum odağında dernekleri buluşturan federasyon platformu.",
  url: "https://corumhdf.org.tr",
  locale: "tr_TR",
};

export const megaMenu = [
  {
    label: "Kurumsal",
    href: "/kurumsal",
    items: [
      { label: "Hakkımızda", href: "/kurumsal/hakkimizda" },
      { label: "Yönetim Kurulu", href: "/kurumsal/yonetim-kurulu" },
      { label: "Tüzük", href: "/kurumsal/tuzuk" },
      { label: "KVKK / Gizlilik", href: "/kurumsal/kvkk" },
    ],
  },
  {
    label: "Dernekler",
    href: "/dernekler",
    items: [
      { label: "Dernek Listesi", href: "/dernekler" },
      { label: "Öne Çıkan Dernekler", href: "/dernekler#one-cikan" },
    ],
  },
  {
    label: "Haberler",
    href: "/haberler",
    items: [
      { label: "Tüm Haberler", href: "/haberler" },
      { label: "Basın Açıklamaları", href: "/haberler?category=Basın" },
      { label: "Duyurular", href: "/haberler?category=Duyuru" },
    ],
  },
  {
    label: "Etkinlikler",
    href: "/etkinlikler",
    items: [
      { label: "Yaklaşan Etkinlikler", href: "/etkinlikler?filter=upcoming" },
      { label: "Geçmiş Etkinlikler", href: "/etkinlikler?filter=past" },
      { label: "Takvim", href: "/etkinlikler#takvim" },
    ],
  },
  {
    label: "Meclisler",
    href: "/komisyonlar/genclik-konseyi",
    items: [
      { label: "Gençlik Meclisi", href: "/komisyonlar/genclik-konseyi" },
      { label: "Kadın Meclisi", href: "/komisyonlar/kadin-konseyi" },
    ],
  },
  {
    label: "Medya",
    href: "/medya",
    items: [
      { label: "Galeri", href: "/medya#galeri" },
      { label: "Basın Odası", href: "/medya#basin-odasi" },
      { label: "Dijital Arşiv", href: "/arsiv" },
    ],
  },
  {
    label: "İletişim",
    href: "/iletisim",
    items: [
      { label: "İletişim Bilgileri", href: "/iletisim" },
      { label: "Üye Girişi", href: "/uye-girisi" },
    ],
  },
];
