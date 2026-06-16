import { useState } from "react";
import Navbar from "@/components/Navbar";
import CareerCard from "@/components/CareerCard";
import { careers} from "@/data/careers";

const Careers = () => {
  const [search, setSearch] = useState("");

  const filteredCareers = careers.filter(
    (career) =>
      career.title.toLowerCase().includes(search.toLowerCase()) ||
      career.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* <Navbar /> */}

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold">
          Career Opportunitiesw
        </h1>

        <p className="text-gray-600 mt-4">
          Explore internships and job opportunities in the construction industry.
        </p>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mt-8 p-3 border rounded-lg"
        />

        {/* Career Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filteredCareers.map((career) => (
            <CareerCard
              key={career.id}
              career={career}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Careers;