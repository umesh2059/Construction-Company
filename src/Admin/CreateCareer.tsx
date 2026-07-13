import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase } from "lucide-react";
import { supabase } from "@/lib/supabase";

type CareerForm = { title: string; company: string; location: string; job_type: string; salary: string; experience: string; description: string; image_url: string; deadline: string };
const initialForm: CareerForm = { title: "", company: "", location: "", job_type: "Full Time", salary: "", experience: "", description: "", image_url: "", deadline: "" };

const CreateCareer = () => {
  const [form, setForm] = useState<CareerForm>(initialForm);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const update = (field: keyof CareerForm, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSaving(true); setStatus("");
    const { error } = await supabase.from("jobs").insert({
      title: form.title.trim(),
      company: form.company.trim(),
      location: form.location.trim(),
      job_type: form.job_type,
      salary: form.salary.trim() || null,
      experience: form.experience.trim() || null,
      description: form.description.trim() || null,
      image_url: form.image_url.trim() || null,
      deadline: form.deadline || null,
    });
    setSaving(false);
    if (error) { setStatus("Could not publish the job. Check the Supabase jobs table and admin access."); return; }
    setForm(initialForm); setStatus("Job published. It is now visible on the Careers page.");
  };
  return <main className="min-h-screen bg-stone-50 px-6 py-12"><section className="mx-auto max-w-3xl">
    <Link to="/admin" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-amber-700"><ArrowLeft size={16} />Admin dashboard</Link>
    <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10"><div className="flex items-start gap-4"><span className="grid h-12 w-12 place-items-center rounded-xl bg-slate-950 text-amber-400"><Briefcase size={24} /></span><div><p className="font-mono text-xs font-bold uppercase tracking-wider text-amber-700">Career management</p><h1 className="mt-1 font-display text-3xl font-bold text-slate-950">Publish a job</h1></div></div>
    <form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-sm font-bold text-slate-700">Job title<input required value={form.title} onChange={(e) => update("title", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600" placeholder="Frontend Developer" /></label>
    <label className="block text-sm font-bold text-slate-700">Company<input required value={form.company} onChange={(e) => update("company", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600" placeholder="ConstructionHub" /></label>
    <div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-bold text-slate-700">Location<input required value={form.location} onChange={(e) => update("location", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600" placeholder="Mumbai, Maharashtra" /></label><label className="block text-sm font-bold text-slate-700">Job type<select value={form.job_type} onChange={(e) => update("job_type", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600"><option>Full Time</option><option>Part Time</option><option>Internship</option><option>Contract</option><option>Remote</option></select></label></div>
    <div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-bold text-slate-700">Salary <span className="font-normal text-slate-500">(optional)</span><input value={form.salary} onChange={(e) => update("salary", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600" placeholder="₹6,00,000 – ₹9,00,000" /></label><label className="block text-sm font-bold text-slate-700">Experience <span className="font-normal text-slate-500">(optional)</span><input value={form.experience} onChange={(e) => update("experience", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600" placeholder="2-4 years" /></label></div>
    <div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-bold text-slate-700">Image URL <span className="font-normal text-slate-500">(optional)</span><input type="url" value={form.image_url} onChange={(e) => update("image_url", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600" placeholder="https://…" /></label><label className="block text-sm font-bold text-slate-700">Deadline <span className="font-normal text-slate-500">(optional)</span><input type="date" value={form.deadline} onChange={(e) => update("deadline", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600" /></label></div>
    <label className="block text-sm font-bold text-slate-700">Description <span className="font-normal text-slate-500">(optional)</span><textarea value={form.description} onChange={(e) => update("description", e.target.value)} className="mt-2 min-h-28 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600" placeholder="Describe the role, responsibilities, and requirements." /></label>
    {status && <p className={`rounded-xl p-4 text-sm ${status.startsWith("Job published") ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>{status}</p>}
    <button disabled={saving} className="rounded-xl bg-slate-950 px-6 py-3 font-bold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60">{saving ? "Publishing…" : "Publish job"}</button></form></div>
  </section></main>;
};

export default CreateCareer;
