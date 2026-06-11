const Projects = () => {
  const projects = [
    {
      title: "Smart City Development",
      description:
        "Modern infrastructure project with sustainable design.",
    },
    {
      title: "Highway Expansion",
      description:
        "Large-scale road construction connecting major cities.",
    },
    {
      title: "Commercial Complex",
      description:
        "State-of-the-art office and retail space development.",
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
                  {project.description}
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