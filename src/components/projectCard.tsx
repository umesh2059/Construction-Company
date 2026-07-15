import { useState } from "react";
import type { project as Project } from "@/types/project";
import { Link } from "react-router-dom";

type ProjectCardProps = {
  project: Project;
};

const FALLBACK_IMG = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80";

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
      
      {/* Project Image */}
      <div className="h-48 bg-gray-300 overflow-hidden">
        {project.image && !imgError ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <img
            src={FALLBACK_IMG}
            alt="Construction site"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold">
          {project.title}
        </h2>

        <p className="text-gray-600 mt-2">
          📍 {project.location}
        </p>

        <span className="inline-block mt-3 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
          {project.status}
        </span>

        {/* <button className="block mt-5 bg-orange-600 text-white px-4 py-2 rounded-lg">
          View Details
        </button> */}
        <Link
           to={`/projects/${project.id}`}
            className="block mt-5 bg-orange-600 text-white px-4 py-2 rounded-lg text-center"
                >
               View Details
          </Link>
      </div>
    </div>
  );
};

export default ProjectCard;