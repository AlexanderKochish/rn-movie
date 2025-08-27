alter table profiles
add column expo_push_token text,
add column marketing_emails boolean default false,
add column notifications boolean default false;
