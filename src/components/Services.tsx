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
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <p className="text-orange-600 font-semibold">
            Our Services
          </p>

          <h2 className="text-4xl font-bold mt-2">
            Everything In One Platform
          </h2>

          <p className="mt-4 text-gray-600">
            Connecting students, professionals, and companies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-2 transition duration-300"
            >
              <div className="text-orange-600 mb-4">
                {service.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600">
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