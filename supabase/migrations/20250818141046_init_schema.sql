-- ========================================
-- Таблица profiles + триггер на нового юзера
-- ========================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  username text unique,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ========================================
-- Таблица liked_movies
-- ========================================
create table if not exists public.liked_movies (
  user_id uuid not null references public.profiles(id) on delete cascade,
  movie_id bigint not null,
  created_at timestamptz not null default now(),
  primary key (user_id, movie_id)
);

alter table public.liked_movies enable row level security;

-- Политики доступа
create policy if not exists liked_select_own
on public.liked_movies
for select
to authenticated
using (auth.uid() = user_id);

create policy if not exists liked_insert_own
on public.liked_movies
for insert
to authenticated
with check (auth.uid() = user_id);

create policy if not exists liked_delete_own
on public.liked_movies
for delete
to authenticated
using (auth.uid() = user_id);

-- Добавляем jsonb колонку
alter table public.liked_movies add column if not exists data jsonb;

-- Индекс по movie_id
create index if not exists idx_liked_movies_movie on public.liked_movies (movie_id);

-- ========================================
-- Таблица bookmarks
-- ========================================
create table if not exists public.bookmarks (
  user_id uuid not null references public.profiles(id) on delete cascade,
  movie_id bigint not null,
  created_at timestamptz not null default now(),
  primary key (user_id, movie_id)
);

alter table public.bookmarks enable row level security;

-- Политики доступа
create policy if not exists bookmarks_select_own
on public.bookmarks
for select
to authenticated
using (auth.uid() = user_id);

create policy if not exists bookmarks_insert_own
on public.bookmarks
for insert
to authenticated
with check (auth.uid() = user_id);

create policy if not exists bookmarks_delete_own
on public.bookmarks
for delete
to authenticated
using (auth.uid() = user_id);

-- Добавляем jsonb колонку
alter table public.bookmarks add column if not exists data jsonb;

-- Индекс по movie_id
create index if not exists idx_bookmarks_movie on public.bookmarks (movie_id);

-- ========================================
-- Таблица reviews
-- ========================================
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  movie_id bigint not null,
  content text not null,
  rating int,
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

-- Политики доступа
create policy if not exists reviews_select_own
on public.reviews
for select
to authenticated
using (auth.uid() = user_id);

create policy if not exists reviews_insert_own
on public.reviews
for insert
to authenticated
with check (auth.uid() = user_id);

create policy if not exists reviews_update_own
on public.reviews
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy if not exists reviews_delete_own
on public.reviews
for delete
to authenticated
using (auth.uid() = user_id);

-- Индекс по movie_id
create index if not exists idx_reviews_movie on public.reviews (movie_id);
