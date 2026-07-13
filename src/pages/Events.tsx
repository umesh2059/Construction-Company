import { useEffect, useState } from "react";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

type Event = { id: string; title: string; description: string | null; event_date: string; event_time: string | null; location: string | null; image_url: string | null };
const formatDate = (date: string) => new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${date}T00:00:00`));

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      const { data, error: fetchError } = await supabase.from("events").select("*").order("event_date", { ascending: true });
      if (fetchError) setError("Events are not available yet. Please check back soon.");
      else setEvents((data ?? []) as Event[]);
      setLoading(false);
    };
    void loadEvents();
  }, []);

  return <main className="min-h-screen bg-stone-50 px-6 py-16"><section className="mx-auto max-w-7xl">
    <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-amber-700">Community calendar</p>
    <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">Upcoming events</h1>
    <p className="mt-5 max-w-2xl text-lg text-slate-600">Meet the people building the future of construction. Join workshops, site visits, and industry conversations.</p>
    {loading && <p className="mt-12 text-slate-600">Loading events…</p>}
    {error && <p className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-950">{error}</p>}
    {!loading && !error && events.length === 0 && <p className="mt-12 rounded-xl border border-slate-200 bg-white p-8 text-slate-600">No events have been announced yet. Please check back soon.</p>}
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{events.map((event) => <article key={event.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {event.image_url ? <img src={event.image_url} alt="" className="h-48 w-full object-cover" /> : <div className="grid h-48 place-items-center bg-slate-950 text-amber-400"><CalendarDays size={42} /></div>}
      <div className="p-6"><p className="font-mono text-xs font-bold uppercase tracking-wider text-amber-700">{formatDate(event.event_date)}</p><h2 className="mt-3 font-display text-2xl font-bold text-slate-950">{event.title}</h2>
      {event.description && <p className="mt-3 text-sm leading-6 text-slate-600">{event.description}</p>}
      <div className="mt-5 space-y-2 text-sm text-slate-600">{event.event_time && <p className="flex items-center gap-2"><Clock3 size={16} className="text-amber-700" />{event.event_time.slice(0, 5)}</p>}{event.location && <p className="flex items-center gap-2"><MapPin size={16} className="text-amber-700" />{event.location}</p>}</div>
      <Link to={`/events/${event.id}/register`} className="mt-6 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-amber-600">Register to attend</Link></div>
    </article>)}</div>
  </section></main>;
};
export default Events;
