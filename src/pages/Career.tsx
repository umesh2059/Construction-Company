import { useState, useEffect } from "react";
import CareerCard from "@/components/CareerCard";
import { supabase } from "@/lib/supabase";
import type { Career } from "@/types/career";

const Careers = () => {
  const [search, setSearch] = useState("");
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("jobs").select("*").order("created_at", { ascending: false }).then(({ data, error }) => {
      if (!error && data) setCareers(data);
      setLoading(false);
    });
  }, []);

  const filteredCareers = careers.filter(
    (career) =>
      career.title.toLowerCase().includes(search.toLowerCase()) ||
      career.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold">Career Opportunities</h1>

      <p className="text-gray-600 mt-4">
        Explore internships and job opportunities in the construction industry.
      </p>

      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mt-8 p-3 border rounded-lg"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {loading ? (
          <p className="col-span-full text-center text-gray-500">Loading careers...</p>
        ) : filteredCareers.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No careers found.</p>
        ) : (
          filteredCareers.map((career) => (
            <CareerCard key={career.id} career={career} />
          ))
        )}
      </div>
    </section>
  );
};

export default Careers;
