import SectionTitle from "../../../components/SectionTitle";

export const metadata = {
  title: "KVKK / Gizlilik",
  description: "Kişisel verilerin korunması ve gizlilik politikası.",
};

export default function PrivacyPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-4xl space-y-8 px-4">
        <SectionTitle
          eyebrow="KVKK / Gizlilik"
          title="Kişisel verilerin korunması"
          description="Veri güvenliği ve şeffaflık ilkeleri doğrultusunda hareket ederiz."
        />
        <div className="rounded-3xl border border-[#e5dfd8] bg-white p-8 text-sm text-[#5f677a]">
          <p>
            Federasyonumuz, kişisel verilerin korunmasına ilişkin yasal yükümlülükleri
            yerine getirir. Toplanan veriler yalnızca hizmet süreçleri ve
            bilgilendirme amaçlarıyla kullanılır.
          </p>
          <p className="mt-4">
            Detaylı KVKK metni ve aydınlatma politikası için kurumsal iletişim birimi
            ile iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </main>
  );
}
