-- Run in the Supabase SQL editor before using Events.
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date not null,
  event_time time,
  location text,
  image_url text,
  created_at timestamptz not null default now()
);
alter table public.events enable row level security;
create policy "Anyone can view events" on public.events for select using (true);
create policy "Authenticated users can manage events" on public.events for all to authenticated using (true) with check (true);

-- Stores public attendee registrations. Run this section in the same SQL editor.
create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  attendee_name text not null,
  email text not null,
  phone text,
  company text,
  notes text,
  created_at timestamptz not null default now()
);
alter table public.event_registrations enable row level security;
create policy "Anyone can register for an event" on public.event_registrations for insert with check (true);
create policy "Authenticated users can view registrations" on public.event_registrations for select to authenticated using (true);
