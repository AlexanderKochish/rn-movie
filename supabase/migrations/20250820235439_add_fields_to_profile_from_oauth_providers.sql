create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, username, avatar_url, full_name)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data->>'user_name',
      new.raw_user_meta_data->>'name',
      ''
    ),
    coalesce(
      new.raw_user_meta_data->>'avatar_url',
      new.raw_user_meta_data->>'photo_url',
      ''
    ),
    coalesce(new.raw_user_meta_data->>'full_name', '')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Обновляем триггер
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
