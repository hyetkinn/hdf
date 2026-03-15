import type { ArchiveItem } from "../types/content";

export const archiveItems: ArchiveItem[] = [
  {
    id: "archive-1",
    title: "Çorum HDF 2024 Faaliyet Raporu",
    slug: "2024-faaliyet-raporu",
    type: "Rapor",
    year: 2024,
    tags: ["rapor", "faaliyet"],
    summary:
      "Federasyonun 2024 yılı boyunca yürüttüğü projeler ve saha faaliyetleri.",
    fileUrl: "/media/placeholder.pdf",
    coverImage: "/media/placeholder.svg",
  },
  {
    id: "archive-2",
    title: "Kültürel Miras ve Hafıza Çalışması",
    slug: "kulturel-miras-hafiza",
    type: "Belgesel",
    year: 2023,
    tags: ["belgesel", "kültür"],
    summary:
      "Çorum köylerinin sözlü tarih anlatıları ve dijital arşiv çalışması.",
    fileUrl: "/media/placeholder.pdf",
    coverImage: "/media/placeholder.svg",
  },
  {
    id: "archive-3",
    title: "Hak Savunuculuğu Basın Açıklaması",
    slug: "hak-savunuculugu-basin-aciklamasi",
    type: "Basın Açıklaması",
    year: 2025,
    tags: ["hukuk", "savunuculuk"],
    summary:
      "Kamu yararını ilgilendiren konuda ortak bildirimiz ve hukuki süreç.",
    fileUrl: "/media/placeholder.pdf",
    coverImage: "/media/placeholder.svg",
  },
];
