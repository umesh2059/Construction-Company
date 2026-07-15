import type { project as Project } from "@/types/project";

const PROJECT_IMAGES: Record<string, string> = {
  "Smart City Development": "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  "Highway Expansion": "https://images.unsplash.com/photo-1541888946425-d81bb68c7b4f?w=800&q=80",
  "Commercial Complex": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",
};

const FALLBACK_IMG = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80";

const Projects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Smart City Development",
      location: "Bangalore",
      status: "Ongoing",
      image: PROJECT_IMAGES["Smart City Development"],
    },
    {
      id: 2,
      title: "Highway Expansion",
      location: "Delhi",
      status: "Completed",
      image: PROJECT_IMAGES["Highway Expansion"],
    },
    {
      id: 3,
      title: "Commercial Complex",
      location: "Mumbai",
      status: "Planning",
      image: PROJECT_IMAGES["Commercial Complex"],
    },
  ];

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
          {projects.map((project, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image || FALLBACK_IMG}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-7">
                <h3 className="font-display text-xl font-bold">
                  {project.title}
                </h3>

                <p className="mt-3 text-slate-600">
                  {project.location} - {project.status}
                </p>

                <button className="mt-5 text-sm font-bold text-amber-700">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
