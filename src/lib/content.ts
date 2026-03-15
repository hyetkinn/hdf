import { unstable_noStore as noStore } from "next/cache";
import { posts } from "../data/posts";
import { events } from "../data/events";
import { associations } from "./data/associations";
import { boardMembers } from "../data/people";
import { archiveItems } from "../data/archive";
import { readLocalDb } from "./localDb";

export const getPosts = async () => {
  noStore();
  const db = await readLocalDb();
  if (!db?.posts?.length) return posts;
  return db.posts as typeof posts;
};
export const getPostBySlug = async (slug: string) => {
  const list = await getPosts();
  const normalized = decodeURIComponent(slug).trim().toLowerCase();
  return (
    list.find((post) => post.slug?.toLowerCase?.() === normalized) ??
    list.find((post) => post.slug === slug) ??
    null
  );
};

export const getEvents = async () => {
  noStore();
  const db = await readLocalDb();
  if (!db?.events?.length) return events;
  return db.events as typeof events;
};
export const getEventBySlug = async (slug: string) => {
  const list = await getEvents();
  const normalized = decodeURIComponent(slug).trim().toLowerCase();
  return (
    list.find((event) => event.slug?.toLowerCase?.() === normalized) ??
    list.find((event) => event.slug === slug) ??
    null
  );
};

export const getAssociations = async () => {
  noStore();
  const db = await readLocalDb();
  if (!db?.associations?.length) return associations;
  return db.associations as typeof associations;
};
export const getAssociationBySlug = async (slug: string) => {
  const list = await getAssociations();
  const normalized = decodeURIComponent(slug).trim().toLowerCase();
  return (
    list.find((association) => association.slug?.toLowerCase?.() === normalized) ??
    list.find((association) => association.slug === slug) ??
    null
  );
};

export const getBoardMembers = async () => {
  noStore();
  const db = await readLocalDb();
  if (!db?.boardMembers?.length) return boardMembers;
  return db.boardMembers as typeof boardMembers;
};

export const getArchiveItems = async () => archiveItems;
export const getArchiveItemBySlug = async (slug: string) =>
  archiveItems.find((item) => item.slug === slug) ?? null;
