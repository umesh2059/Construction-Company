import type { Project } from "@/types/project";

const Projects = () => {
  const projects:Project[] = [
    {
      id: 1,
      title: "Smart City Development",
      location: "Bangalore",
      status: "Ongoing",
    },
    {
      id: 2,
      title: "Highway Expansion",
      location: "Delhi",
      status: "Completed",
    },
    {
      id: 3,
      title: "Commercial Complex",
      location: "Mumbai",
      status: "Planning",
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
              <div className="h-48 bg-gradient-to-br from-slate-800 via-slate-700 to-amber-700"></div>

              <div className="p-7">
                <h3 className="font-display text-xl font-bold">
                  {project.title}
                </h3>

                <p className="mt-3 text-slate-600">
                  {project.location} - {project.status}
                </p>

                <button className="mt-5 text-sm font-bold text-amber-700">
                  Learn More â†’
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
