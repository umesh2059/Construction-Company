import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Career } from "@/types/career";

type ApplicationData = { fullName: string; email: string; phone: string; location: string; experience: string; resumeUrl: string; profileUrl: string; message: string; consent: boolean };
const emptyForm: ApplicationData = { fullName: "", email: "", phone: "", location: "", experience: "", resumeUrl: "", profileUrl: "", message: "", consent: false };

const Apply = () => {
  const { id } = useParams();
  const [career, setCareer] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ApplicationData>(emptyForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const set = <K extends keyof ApplicationData>(key: K, value: ApplicationData[K]) => setForm((old) => ({ ...old, [key]: value }));
  const input = "mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100";

  useEffect(() => {
    if (!id) return;
    supabase.from("jobs").select("*").eq("id", id).single().then(({ data, error }) => {
      if (!error && data) setCareer(data);
      setLoading(false);
    });
  }, [id]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!career) return;
    setStatus("loading");
    const { error } = await supabase.from("job_applications").insert({
      career_id: career.id, job_title: career.title, company: career.company,
      applicant_name: form.fullName.trim(), email: form.email.trim(), phone: form.phone.trim(), location: form.location.trim(), experience: form.experience,
      resume_url: form.resumeUrl.trim(), portfolio_url: form.profileUrl.trim() || null, cover_letter: form.message.trim() || null,
    });
    setStatus(error ? "error" : "success");
  };

  if (loading) return <section className="mx-auto max-w-3xl px-6 py-20 text-center"><h1 className="font-display text-4xl font-bold">Loading...</h1></section>;
  if (!career) return <section className="mx-auto max-w-3xl px-6 py-20 text-center"><h1 className="font-display text-4xl font-bold">Career not found</h1><Link to="/careers" className="mt-6 inline-block rounded-full bg-slate-950 px-5 py-3 font-bold text-white">Browse careers</Link></section>;
  if (status === "success") return <section className="mx-auto max-w-2xl px-6 py-20"><div className="rounded-3xl border border-emerald-200 bg-white p-10 text-center shadow-sm"><CheckCircle2 className="mx-auto text-emerald-600" size={56} /><p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Application received</p><h1 className="mt-3 font-display text-4xl font-bold">Thank you, {form.fullName.split(" ")[0]}.</h1><p className="mt-4 leading-7 text-slate-600">Your application for {career.title} at {career.company} has been submitted. We will contact you if your profile is a match.</p><Link to="/careers" className="mt-8 inline-block rounded-full bg-slate-950 px-6 py-3 font-bold text-white">Explore more roles</Link></div></section>;

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <Link to={`/careers/${career.id}`} className="text-sm font-bold text-slate-600 hover:text-amber-700">
        &larr; Back to role
      </Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="h-fit rounded-3xl bg-slate-950 p-8 text-white">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
            You are applying for
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold capitalize">{career.title}</h1>
          <p className="mt-3 text-slate-300">{career.company}</p>
          <div className="mt-7 border-t border-white/15 pt-6 text-sm text-slate-300">
            <p>{career.location}</p>
            <p className="mt-2">{career.job_type}</p>
          </div>
          <p className="mt-8 text-sm leading-6 text-slate-400">
            Complete this form in about three minutes. Your details are sent directly to the hiring team.
          </p>
        </aside>
        <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-9">
          <h2 className="font-display text-2xl font-bold">Your application</h2>
          <p className="mt-1 text-sm text-slate-500">Fields marked * are required.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <label className="text-sm font-bold">
              Full name *
              <input required value={form.fullName} onChange={(e) => set("fullName", e.target.value)} className={input} placeholder="Your full name" />
            </label>
            <label className="text-sm font-bold">
              Email address *
              <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={input} placeholder="you@example.com" />
            </label>
            <label className="text-sm font-bold">
              Phone number *
              <input required type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={input} placeholder="Your contact number" />
            </label>
            <label className="text-sm font-bold">
              Current location *
              <input required value={form.location} onChange={(e) => set("location", e.target.value)} className={input} placeholder="City, State" />
            </label>
            <label className="text-sm font-bold">
              Relevant experience *
              <select required value={form.experience} onChange={(e) => set("experience", e.target.value)} className={input}>
                <option value="">Select experience</option>
                <option value="Fresher / Student">Fresher / Student</option>
                <option value="0-2 years">0-2 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="6+ years">6+ years</option>
              </select>
            </label>
            <label className="text-sm font-bold">
              Resume link *
              <input required type="url" value={form.resumeUrl} onChange={(e) => set("resumeUrl", e.target.value)} className={input} placeholder="Google Drive, Dropbox, etc." />
            </label>
            <label className="text-sm font-bold">
              Portfolio or LinkedIn
              <input type="url" value={form.profileUrl} onChange={(e) => set("profileUrl", e.target.value)} className={input} placeholder="https://" />
            </label>
            <label className="col-span-full text-sm font-bold">
              Why are you a good fit? <span className="font-normal text-slate-400">(optional)</span>
              <textarea rows={5} value={form.message} onChange={(e) => set("message", e.target.value)} className={input} placeholder="Share your relevant skills and experience." />
            </label>
          </div>
          {status === "error" && (
            <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              We could not submit your application right now. Please try again.
            </p>
          )}
          <label className="mt-6 flex items-start gap-3 text-sm text-slate-600">
            <input required type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-0.5 h-4 w-4 accent-amber-600" />
            I confirm my details are accurate and consent to their use for this recruitment process.
          </label>
          <button disabled={status === "loading"} type="submit" className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 font-bold text-slate-950 hover:bg-amber-400 disabled:opacity-60">
            <Send size={18} />
            {status === "loading" ? "Submitting application..." : "Submit application"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Apply;
