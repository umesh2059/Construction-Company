import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Building2, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { uploadImage } from "@/lib/storage";

type ProjectForm = {
  title: string;
  location: string;
  status: string;
  description: string;
};

const initialForm: ProjectForm = {
  title: "",
  location: "",
  status: "Planning",
  description: "",
};

const CreateProject = () => {
  const [form, setForm] = useState<ProjectForm>(initialForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const update = (field: keyof ProjectForm, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    let imageUrl = "";
    if (imageFile) {
      try {
        imageUrl = await uploadImage(imageFile, "projects");
      } catch {
        setStatus("Image upload failed. Check Supabase storage setup.");
        setSaving(false);
        return;
      }
    }

    const { error } = await supabase.from("projects").insert({
      title: form.title.trim(),
      location: form.location.trim(),
      status: form.status,
      description: form.description.trim() || null,
      image: imageUrl || null,
    });

    setSaving(false);
    if (error) {
      console.error("PROJECT INSERT ERROR:",error);
      setStatus(error.message);
      return;
    }
    setForm(initialForm);
    setImageFile(null);
    setImagePreview("");
    setStatus("Project published. It is now visible on the Projects page.");
  };

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-12">
      <section className="mx-auto max-w-3xl">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-amber-700"
        >
          <ArrowLeft size={16} />Admin dashboard
        </Link>

        <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-slate-950 text-amber-400">
              <Building2 size={24} />
            </span>
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-amber-700">
                Project management
              </p>
              <h1 className="mt-1 font-display text-3xl font-bold text-slate-950">
                Publish a Project
              </h1>
            </div>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block text-sm font-bold text-slate-700">
              Project title
              <input
                required
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600"
                placeholder="Highway Expansion Project"
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-bold text-slate-700">
                Location
                <input
                  required
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600"
                  placeholder="Delhi, India"
                />
              </label>

              <label className="block text-sm font-bold text-slate-700">
                Status
                <select
                  value={form.status}
                  onChange={(e) => update("status", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600"
                >
                  <option>Planning</option>
                  <option>Ongoing</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </select>
              </label>
            </div>

            <label className="block text-sm font-bold text-slate-700">
              Description <span className="font-normal text-slate-500">(optional)</span>
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                className="mt-2 min-h-28 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-600"
                placeholder="Describe the project scope, timeline, and key details."
              />
            </label>

            <label className="block text-sm font-bold text-slate-700">
              Project Image <span className="font-normal text-slate-500">(optional)</span>
              <div className="mt-2">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mb-3 h-40 w-full rounded-xl object-cover"
                  />
                )}
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50">
                  <Upload size={16} />
                  {imageFile ? "Change Image" : "Upload Image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageSelect}
                  />
                </label>
              </div>
            </label>

            {status && (
              <p
                className={`rounded-xl p-4 text-sm ${
                  status.startsWith("Project published")
                    ? "bg-emerald-50 text-emerald-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {status}
              </p>
            )}

            <button
              disabled={saving}
              className="rounded-xl bg-slate-950 px-6 py-3 font-bold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Publishing…" : "Publish Project"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CreateProject;
