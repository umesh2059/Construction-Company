import { useState } from "react";
import { Link } from "react-router-dom";
import type { Career } from "@/types/career";

const FALLBACK = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80";

type CareerCardProps = {
  career: Career;
};

const CareerCard = ({ career }: CareerCardProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
      <div className="h-40 overflow-hidden bg-gray-200">
        <img
          src={!imgError && career.image_url ? career.image_url : FALLBACK}
          alt={career.title}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
      <div className="p-5">
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
    </div>
  );
};

export default CareerCard;