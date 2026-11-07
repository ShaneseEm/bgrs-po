-- =====================================================================
-- BGRS Office of the President — News CMS schema
-- Run once in Supabase: Dashboard → SQL Editor → New query → paste → Run
-- Safe to re-run: every statement is idempotent.
-- =====================================================================

-- ---------- Staff allowed to manage news ----------
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  full_name  text,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- Helper used by every policy below
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

drop policy if exists "admins can read admin list" on public.admins;
create policy "admins can read admin list"
  on public.admins for select
  to authenticated
  using (public.is_admin());

-- ---------- News posts ----------
create table if not exists public.news (
  id            uuid primary key default gen_random_uuid(),
  category      text not null default 'press'
                check (category in ('press', 'cabinet', 'speech', 'development')),
  status        text not null default 'draft'
                check (status in ('draft', 'published')),
  published_at  timestamptz,                -- future date = scheduled
  featured      boolean not null default false,
  image_url     text,
  title_en      text not null,
  summary_en    text not null default '',
  body_en       text not null default '',
  title_am      text not null default '',
  summary_am    text not null default '',
  body_am       text not null default '',
  author_id     uuid references auth.users (id) on delete set null,
  author_email  text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists news_public_idx on public.news (status, published_at desc);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists news_touch_updated_at on public.news;
create trigger news_touch_updated_at
  before update on public.news
  for each row execute function public.touch_updated_at();

alter table public.news enable row level security;

-- Public visitors: only published posts whose publish time has passed
drop policy if exists "public reads published news" on public.news;
create policy "public reads published news"
  on public.news for select
  to anon, authenticated
  using (status = 'published' and published_at is not null and published_at <= now());

-- Staff: full access
drop policy if exists "admins read all news" on public.news;
create policy "admins read all news"
  on public.news for select to authenticated using (public.is_admin());

drop policy if exists "admins insert news" on public.news;
create policy "admins insert news"
  on public.news for insert to authenticated with check (public.is_admin());

drop policy if exists "admins update news" on public.news;
create policy "admins update news"
  on public.news for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete news" on public.news;
create policy "admins delete news"
  on public.news for delete to authenticated using (public.is_admin());

-- ---------- Photo storage ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('news-images', 'news-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public reads news images" on storage.objects;
create policy "public reads news images"
  on storage.objects for select
  using (bucket_id = 'news-images');

drop policy if exists "admins upload news images" on storage.objects;
create policy "admins upload news images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'news-images' and public.is_admin());

drop policy if exists "admins update news images" on storage.objects;
create policy "admins update news images"
  on storage.objects for update to authenticated
  using (bucket_id = 'news-images' and public.is_admin());

drop policy if exists "admins delete news images" on storage.objects;
create policy "admins delete news images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'news-images' and public.is_admin());

-- =====================================================================
-- Adding a staff member (repeat per person):
--   1. Dashboard → Authentication → Users → Add user → enter email + password
--      (tick "Auto Confirm User").
--   2. Run, replacing the email and name:
--
--   insert into public.admins (user_id, email, full_name)
--   select id, email, 'Full Name' from auth.users where email = 'staff@example.com'
--   on conflict (user_id) do nothing;
--
-- Removing a staff member:
--   delete from public.admins where email = 'staff@example.com';
-- =====================================================================
