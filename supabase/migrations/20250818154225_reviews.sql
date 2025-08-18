create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  movie_id bigint not null default 0,
  photo_url text,
  display_name text,
  email text not null,
  rating int,
  review text,
  updated_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

-- Политики доступа
create policy "reviews_select_own"
on public.reviews
for select
to authenticated
using (auth.uid() = user_id);

create policy "reviews_insert_own"
on public.reviews
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "reviews_update_own"
on public.reviews
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "reviews_delete_own"
on public.reviews
for delete
to authenticated
using (auth.uid() = user_id);

-- Индекс для быстрого поиска по movie_id (если понадобится)
create index if not exists idx_reviews_movie on public.reviews (id);
