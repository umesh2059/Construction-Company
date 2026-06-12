import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/projectCard";

const Projects = () => {
  const [search, setSearch] = useState("");

  const projects = [
    {
      id: 1,
      title: "Smart City Project",
      location: "Bangalore",
      status: "Ongoing",
    },
    {
      id: 2,
      title: "Commercial Tower",
      location: "Mumbai",
      status: "Completed",
    },
    {
      id: 3,
      title: "Highway Expansion",
      location: "Delhi",
      status: "Ongoing",
    },
    {
      id: 4,
      title: "Metro Bridge",
      location: "Hyderabad",
      status: "Planning",
    },
  ];

  const filteredProjects = projects.filter((project) =>
    project.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      {/* <Navbar /> */}

      <section className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-5xl font-bold">
          Construction Projects
        </h1>

        <p className="text-gray-600 mt-4">
          Discover ongoing and completed projects.
        </p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mt-8 p-3 border rounded-lg"
        />

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              location={project.location}
              status={project.status}
            />
          ))}
        </div>

      </section>
    </>
  );
};

export default Projects;