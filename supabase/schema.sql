create extension if not exists "uuid-ossp";

create table if not exists public.posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_image text,
  category text,
  tags text[],
  published_at timestamptz default now()
);

create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  description text,
  start_datetime timestamptz,
  end_datetime timestamptz,
  location text,
  poster_image text,
  organizer text
);

create table if not exists public.board_members (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role text not null,
  photo_url text,
  sort_order int default 0
);

create table if not exists public.associations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  president text,
  district text,
  city text,
  phone text,
  email text,
  address text
);

create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  username text not null unique,
  email text not null unique,
  created_at timestamptz default now()
);

alter table public.posts enable row level security;
alter table public.events enable row level security;
alter table public.board_members enable row level security;
alter table public.associations enable row level security;
alter table public.profiles enable row level security;

create policy "read posts" on public.posts for select using (true);
create policy "read events" on public.events for select using (true);
create policy "read board" on public.board_members for select using (true);
create policy "read associations" on public.associations for select using (true);
create policy "read profiles" on public.profiles for select using (true);

create policy "write posts" on public.posts
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "write events" on public.events
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "write board" on public.board_members
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "write associations" on public.associations
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "write profiles" on public.profiles
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into public.board_members (name, role, photo_url, sort_order) values
('Özgür Ardıç', 'Başkan', '/media/placeholder.svg', 1),
('Ali Deniz', 'Başkan Yrd.', '/media/placeholder.svg', 2),
('Cem Aykaç', 'Başkan Yrd.', '/media/placeholder.svg', 3),
('Ferit Ercan', 'Genel Sekreter', '/media/placeholder.svg', 4),
('Ali Ulusoy', 'Genel Sekreter Yrd.', '/media/placeholder.svg', 5),
('Müslüm Civaş', 'Sayman', '/media/placeholder.svg', 6),
('İsmet Harputlu', 'Sayman Yrd.', '/media/placeholder.svg', 7),
('Gül Sağdıç Tuncar', 'Kadın Konseyi', '/media/placeholder.svg', 8),
('Sibel Emre', 'Sağlık Konseyi', '/media/placeholder.svg', 9),
('Satı Gül', 'Sosyal Örgütlenme Konseyi', '/media/placeholder.svg', 10),
('Fatma Gündoğan', 'Eğitim Konseyi', '/media/placeholder.svg', 11),
('Aziz Aykaç', 'Köy Sorunları Konseyi', '/media/placeholder.svg', 12),
('Muharrem Söylemez', 'Siyasi Konsey', '/media/placeholder.svg', 13),
('Haydar Kılıç', 'Spor Konseyi', '/media/placeholder.svg', 14),
('Hüseyin Bahadır', 'Bürokrat Konseyi', '/media/placeholder.svg', 15),
('Ali Güvenbaş', 'Hukuk Konseyi', '/media/placeholder.svg', 16),
('Ali Şahin', 'STK ve Odalar Konseyi', '/media/placeholder.svg', 17),
('Hüseyin Yetkin Türkmen', 'Basın Konseyi', '/media/placeholder.svg', 18),
('Yusuf Başıböyük', 'İş İnsanları Konseyi', '/media/placeholder.svg', 19),
('Cem Hökelek', 'Gençlik Konseyi', '/media/placeholder.svg', 20);

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict do nothing;

create policy "public media" on storage.objects
  for select using (bucket_id = 'media');

create policy "auth media insert" on storage.objects
  for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "auth media update" on storage.objects
  for update using (bucket_id = 'media' and auth.role() = 'authenticated')
  with check (bucket_id = 'media' and auth.role() = 'authenticated');
