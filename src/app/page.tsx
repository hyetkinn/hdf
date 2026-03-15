import Link from "next/link";
import HeroSection from "../components/HeroSection";
import SectionTitle from "../components/SectionTitle";
import HomeAssociationSection from "../components/HomeAssociationSection";
import { EventCard, NewsCard } from "../components/cards";
import { getAssociations, getEvents, getPosts } from "../lib/content";
import { parseDateTime } from "../lib/date";
import sunImage from "../../sadece_güneş.png";

export default async function Home() {
  const [posts, events, associations] = await Promise.all([
    getPosts(),
    getEvents(),
    getAssociations(),
  ]);
  const upcomingEvents = [...events]
    .sort((a, b) => {
      const timeA = parseDateTime(a.startDateTime)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      const timeB = parseDateTime(b.startDateTime)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      return timeA - timeB;
    })
    .slice(0, 5);

  return (
    <main>
      <HeroSection
        title="Hitit Güneşi’nin Işığında, Ortak Bir Geleceğe."
        description="Köklü geçmişimizden aldığımız ilhamı, başkentin dinamizmiyle birleştirerek toplum için değer üretiyoruz."
        ctaPrimary={{ label: "Dernekleri Gör", href: "/dernekler" }}
        ctaSecondary={{ label: "Etkinlik Takvimi", href: "/etkinlikler" }}
        backgroundImage={sunImage}
      />

      <section className="py-16">
        <div className="mx-auto max-w-6xl space-y-8 px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionTitle
              eyebrow="Son Haberler"
              title="Güncel gelişmeler"
              description="Hitit mirası ve kültürel bellek odağında en yeni başlıklar."
            />
            <Link
              href="/haberler"
              className="rounded-full border border-[#d9d2cb] px-4 py-2 text-sm font-semibold text-[#394256] transition-colors hover:border-[#8f1e2d] hover:text-[#8f1e2d]"
            >
              Tüm Haberler
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf9f7] py-16">
        <div className="mx-auto max-w-6xl space-y-8 px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionTitle
              eyebrow="Yaklaşan Etkinlikler"
              title="Takvimde neler var?"
              description="Google Takvim entegrasyonuna hazır etkinlik akışı."
            />
            <Link
              href="/etkinlikler"
              className="rounded-full border border-[#d9d2cb] px-4 py-2 text-sm font-semibold text-[#394256] transition-colors hover:border-[#8f1e2d] hover:text-[#8f1e2d]"
            >
              Etkinlik Takvimi
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <SectionTitle
              eyebrow="Hitit Mirasının Ortak Evi"
                title="Güçlü Sivil Toplum, Kalıcı Kültürel Bellek"
                description="Kültürel bellek, dayanışma ve güçlü sivil toplum vizyonuyla ortak değerlerimizi büyütüyoruz."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { label: "Hakkımızda", href: "/kurumsal/hakkimizda" },
                { label: "Yönetim Kurulu", href: "/kurumsal/yonetim-kurulu" },
                { label: "Tüzük", href: "/kurumsal/tuzuk" },
                { label: "KVKK / Gizlilik", href: "/kurumsal/kvkk" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between rounded-2xl border border-[#e5dfd8] bg-white px-5 py-4 text-sm font-semibold text-[#394256]"
                >
                  {item.label}
                  <span className="text-[#8f1e2d]">→</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-[#e5dfd8] bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase text-[#8f1e2d]">Vizyon</p>
            <h3 className="mt-3 text-2xl font-semibold text-[#1f2a44]">
              Birliğimiz gücümüz, kültürümüz mirasımızdır.
            </h3>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf9f7] py-16">
        <div className="mx-auto max-w-6xl space-y-8 px-4" id="one-cikan">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionTitle
              eyebrow="Dernekler"
              title="Öne çıkan 90 dernek platformu"
              description="Derneklerimiz hakkında detaylara ulaşın, iletişim kurun."
            />
            <Link
              href="/dernekler"
              className="rounded-full border border-[#d9d2cb] px-4 py-2 text-sm font-semibold text-[#394256] transition-colors hover:border-[#8f1e2d] hover:text-[#8f1e2d]"
            >
              Tüm Dernekler
            </Link>
          </div>
          <HomeAssociationSection associations={associations} />
        </div>
      </section>
    </main>
  );
}
