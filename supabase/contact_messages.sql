create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamp with time zone not null default now()
);

alter table public.contact_messages enable row level security;

create policy "Allow public inserts on contact_messages"
on public.contact_messages
for insert
to anon
with check (true);
