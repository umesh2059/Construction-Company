-- Run in the Supabase SQL editor to create the site_images table.
-- This table stores image URLs for different sections (hero, team, about, etc.)
-- so admins can update images without touching code.

create table if not exists public.site_images (
    id uuid primary key default gen_random_uuid(),
    section text not null unique,
    image_url text not null,
    alt_text text default '',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

alter table public.site_images enable row level security;

create policy "Anyone can view site_images"
    on public.site_images for select
    using (true);

create policy "Authenticated users can manage site_images"
    on public site_images for all
    to authenticated
    using (true)
    with check (true);
