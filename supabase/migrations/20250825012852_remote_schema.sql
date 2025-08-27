drop extension if exists "pg_net";

drop index if exists "public"."idx_reviews_movie";

alter table "public"."reviews" drop column "content";

alter table "public"."reviews" drop column "created_at";

alter table "public"."reviews" add column "display_name" text;

alter table "public"."reviews" add column "email" text not null;

alter table "public"."reviews" add column "photo_url" text;

alter table "public"."reviews" add column "review" text;

alter table "public"."reviews" add column "updated_at" timestamp with time zone not null default now();

alter table "public"."reviews" alter column "movie_id" set default 0;

CREATE INDEX idx_reviews_movie ON public.reviews USING btree (id);


