const Careers = () => {
  const jobs = [
    {
      title: "Frontend Developer Intern",
      location: "Remote",
      type: "Internship",
    },
    {
      title: "Site Engineer",
      location: "Bangalore",
      type: "Full Time",
    },
    {
      title: "Project Coordinator",
      location: "Mumbai",
      type: "Full Time",
    },
  ];

  return (
    <section className="bg-amber-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[.2em] text-amber-700">
            Careers
          </p>

          <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Join Our Team
          </h2>

          <p className="mt-5 text-slate-600">
            Explore internships and career opportunities.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="rounded-2xl border border-amber-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <span className="rounded-full bg-amber-100 px-3 py-1 font-mono text-xs font-medium text-amber-800">
                {job.type}
              </span>

              <h3 className="font-display mt-5 text-xl font-bold">
                {job.title}
              </h3>

              <p className="mt-2 text-slate-600">
                ðŸ“ {job.location}
              </p>

              <button className="mt-7 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-amber-600">
                Apply Now
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Careers;
