import DownloadButton from "../../../components/DownloadButton";
import SectionTitle from "../../../components/SectionTitle";

export const metadata = {
  title: "Tüzük",
  description: "Federasyon tüzüğü ve mevzuat belgeleri.",
};

export default function TuzukPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-4xl space-y-8 px-4">
        <SectionTitle
          eyebrow="Tüzük"
          title="Kurumsal mevzuat"
          description="Federasyonun resmi tüzüğüne ve ilgili belgelere buradan erişebilirsiniz."
        />
        <div className="rounded-3xl border border-[#e5dfd8] bg-white p-8 text-sm text-[#5f677a]">
          <p>
            Tüzük metni ve mevzuat düzenlemeleri dijital arşivde güncel tutulur.
            Yeni sürümler yayınlandıkça buradan erişilebilir.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <DownloadButton label="Tüzük PDF" href="/media/placeholder.pdf" />
            <DownloadButton label="Mevzuat Ekleri" href="/media/placeholder.pdf" />
          </div>
        </div>
      </div>
    </main>
  );
}
