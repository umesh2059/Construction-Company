import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import { supabase } from "@/lib/supabase";

type EventForm = { title: string; description: string; event_date: string; event_time: string; location: string; image_url: string };
const initialForm: EventForm = { title: "", description: "", event_date: "", event_time: "", location: "", image_url: "" };

const CreateEvent = () => {
  const [form, setForm] = useState<EventForm>(initialForm);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const update = (field: keyof EventForm, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSaving(true); setStatus("");
    const { error } = await supabase.from("events").insert({ title: form.title.trim(), description: form.description.trim() || null, event_date: form.event_date, event_time: form.event_time || null, location: form.location.trim() || null, image_url: form.image_url.trim() || null });
    setSaving(false);
    if (error) { setStatus("Could not publish the event. Check the Supabase events table and admin access."); return; }
    setForm(initialForm); setStatus("Event published. It is now visible on the Events page.");
  };
  return <main className="min-h-screen bg-stone-50 px-6 py-12"><section className="mx-auto max-w-3xl">
    <Link to="/admin" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-amber-700"><ArrowLeft size={16} />Admin dashboard</Link>
    <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10"><div className="flex items-start gap-4"><span className="grid h-12 w-12 place-items-center rounded-xl bg-slate-950 text-amber-400"><CalendarPlus size={24} /></span><div><p className="font-mono text-xs font-bold uppercase tracking-wider text-amber-700">Event management</p><h1 className="mt-1 font-display text-3xl font-bold text-slate-950">Publish an event</h1></div></div>
    <form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-sm font-bold text-slate-700">Event title<input required value={form.title} onChange={(e) => update("title", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600" placeholder="Construction leadership summit" /></label>
    <label className="block text-sm font-bold text-slate-700">Description<textarea value={form.description} onChange={(e) => update("description", e.target.value)} className="mt-2 min-h-28 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600" placeholder="Tell visitors what to expect." /></label>
    <div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-bold text-slate-700">Date<input required type="date" value={form.event_date} onChange={(e) => update("event_date", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600" /></label><label className="block text-sm font-bold text-slate-700">Time<input type="time" value={form.event_time} onChange={(e) => update("event_time", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600" /></label></div>
    <label className="block text-sm font-bold text-slate-700">Location<input value={form.location} onChange={(e) => update("location", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600" placeholder="Mumbai, Maharashtra" /></label>
    <label className="block text-sm font-bold text-slate-700">Cover image URL <span className="font-normal text-slate-500">(optional)</span><input type="url" value={form.image_url} onChange={(e) => update("image_url", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600" placeholder="https://…" /></label>
    {status && <p className={`rounded-xl p-4 text-sm ${status.startsWith("Event published") ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>{status}</p>}
    <button disabled={saving} className="rounded-xl bg-slate-950 px-6 py-3 font-bold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60">{saving ? "Publishing…" : "Publish event"}</button></form></div>
  </section></main>;
};

export default CreateEvent;
