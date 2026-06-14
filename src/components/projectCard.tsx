import type { Project } from "@/types/project";
import {Link} from "react-router-dom";
type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
      
      {/* Project Image */}
      <div className="h-48 bg-gray-300"></div>

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