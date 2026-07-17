import { useEffect, useState } from "react";
import ProjectCard from "@/components/projectCard";
import { supabase } from "@/lib/supabase";
import type { project as Project } from "@/types/project";

const Projects = () => {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data || []);
      }

      setLoading(false);
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-5xl font-bold">
        Construction Projects
      </h1>

      <p className="mt-4 text-gray-600">
        Discover ongoing and completed project.
      </p>

      <input
        type="text"
        placeholder="Search project..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-8 w-full rounded-lg border p-3"
      />

      {loading ? (
        <p className="mt-10 text-gray-600">
          Loading projects...
        </p>
      ) : (
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;