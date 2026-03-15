import Image from "next/image";
import SectionTitle from "../../components/SectionTitle";
import DownloadButton from "../../components/DownloadButton";
import { mediaGallery, pressKit, youtubeVideos } from "../../data/media";

export const metadata = {
  title: "Medya",
  description: "Galeri, basın odası ve görsel arşiv içerikleri.",
};

export default function MediaPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-6xl space-y-12 px-4">
        <section id="galeri" className="space-y-6">
          <SectionTitle
            eyebrow="Medya"
            title="Fotoğraf ve video galerisi"
            description="Federasyon etkinliklerinden seçilmiş görseller."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {mediaGallery.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="relative h-48 overflow-hidden rounded-3xl bg-[#f7f5f3]"
              >
                <Image src={image} alt="Galeri görseli" fill className="object-cover" />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <SectionTitle
            eyebrow="Video"
            title="YouTube içerikleri"
            description="HDF etkinliklerinden seçili video kayıtları."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {youtubeVideos.map((video) => (
              <div
                key={video.title}
                className="overflow-hidden rounded-3xl border border-[#e5dfd8] bg-white"
              >
                <div className="aspect-video">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="px-4 py-3 text-sm font-semibold text-[#1f2a44]">
                  {video.title}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="basin-odasi" className="space-y-6">
          <SectionTitle
            eyebrow="Basın Odası"
            title="Press kit ve kurumsal materyaller"
            description="Logo, görsel ve basın bülteni dosyalarına erişim."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {pressKit.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between rounded-2xl border border-[#e5dfd8] bg-white px-4 py-3"
              >
                <span className="text-sm font-medium text-[#394256]">
                  {item.title}
                </span>
                <DownloadButton label="İndir" href={item.fileUrl} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
