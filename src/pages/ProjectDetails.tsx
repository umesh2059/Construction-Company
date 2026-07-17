import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Clock,
  CheckCircle2,
  Building2,
  Ruler,
  Calendar,
  Users,
  Shield,
  ChevronRight,
  ExternalLink,
  Share2,
  Download,
  Phone,
  Mail,
  BarChart3,
  HardHat,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { projects as fallbackProjects } from "@/data/Projects";

type Project = {
  id: number;
  title: string;
  location: string;
  status: string;
  description: string | null;
  image: string | null;
  created_at: string;
};

const statusConfig: Record<string, { label: string; color: string; progress: number; icon: typeof Clock }> = {
  Planning: { label: "Planning Phase", color: "bg-blue-500", progress: 15, icon: Clock },
  Ongoing: { label: "In Progress", color: "bg-amber-500", progress: 55, icon: BarChart3 },
  Completed: { label: "Completed", color: "bg-emerald-500", progress: 100, icon: CheckCircle2 },
  "On Hold": { label: "On Hold", color: "bg-red-500", progress: 30, icon: Shield },
};

const highlights = [
  { label: "Total Area", value: "10,000 sq ft", icon: Ruler },
  { label: "Timeline", value: "18 Months", icon: Calendar },
  { label: "Workforce", value: "150+ Workers", icon: Users },
  { label: "Safety Rating", value: "A+ Grade", icon: Shield },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
  "https://images.unsplash.com/photo-1541888946425-d81bb68c7b4f?w=800&q=80",
  "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
];

const milestones = [
  { phase: "Foundation", date: "Q1 2025", status: "completed" },
  { phase: "Structural Framing", date: "Q2 2025", status: "completed" },
  { phase: "MEP Installation", date: "Q3 2025", status: "in-progress" },
  { phase: "Interior Finishing", date: "Q4 2025", status: "pending" },
  { phase: "Handover", date: "Q1 2026", status: "pending" },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Ongoing":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "Completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Planning":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "On Hold":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [showAllMilestones, setShowAllMilestones] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();
      if (error || !data) {
        const fallback = fallbackProjects.find((p) => p.id === Number(id));
        if (fallback) {
          setProject({ ...fallback, created_at: new Date().toISOString() });
        }
      } else {
        setProject(data as Project);
      }
      setLoading(false);
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
          <p className="text-sm font-medium text-slate-500">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6">
        <div className="text-center">
          <Building2 size={64} className="mx-auto text-slate-300" />
          <h1 className="mt-6 text-4xl font-bold text-slate-900">Project Not Found</h1>
          <p className="mt-2 text-slate-500">The project you're looking for doesn't exist.</p>
          <Link
            to="/projects"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-bold text-white transition hover:bg-amber-600"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  const config = statusConfig[project.status] || statusConfig.Planning;
  const StatusIcon = config.icon;
  const visibleMilestones = showAllMilestones ? milestones : milestones.slice(0, 3);

  return (
    <main className="min-h-screen bg-stone-50">
      {/* ── Hero Section ── */}
      <section className="relative h-[50vh] min-h-[320px] md:h-[65vh]">
        <div className="absolute inset-0">
          <img
            src={project.image || "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=80"}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-transparent" />
        </div>

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-10 md:pb-16">
          <Link
            to="/projects"
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <ArrowLeft size={14} />
            Back to Projects
          </Link>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${getStatusStyle(project.status)}`}
              >
                <StatusIcon size={14} />
                {config.label}
              </span>
              <h1 className="mt-4 text-3xl font-bold text-white md:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-3 flex items-center gap-2 text-base text-white/80 md:text-lg">
                <MapPin size={18} />
                {project.location}
              </p>
            </div>

            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20">
                <Share2 size={16} />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-400">
                <Download size={16} />
                <span className="hidden sm:inline">Brochure</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6">
        {/* ── Progress & Stats Bar ── */}
        <section className="-mt-8 relative z-10 mb-12 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg md:grid-cols-3 md:p-8">
          <div className="md:col-span-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-slate-500">Project Progress</p>
              <span className="text-sm font-bold text-slate-900">{config.progress}%</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${config.color}`}
                style={{ width: `${config.progress}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-slate-500">
              {project.status === "Completed"
                ? "This project has been successfully completed."
                : project.status === "Ongoing"
                  ? "Construction is actively underway with regular progress updates."
                  : project.status === "Planning"
                    ? "Project is in the planning and design phase."
                    : "Project is currently on hold."}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 border-t border-slate-100 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Start Date</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-slate-900">
                <Calendar size={14} className="text-amber-500" />
                {new Date(project.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Project ID</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-slate-900">
                <HardHat size={14} className="text-amber-500" />
                #{project.id}
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          {/* ── Main Content ── */}
          <div className="lg:col-span-2">
            {/* About */}
            <section>
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
                About This Project
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-slate-600 md:text-lg">
                <p>
                  {project.description ||
                    "A landmark construction project that showcases excellence in modern engineering and sustainable building practices. This development represents a significant investment in infrastructure and community growth."}
                </p>
                <p>
                  Our team of experienced professionals is dedicated to delivering exceptional quality,
                  adhering to the highest safety standards, and completing the project within the
                  stipulated timeline. Every phase is carefully planned and executed with precision.
                </p>
              </div>
            </section>

            {/* Key Highlights */}
            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
                Key Highlights
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                {highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="rounded-xl border border-slate-200 bg-white p-4 transition hover:shadow-md md:p-5"
                    >
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-amber-100 text-amber-600">
                        <Icon size={20} />
                      </div>
                      <p className="mt-3 text-lg font-bold text-slate-900">{item.value}</p>
                      <p className="text-sm text-slate-500">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Timeline / Milestones */}
            <section className="mt-12">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
                  Project Timeline
                </h2>
                {milestones.length > 3 && (
                  <button
                    onClick={() => setShowAllMilestones(!showAllMilestones)}
                    className="text-sm font-bold text-amber-600 transition hover:text-amber-700"
                  >
                    {showAllMilestones ? "Show Less" : "View All"}
                  </button>
                )}
              </div>
              <div className="mt-6 space-y-0">
                {visibleMilestones.map((ms, idx) => (
                  <div key={ms.phase} className="relative flex gap-5 pb-8 last:pb-0">
                    {idx < visibleMilestones.length - 1 && (
                      <div className="absolute left-[17px] top-10 h-full w-0.5 bg-slate-200" />
                    )}
                    <div
                      className={`relative z-10 mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 text-xs font-bold ${
                        ms.status === "completed"
                          ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                          : ms.status === "in-progress"
                            ? "border-amber-500 bg-amber-50 text-amber-600"
                            : "border-slate-300 bg-white text-slate-400"
                      }`}
                    >
                      {ms.status === "completed" ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-bold text-slate-900">{ms.phase}</p>
                      <p className="mt-0.5 text-sm text-slate-500">{ms.date}</p>
                      <span
                        className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                          ms.status === "completed"
                            ? "bg-emerald-50 text-emerald-600"
                            : ms.status === "in-progress"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {ms.status === "completed"
                          ? "Completed"
                          : ms.status === "in-progress"
                            ? "In Progress"
                            : "Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery */}
            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
                Project Gallery
              </h2>
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                <div className="relative aspect-video bg-slate-100">
                  <img
                    src={galleryImages[activeGalleryIdx]}
                    alt={`Gallery ${activeGalleryIdx + 1}`}
                    className="h-full w-full object-cover transition-opacity duration-500"
                  />
                  <div className="absolute bottom-3 right-3 rounded-lg bg-slate-900/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                    {activeGalleryIdx + 1} / {galleryImages.length}
                  </div>
                </div>
                <div className="flex gap-2 overflow-x-auto bg-white p-3">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveGalleryIdx(idx)}
                      className={`shrink-0 overflow-hidden rounded-lg border-2 transition ${
                        idx === activeGalleryIdx
                          ? "border-amber-500 ring-2 ring-amber-200"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumb ${idx + 1}`}
                        className="h-16 w-20 object-cover md:h-20 md:w-24"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Contact Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Get in Touch
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Interested in this project? Contact our team for more details.
                </p>
                <div className="mt-5 space-y-3">
                  <a
                    href="tel:+911234567890"
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm font-bold text-slate-700 transition hover:border-amber-200 hover:bg-amber-50"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-100 text-amber-600">
                      <Phone size={16} />
                    </span>
                    +977 9867487047
                  </a>
                  <a
                    href="mailto:projects@construct.com"
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm font-bold text-slate-700 transition hover:border-amber-200 hover:bg-amber-50"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-100 text-amber-600">
                      <Mail size={16} />
                    </span>
                    umeshg2059@gmail.com
                  </a>
                  <Link
                    to="/contact"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-amber-600"
                  >
                    Send Inquiry
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Quick Info */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Quick Info
                </h3>
                <dl className="mt-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <dt className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin size={14} />
                      Location
                    </dt>
                    <dd className="text-right text-sm font-bold text-slate-900">
                      {project.location}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <dt className="flex items-center gap-2 text-sm text-slate-500">
                      <Building2 size={14} />
                      Status
                    </dt>
                    <dd className="text-right text-sm font-bold text-slate-900">
                      {project.status}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <dt className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar size={14} />
                      Started
                    </dt>
                    <dd className="text-right text-sm font-bold text-slate-900">
                      {new Date(project.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-sm text-slate-500">
                      <CheckCircle2 size={14} />
                      Progress
                    </dt>
                    <dd className="text-right text-sm font-bold text-slate-900">
                      {config.progress}%
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Download */}
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-900 text-amber-400">
                    <Download size={20} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900">
                      Project Brochure
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Download detailed information about this project.
                    </p>
                    <button className="mt-3 inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-900 hover:text-white">
                      <Download size={14} />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* ── Related Projects / CTA ── */}
        <section className="my-16 overflow-hidden rounded-3xl bg-slate-900">
          <div className="grid-pattern relative px-6 py-14 text-center md:px-16 md:py-20">
            <div className="relative z-10">
              <HardHat size={48} className="mx-auto text-amber-400" />
              <h2 className="mt-6 font-display text-3xl font-bold text-white md:text-4xl">
                Have a Similar Project in Mind?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
                Let's bring your vision to life. Our team is ready to take on new challenges
                and deliver excellence, every time.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-amber-400"
                >
                  Start Your Project
                  <ExternalLink size={16} />
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-bold text-white transition hover:bg-white/10"
                >
                  Explore More Projects
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProjectDetails;
