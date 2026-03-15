import SectionTitle from "../../../components/SectionTitle";

export const metadata = {
  title: "Hakkımızda",
  description:
    "Çorum Hitit Dernekleri Federasyonu'nun misyonu, vizyonu ve değerleri.",
};

export default function AboutPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-4xl space-y-8 px-4">
        <SectionTitle
          eyebrow="Hakkımızda"
          title="Kültür, dayanışma ve hak savunuculuğu"
          description="Federasyonumuz, Çorum kökenli dernekleri Ankara’da ortak bir çatı altında buluşturur."
        />
        <div className="space-y-6 rounded-3xl border border-[#e5dfd8] bg-white p-8 text-sm text-[#5f677a]">
          <p>
            Çorum Hitit Dernekleri Federasyonu, 90 derneğin bir araya gelerek
            oluşturduğu güçlü bir sivil toplum yapılanmasıdır. Amacımız kültürel
            mirası yaşatmak, dayanışma ağlarını güçlendirmek ve hak savunuculuğu
            çalışmalarını kurumsal bir yapıda sürdürmektir.
          </p>
          <p>
            Federasyonumuz; eğitim, sosyal sorumluluk, kültürel hafıza ve toplumsal
            katılım alanlarında projeler yürütür. Dernekler arası koordinasyonu
            sağlayarak ortak etkinlikler ve güçlü bir kamusal etki oluşturur.
          </p>
          <p>
            Dijital platformumuz, tüm içeriklerin şeffaf biçimde paylaşılmasını ve
            üyelerimizin kolay erişimini sağlayacak şekilde yapılandırılmıştır.
          </p>
        </div>
      </div>
    </main>
  );
}
