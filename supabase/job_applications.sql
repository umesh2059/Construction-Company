-- Run this in the Supabase SQL editor to save career applications.
create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  career_id uuid not null,
  job_title text not null,
  company text not null,
  applicant_name text not null,
  email text not null,
  phone text not null,
  location text not null,
  experience text not null,
  portfolio_url text,
  resume_url text not null,
  cover_letter text,
  created_at timestamptz not null default now()
);
alter table public.job_applications enable row level security;
create policy "Anyone can submit a job application" on public.job_applications for insert with check (true);
create policy "Authenticated users can view job applications" on public.job_applications for select to authenticated using (true);
