import type { Association } from "../../types/content";

const entries = [
  { name: "Ahmetoğlan", president: "Şevket Süzer" },
  { name: "Akçaköy", president: "Bektaş Aslan" },
  { name: "Akçalı", president: "Muharrem Eröksüz" },
  { name: "Akören", president: "Önder Zorba" },
  { name: "Akpınar", president: "Özer Araz" },
  { name: "Akyar", president: "Hüseyin Uzuner" },
  { name: "Alacahöyük", president: "Pirzade Köse" },
  { name: "Alembeyli", president: "Hikmet Ulaç" },
  { name: "Aşar", president: "Hüseyin Uzuner" },
  { name: "Balçıkhisar", president: "Ünver Erdoğan" },
  { name: "Bektaşoğlu", president: "Muharrem Duman" },
  { name: "Beyyurdu", president: "Müslüm Cingöz" },
  { name: "Boyacı", president: "Kazım Kılıç" },
  { name: "Bozdoğan", president: "Sedat Başbolat" },
  { name: "Büyük Divan", president: "Çetin Temiz" },
  { name: "Büyük Keşlik", president: "Ayhan Bal" },
  { name: "Büyük Söğütözü", president: "Cafer Üzgün" },
  { name: "Büyükkışla", president: "Hüseyin Uzuner" },
  { name: "Cevizli", president: "Hüseyin Uzuner" },
  { name: "Çağşak", president: "Ali Ovacık" },
  { name: "Çalyayla", president: "Oktay Bal" },
  { name: "Çampınar", president: "Yüksel Ay" },
  { name: "Çayan", president: "Haydar Tokmak" },
  { name: "Çelebibağ", president: "Seyit Ali Taş" },
  { name: "Çevreli", president: "Cuma Baz" },
  { name: "Çırçır", president: "Akın Kaluç" },
  { name: "Çukurlu", president: "Hüseyin Çukurluöz" },
  { name: "Değirmenönü", president: "İsmet Kaluç" },
  { name: "Dereyazıcı", president: "Sedat Şimşek" },
  { name: "Dertli", president: "Ahmet Özbilgin" },
  { name: "Erenköy", president: "Köksal Aydugan" },
  { name: "Esentepe", president: "Hüseyin Uzuner" },
  { name: "Eskiyapar", president: "Ethem Koçak" },
  { name: "Eşençay", president: "Mustafa Yüceer" },
  { name: "Evci Yeni Kışla", president: "Ali Rıza Gündoğar" },
  { name: "Evcikışla", president: "Hürdoğan Aydoğdu" },
  { name: "Fındıklı", president: "Hüseyin Uzuner" },
  { name: "Geykoca", president: "Adnan Kantar" },
  { name: "Gökçam", president: "Levent Vural" },
  { name: "Gökçeağaç", president: "Erkan Köse" },
  { name: "Gülderesi", president: "Ünal Arslan" },
  { name: "Güvenli", president: "Ahmet Dilbilmez" },
  { name: "Harhar", president: "Zeki Yıldırım" },
  { name: "Haydarinköy", president: "Nesimi Erbaş" },
  { name: "İmat", president: "Ünsal Erhan" },
  { name: "İncesu", president: "Hüseyin Uzuner" },
  { name: "Kamışlı", president: "Alemdar Temelci" },
  { name: "Karabayır", president: "Ali Aksoy" },
  { name: "Karakaya", president: "Veysel Karanî Tunç" },
  { name: "Karamahmut", president: "Vedat Kaya" },
  { name: "Karatepe", president: "Selahattin Kahraman" },
  { name: "Kavakalan", president: "Hüseyin Uzuner" },
  { name: "Kayabüğet", president: "Gürsel Yılmaz" },
  { name: "Kıcıllı", president: "Şengül Yıldırım" },
  { name: "Kılavuz", president: "Cemal Emir" },
  { name: "Kızılhamza", president: "Ali Rıza Demir" },
  { name: "Koçhisar", president: "Mustafa İlkyaz" },
  { name: "Kozören", president: "Tahsin Çetin" },
  { name: "Köseyüp", president: "Hakan Yücel" },
  { name: "Kuşsaray", president: "Atilla Ilıman" },
  { name: "Kuzkışla", president: "Ercan Kurt" },
  { name: "Küçükerikli", president: "Behçet Akdulum" },
  { name: "Küçükkeşlik", president: "Erol Ulusoy" },
  { name: "Küre", president: "Veli Çelik" },
  { name: "Kürkçü", president: "Erol Topal" },
  { name: "Mahmatlı", president: "Erol Özdiklekli" },
  { name: "Mazıbaşı", president: "Nuran Çopur" },
  { name: "Mislerovaciği", president: "Hüseyin Börekçi" },
  { name: "Oğlaközü", president: "Akif Ateş" },
  { name: "Ortaköy", president: "Hüseyin Uzuner" },
  { name: "Perçem", president: "Ayhan Türk" },
  { name: "Salbaş", president: "Hüseyin Uzuner" },
  { name: "Sapaköy", president: "Haydar Bulut" },
  { name: "Sarımbey", president: "Kenan Temur" },
  { name: "Senemoğlu", president: "Hüseyin Uzuner" },
  { name: "Seyfe", president: "Ersoy Biçer" },
  { name: "Sırıklı", president: "Yılmaz Taşkıran" },
  { name: "Sırkoğlu", president: "Hüseyin Uzuner" },
  { name: "Şahinkaya", president: "Arap Bozkul" },
  { name: "Şeyhler", president: "Necla Keskin" },
  { name: "Tarhan", president: "Yusuf Alçin" },
  { name: "Topuzunköy", president: "Tahsin Akın" },
  { name: "Yazır", president: "İsmet Ankitçi" },
  { name: "Yenice", president: "Haydar Özdemir" },
  { name: "Yeniköy", president: "Ali Karataş" },
  { name: "Yeşilköy", president: "Ümit Keleş" },
];

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

const guessDistrict = (village: string) => {
  const normalized = village.toLowerCase();
  if (normalized.includes("alacahoyuk") || normalized.includes("alaca")) {
    return "Alaca";
  }
  if (normalized.includes("ortakoy")) {
    return "Ortaköy";
  }
  return "Çorum Merkez";
};

const socialOverrides: Record<string, Partial<Association["socialLinks"]>> = {
  ahmetoglan: {
    facebook: "https://www.facebook.com/profile.php?id=100064689155846",
    instagram: "https://www.instagram.com/ankahmetoglan1906/",
  },
};

const mapsOverrides: Record<string, string> = {
  ahmetoglan: "https://maps.app.goo.gl/aL7kZ8pwcesLaaN96",
};

const mapsEmbedOverrides: Record<string, string> = {
  ahmetoglan:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3829.9522220207255!2d35.132134199999996!3d40.39467559999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4080cbfc2dd8fd4d%3A0xe7aa5afc54b1317e!2zQWhtZXRvxJ9sYW4sIDE5MDEwIEFobWV0b8SfbGFuL8OHb3J1bSBNZXJrZXovw4dvcnVt!5e1!3m2!1str!2str!4v1773523871579!5m2!1str!2str",
};

export const associations: Association[] = entries.map((entry, index) => {
  const district = guessDistrict(entry.name);
  const name = `${entry.name} Köyü Derneği`;
  const slug = slugify(entry.name);

  return {
    id: `assoc-${index + 1}`,
    name,
    slug,
    president: entry.president,
    district,
    city: "Çorum",
    phone: "0 312 419 03 19",
    email: "info@corumhdf.org.tr",
    address: `Kocatepe mah. Meşrutiyet Cad No:31/8 Kat:4 Kızılay / ANKARA`,
    socialLinks: {
      facebook: "https://www.facebook.com/corumhdf19/",
      instagram: "https://www.instagram.com/corumhdf19/",
      x: "https://x.com/corumhdf",
      ...socialOverrides[slug],
    },
    mapsLink: mapsOverrides[slug],
    mapsEmbedLink: mapsEmbedOverrides[slug],
    galleryImages: ["/media/placeholder.svg", "/media/placeholder.svg", "/media/placeholder.svg"],
  };
});
