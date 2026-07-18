const About = () => {
  return (
    <section className="bg-stone-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[.2em] text-amber-700">
            About Us
          </p>

          <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Connecting Construction Industry
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            ConstructHub helps students, professionals, and companies
            connect through projects, internships, jobs, and industry events.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl">
            <h3 className="font-display mb-3 text-xl font-bold">
              Projects
            </h3>

            <p className="leading-7 text-slate-600">
              Explore ongoing and completed construction projects.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl">
            <h3 className="font-display mb-3 text-xl font-bold">
              Internships
            </h3>

            <p className="leading-7 text-slate-600">
              Apply for internships and gain real-world experiences.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl">
            <h3 className="font-display mb-3 text-xl font-bold">
              Events
            </h3>

            <p className="leading-7 text-slate-600">
              Stay updated with construction workshops and events.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
