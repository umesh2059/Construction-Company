import { Link } from "react-router-dom";
import type { Career } from "@/types/career";

type CareerCardProps = {
  career: Career;
};

const CareerCard = ({ career }: CareerCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold">
        {career.title}
      </h2>

      <p className="text-gray-600 mt-2">
        {career.company}
      </p>

      <p className="text-gray-600">
        📍 {career.location}
      </p>

      <span className="inline-block mt-3 bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
        {career.job_type}
      </span>

      <Link
        to={`/careers/${career.id}`}
        className="block mt-5 bg-orange-600 text-white px-4 py-2 rounded-lg text-center"
      >
        View Details
      </Link>
    </div>
  );
};

export default CareerCard;