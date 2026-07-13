-- Run in the Supabase SQL editor before using Careers.
create table if not exists public.careers (
  id bigint primary key generated always as identity,
  title text not null,
  company text not null,
  location text not null,
  type text not null,
  description text default '',
  created_at timestamptz not null default now()
);
alter table public.careers enable row level security;
create policy "Anyone can view careers" on public.careers for select using (true);
create policy "Authenticated users can manage careers" on public.careers for all to authenticated using (true) with check (true);
