import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

type Project = {
  id: number;
  title: string;
  location: string;
  status: string;
  image: string | null;
  description: string | null;
};

const FALLBACK_IMG = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80";

const ProjectCard = ({ project }: { project: Project }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="h-48 overflow-hidden">
        {project.image && !imgError ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <img
            src={FALLBACK_IMG}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        )}
      </div>
      <div className="p-7">
        <h3 className="font-display text-xl font-bold">
          {project.title}
        </h3>
        <p className="mt-3 text-slate-600">
          {project.location} - {project.status}
        </p>
        <Link
          to={`/projects/${project.id}`}
          className="mt-5 block text-sm font-bold text-amber-700"
        >
          Learn More →
        </Link>
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);
      if (data) setProjects(data as Project[]);
    };
    fetchProjects();
  }, []);

  return (
    <section className="bg-stone-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[.2em] text-amber-700">
            Featured Projects
          </p>

          <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Our Latest Projects
          </h2>

          <p className="mt-5 text-slate-600">
            Explore some of the major construction projects.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>

    </section>
  );
};

export default Projects;
