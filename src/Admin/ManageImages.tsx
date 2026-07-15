import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Image, Upload, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { uploadImage, deleteImage } from "@/lib/storage";
import type { SiteImage } from "@/types/site_images";

const SECTIONS = [
  { key: "hero_bg", label: "Hero Background", defaultUrl: "https://images.unsplash.com/photo-1541888946425-d81bb68c7b4f?w=1600&q=80", alt: "Road construction site" },
  { key: "join_team", label: "Join Our Team", defaultUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80", alt: "Construction team working together" },
  { key: "about_hero", label: "About Section", defaultUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80", alt: "Construction workers on site" },
];

const ManageImages = () => {
  const [images, setImages] = useState<Record<string, SiteImage>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    supabase.from("site_images").select("*").then(({ data }) => {
      if (data) {
        const map: Record<string, SiteImage> = {};
        data.forEach((img) => { map[img.section] = img; });
        setImages(map);
      }
    });
  }, []);

  const currentUrl = (section: string) =>
    images[section]?.image_url || SECTIONS.find((s) => s.key === section)?.defaultUrl || "";

  const handleUpload = async (section: string, file: File) => {
    setUploading(section);
    setStatus("");
    try {
      const imageUrl = await uploadImage(file, "sections");

      const existing = images[section];
      if (existing) {
        if (existing.image_url) await deleteImage(existing.image_url);
        await supabase.from("site_images").update({ image_url: imageUrl, alt_text: file.name }).eq("id", existing.id);
      } else {
        await supabase.from("site_images").insert({ section, image_url: imageUrl, alt_text: file.name });
      }

      setImages((prev) => ({
        ...prev,
        [section]: { ...prev[section], image_url: imageUrl, alt_text: file.name } as SiteImage,
      }));
      setStatus("Image updated successfully.");
    } catch (err: unknown) {
      setStatus(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(null);
    }
  };

  const handleReset = async (section: string) => {
    setStatus("");
    const existing = images[section];
    if (existing?.image_url) await deleteImage(existing.image_url);

    await supabase.from("site_images").delete().eq("section", section);
    setImages((prev) => {
      const next = { ...prev };
      delete next[section];
      return next;
    });
    setStatus("Reset to default image.");
  };

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-12">
      <section className="mx-auto max-w-3xl">
        <Link to="/admin" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-amber-700">
          <ArrowLeft size={16} />Admin dashboard
        </Link>

        <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-slate-950 text-amber-400">
              <Image size={24} />
            </span>
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-amber-700">Media management</p>
              <h1 className="mt-1 font-display text-3xl font-bold text-slate-950">Manage Images</h1>
              <p className="mt-2 text-slate-500">Upload or replace images for different sections of the website.</p>
            </div>
          </div>

          {status && (
            <p className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">{status}</p>
          )}

          <div className="mt-8 space-y-8">
            {SECTIONS.map(({ key, label, alt }) => (
              <div key={key} className="rounded-xl border border-slate-200 p-5">
                <h3 className="font-display text-lg font-bold text-slate-900">{label}</h3>

                <div className="mt-3 overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={currentUrl(key)}
                    alt={alt}
                    className="h-48 w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/800x400?text=${label}`;
                    }}
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-amber-600">
                    <Upload size={16} />
                    {uploading === key ? "Uploading..." : "Upload Image"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading === key}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUpload(key, file);
                      }}
                    />
                  </label>

                  {images[key] && (
                    <button
                      onClick={() => handleReset(key)}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={16} /> Reset to default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ManageImages;
