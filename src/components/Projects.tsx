import type { Project } from "@/types/project";

const Projects = () => {
  const projects: Project[] = [
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <p className="text-orange-600 font-semibold">
            Featured Projects
          </p>

          <h2 className="text-4xl font-bold mt-2">
            Our Latest Projects
          </h2>

          <p className="mt-4 text-gray-600">
            Explore some of the major construction projects.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="h-48 bg-gray-300"></div>

              <div className="p-6">
                <h3 className="text-xl font-semibold">
                  {project.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  {project.location} - {project.status}
                </p>

                <button className="mt-4 text-orange-600 font-semibold">
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