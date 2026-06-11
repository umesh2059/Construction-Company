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
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center">
          <p className="text-orange-600 font-semibold">
            Careers
          </p>

          <h2 className="text-4xl font-bold mt-2">
            Join Our Team
          </h2>

          <p className="mt-4 text-gray-600">
            Explore internships and career opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-2 transition duration-300"
            >
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                {job.type}
              </span>

              <h3 className="text-xl font-semibold mt-4">
                {job.title}
              </h3>

              <p className="text-gray-600 mt-2">
                📍 {job.location}
              </p>

              <button className="mt-6 bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700">
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