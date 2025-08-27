create table movie_notifications (
  id uuid default gen_random_uuid() primary key,
  tmdb_id integer not null,
  title text not null,
  release_date date,
  notification_sent_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

create table user_notification_subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  expo_push_token text not null,
  last_notification_sent_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  unique(user_id, expo_push_token)
);

create index idx_movie_notifications_tmdb_id on movie_notifications(tmdb_id);
create index idx_movie_notifications_sent_at on movie_notifications(notification_sent_at);

create index idx_user_subscriptions_user_id on user_notification_subscriptions(user_id);
create index idx_user_subscriptions_token on user_notification_subscriptions(expo_push_token);

create table notification_delivery_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  expo_push_token text not null,
  movie_notification_id uuid references movie_notifications(id) on delete cascade,
  status text not null,
  error_message text,
  created_at timestamp with time zone default now()
);

create table notification_clicks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  movie_notification_id uuid references movie_notifications(id) on delete cascade,
  click_time timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

alter table movie_notifications enable row level security;
alter table user_notification_subscriptions enable row level security;
alter table notification_delivery_logs enable row level security;
alter table notification_clicks enable row level security;

create policy "movie notifications are viewable by everyone" 
on movie_notifications for select using (true);

create policy "users can view their own subscriptions" 
on user_notification_subscriptions for select 
using (auth.uid() = user_id);

create policy "users can insert their own subscriptions" 
on user_notification_subscriptions for insert 
with check (auth.uid() = user_id);

create policy "users can update their own subscriptions" 
on user_notification_subscriptions for update 
using (auth.uid() = user_id);

create policy "only service role can access delivery logs" 
on notification_delivery_logs for all 
using (auth.role() = 'service_role');

create policy "only service role can access click logs" 
on notification_clicks for all 
using (auth.role() = 'service_role');