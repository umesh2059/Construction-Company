import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const TEAM_DEFAULT = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80";

const Careers = () => {
  const [teamImage, setTeamImage] = useState(TEAM_DEFAULT);

  useEffect(() => {
    supabase
      .from("site_images")
      .select("image_url")
      .eq("section", "join_team")
      .single()
      .then(({ data }) => {
        if (data?.image_url) setTeamImage(data.image_url);
      });
  }, []);

  const jobs = [
    {
      title: "Civil Enginner",
      location: "Remote",
      type: "Internship",
    },
    {
      title: "Site Engineer",
      location: "Triveni",
      type: "Full Time",
    },
    {
      title: "Project Coordinator",
      location: "Narsahi",
      type: "Full Time",
    },
  ];

  return (
    <section className="bg-amber-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[.2em] text-amber-700">
              Careers
            </p>

            <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Join Our Team
            </h2>

            <p className="mt-5 text-slate-600">
              Explore internships and career opportunities in the construction industry. Build your future with us.
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl shadow-lg">
              <img
                src={teamImage}
                alt="Construction team working together"
                className="h-64 w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-5">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="rounded-2xl border border-amber-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="rounded-full bg-amber-100 px-3 py-1 font-mono text-xs font-medium text-amber-800">
                  {job.type}
                </span>

                <h3 className="font-display mt-5 text-xl font-bold">
                  {job.title}
                </h3>

                <p className="mt-2 text-slate-600">
                  📍 {job.location}
                </p>

                <button className="mt-5 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-amber-600">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Careers;
