import { useState } from "react";
import { useParams } from "react-router-dom";
import { projects } from "@/data/Projects";

const FALLBACK = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&q=80";

const ProjectDetails = () => {
  const { id } = useParams();
  const [imgError, setImgError] = useState(false);

  const project = projects.find(
    (p) => p.id === Number(id)
  );

  if (!project) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">
          Project Not Found
        </h1>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">

      <div className="h-72 rounded-xl overflow-hidden">
        <img
          src={!imgError && project.image ? project.image : FALLBACK}
          alt={project.title}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>

      <h1 className="text-5xl font-bold mt-8">
        {project.title}
      </h1>

      <p className="text-gray-600 mt-4 text-lg">
        📍 {project.location}
      </p>

      <span className="inline-block mt-4 bg-orange-100 text-orange-600 px-4 py-2 rounded-full">
        {project.status}
      </span>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">
          Project Description
        </h2>

        <p className="text-gray-600 mt-4">
          This project focuses on modern construction,
          infrastructure development, and sustainable
          engineering practices.
        </p>
      </div>

    </section>
  );
};

export default ProjectDetails;