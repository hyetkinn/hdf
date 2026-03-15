import type { MetadataRoute } from "next";
import { getArchiveItems, getAssociations, getEvents, getPosts } from "../lib/content";
import { siteConfig } from "../lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, events, associations, archiveItems] = await Promise.all([
    getPosts(),
    getEvents(),
    getAssociations(),
    getArchiveItems(),
  ]);

  const staticRoutes = [
    "",
    "/kurumsal",
    "/kurumsal/hakkimizda",
    "/kurumsal/yonetim-kurulu",
    "/kurumsal/tuzuk",
    "/kurumsal/kvkk",
    "/dernekler",
    "/haberler",
    "/etkinlikler",
    "/medya",
    "/arsiv",
    "/is-birligi",
    "/iletisim",
    "/uye-girisi",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/haberler/${post.slug}`,
      lastModified: new Date(post.date),
    })),
    ...events.map((event) => ({
      url: `${siteConfig.url}/etkinlikler/${event.slug}`,
      lastModified: new Date(event.startDateTime),
    })),
    ...associations.map((association) => ({
      url: `${siteConfig.url}/dernekler/${association.slug}`,
      lastModified: new Date(),
    })),
    ...archiveItems.map((item) => ({
      url: `${siteConfig.url}/arsiv/${item.slug}`,
      lastModified: new Date(item.year, 0, 1),
    })),
  ];
}
