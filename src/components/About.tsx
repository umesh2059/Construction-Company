const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <p className="text-orange-600 font-semibold">
            About Us
          </p>

          <h2 className="text-4xl font-bold mt-2">
            Connecting Construction Industry
          </h2>

          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            ConstructHub helps students, professionals, and companies
            connect through projects, internships, jobs, and industry events.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Projects
            </h3>

            <p className="text-gray-600">
              Explore ongoing and completed construction projects.
            </p>
          </div>

          <div className="shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Internships
            </h3>

            <p className="text-gray-600">
              Apply for internships and gain real-world experience.
            </p>
          </div>

          <div className="shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Events
            </h3>

            <p className="text-gray-600">
              Stay updated with construction workshops and events.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;