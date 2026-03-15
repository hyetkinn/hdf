export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  date: string;
};

export type Event = {
  id: string;
  title: string;
  slug: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  posterImage: string;
  organizer: string;
};

export type SocialLinks = {
  website?: string;
  facebook?: string;
  instagram?: string;
  x?: string;
  twitter?: string;
  youtube?: string;
};

export type Association = {
  id: string;
  name: string;
  slug: string;
  president: string;
  district: string;
  city: string;
  phone?: string;
  email?: string;
  address?: string;
  description?: string;
  mapsLink?: string;
  mapsEmbedLink?: string;
  establishedYear?: string;
  socialLinks?: SocialLinks;
  galleryImages?: string[];
  announcements?: string[];
};

export type Person = {
  id: string;
  name: string;
  role: string;
  photo: string;
};

export type ArchiveItem = {
  id: string;
  title: string;
  slug: string;
  type: string;
  year: number;
  tags: string[];
  summary: string;
  fileUrl: string;
  coverImage?: string;
};
