import { useParams } from "react-router-dom";
import { careers } from "@/data/careers";
import { Link} from "react-router-dom"

const CareerDetails = () => {
  const { id } = useParams();

  const career = careers.find(
    (c) => c.id === Number(id)
  );

  if (!career) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">
          Career Not Found
        </h1>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold">
        {career.title}
      </h1>

      <p className="text-gray-600 mt-4 text-lg">
        Company: {career.company}
      </p>

      <p className="text-gray-600 mt-2">
        📍 {career.location}
      </p>

      <span className="inline-block mt-4 bg-orange-100 text-orange-600 px-4 py-2 rounded-full">
        {career.type}
      </span>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">
          Job Description
        </h2>

        <p className="text-gray-600 mt-4">
          We are looking for talented individuals to join our growing team.
          This role provides hands-on experience in construction and project management.
        </p>

       <Link
               to={`/apply/${career.id}`}
                 className="inline-block mt-8 bg-orange-600 text-white px-6 py-3 rounded-lg"
                 >
                Apply Now
      </Link>
      </div>
    </section>
  );
};

export default CareerDetails;