-- Run this in Supabase SQL editor to lock down admin operations
-- Only authenticated users (admin@susta.com) can modify data

-- Fix: Remove public insert on events (only admin can create events)
drop policy if exists "Anyone can insert events" on public.events;
create policy "Authenticated users can insert events" on public.events for insert to authenticated using (true) with check (true);

-- Fix: Remove public insert on jobs (only admin can create jobs)
drop policy if exists "Anyone can insert jobs" on public.jobs;
create policy "Authenticated users can insert jobs" on public.jobs for insert to authenticated using (true) with check (true);

-- Note: Public can still INSERT on event_registrations and job_applications (needed for public forms)
-- Public can still SELECT on careers, events, jobs, site_images (needed for public viewing)
