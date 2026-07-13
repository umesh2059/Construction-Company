import {
  Briefcase,
  Building2,
  GraduationCap,
  CalendarDays,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Job Opportunities",
      description:
        "Explore construction-related jobs from top companies.",
      icon: <Briefcase size={40} />,
    },
    {
      title: "Construction Projects",
      description:
        "View ongoing and completed construction projects.",
      icon: <Building2 size={40} />,
    },
    {
      title: "Internship Programs",
      description:
        "Apply for internships and gain practical experience.",
      icon: <GraduationCap size={40} />,
    },
    {
      title: "Industry Events",
      description:
        "Stay updated with workshops, seminars, and events.",
      icon: <CalendarDays size={40} />,
    },
  ];

  return (
    <section className="bg-slate-950 py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[.2em] text-amber-400">
            Our Services
          </p>

          <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Everything In One Platform
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            Connecting students, professionals, and companies.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          {services.map((service, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-7 transition duration-300 hover:-translate-y-2 hover:border-amber-400/50 hover:bg-white/10"
            >
              <div className="mb-5 text-amber-400">
                {service.icon}
              </div>

              <h3 className="font-display mb-3 text-xl font-bold">
                {service.title}
              </h3>

              <p className="leading-7 text-slate-400">
                {service.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Services;
