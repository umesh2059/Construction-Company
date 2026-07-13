import { useEffect, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarCheck, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase";

type EventInfo = { id: string; title: string; event_date: string; event_time: string | null; location: string | null };
type RegistrationForm = { name: string; email: string; phone: string; company: string; notes: string };
const emptyForm: RegistrationForm = { name: "", email: "", phone: "", company: "", notes: "" };
const formatDate = (date: string) => new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${date}T00:00:00`));

const EventRegistration = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<EventInfo | null>(null);
  const [form, setForm] = useState<RegistrationForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const loadEvent = async () => {
      const { data } = await supabase.from("events").select("id, title, event_date, event_time, location").eq("id", id).maybeSingle();
      setEvent(data as EventInfo | null);
      setLoading(false);
    };
    void loadEvent();
  }, [id]);

  const update = (field: keyof RegistrationForm, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true); setStatus("");
    const { error } = await supabase.from("event_registrations").insert({ event_id: id, attendee_name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() || null, company: form.company.trim() || null, notes: form.notes.trim() || null });
    setSaving(false);
    if (error) { setStatus("We could not save your registration. Please try again shortly."); return; }
    setForm(emptyForm); setStatus("You’re registered! We’ll contact you with the event details.");
  };

  if (loading) return <main className="min-h-screen bg-stone-50 px-6 py-16 text-slate-600">Loading event…</main>;
  if (!event) return <main className="min-h-screen bg-stone-50 px-6 py-16"><section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8"><h1 className="font-display text-3xl font-bold text-slate-950">Event not found</h1><Link to="/events" className="mt-5 inline-block font-bold text-amber-700">View all events</Link></section></main>;

  return <main className="min-h-screen bg-stone-50 px-6 py-12"><section className="mx-auto max-w-3xl">
    <Link to="/events" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-amber-700"><ArrowLeft size={16} />All events</Link>
    <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10"><div className="flex gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-950 text-amber-400"><CalendarCheck size={24} /></span><div><p className="font-mono text-xs font-bold uppercase tracking-wider text-amber-700">Event registration</p><h1 className="mt-1 font-display text-3xl font-bold text-slate-950">{event.title}</h1><p className="mt-2 text-sm text-slate-600">{formatDate(event.event_date)}{event.event_time && ` · ${event.event_time.slice(0, 5)}`}</p>{event.location && <p className="mt-1 flex items-center gap-1 text-sm text-slate-600"><MapPin size={14} />{event.location}</p>}</div></div>
    <form onSubmit={submit} className="mt-8 space-y-5"><div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-bold text-slate-700">Full name<input required value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600" placeholder="Your name" /></label><label className="block text-sm font-bold text-slate-700">Email address<input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600" placeholder="you@example.com" /></label></div>
    <div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-bold text-slate-700">Phone <span className="font-normal text-slate-500">(optional)</span><input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600" placeholder="Your phone number" /></label><label className="block text-sm font-bold text-slate-700">Company <span className="font-normal text-slate-500">(optional)</span><input value={form.company} onChange={(e) => update("company", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600" placeholder="Company name" /></label></div>
    <label className="block text-sm font-bold text-slate-700">Anything we should know? <span className="font-normal text-slate-500">(optional)</span><textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} className="mt-2 min-h-24 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600" placeholder="Questions, accessibility needs, or other notes" /></label>
    {status && <p className={`rounded-xl p-4 text-sm ${status.startsWith("You’re registered") ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>{status}</p>}
    <button disabled={saving} className="rounded-xl bg-slate-950 px-6 py-3 font-bold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60">{saving ? "Registering…" : "Register now"}</button></form></div>
  </section></main>;
};

export default EventRegistration;
