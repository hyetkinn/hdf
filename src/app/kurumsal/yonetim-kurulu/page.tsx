import Image from "next/image";
import SectionTitle from "../../../components/SectionTitle";
import { getBoardMembers } from "../../../lib/content";

export const metadata = {
  title: "Yönetim Kurulu",
  description: "Federasyon yönetim kurulu ve başkanlık yapısı.",
};

export default async function BoardPage() {
  const members = await getBoardMembers();

  return (
    <main className="py-16">
      <div className="mx-auto max-w-6xl space-y-10 px-4">
        <SectionTitle
          eyebrow="Yönetim Kurulu"
          title="Güçlü liderlik, ortak akıl"
          description="Federasyonumuzun yönetim kadrosu derneklerimizin ortak iradesiyle oluşur."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <article
              key={member.id}
              className="rounded-3xl border border-[#e5dfd8] bg-white p-6 text-center"
            >
              <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full bg-[#f7f5f3]">
                <Image src={member.photo} alt={member.name} fill />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#1f2a44]">
                {member.name}
              </h3>
              <p className="text-sm text-[#5f677a]">{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
