-- Run in the Supabase SQL editor to create the jobs table.
create table if not exists public.jobs (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    company text not null,
    location text not null,
    job_type text,
    salary text,
    experience text,
    description text,
    image_url text,
    deadline date,
    created_at timestamptz default now()
);
alter table public.jobs enable row level security;
create policy "Anyone can view jobs" on public.jobs for select using (true);
create policy "Anyone can insert jobs" on public.jobs for insert with check (true);
create policy "Authenticated users can manage jobs" on public.jobs for all to authenticated using (true) with check (true);
