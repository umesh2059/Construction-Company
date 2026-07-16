import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Project = {
  id: string;
  title: string;
  location: string;
  status: string;
  description: string | null;
  image: string | null;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Project error:", error);
      } else {
        setProject(data);
      }

      setLoading(false);
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return <p className="p-10">Loading project...</p>;
  }

  if (!project) {
    return <h1 className="p-10 text-4xl font-bold">Project Not Found</h1>;
  }

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-12">
      <section className="mx-auto max-w-5xl">
        <Link
          to="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-600"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="h-[450px] w-full rounded-2xl object-cover"
          />
        )}

        <div className="mt-8">
          <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-700">
            {project.status}
          </span>

          <h1 className="mt-5 text-5xl font-bold text-slate-950">
            {project.title}
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            📍 {project.location}
          </p>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-slate-950">
              About This Project
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              {project.description || "No description available."}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetails;