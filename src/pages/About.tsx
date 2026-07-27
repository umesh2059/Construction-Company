import { useState } from "react";
import { Calendar, Users, HardHat, Award, ChevronRight, X, Mail, GraduationCap, Briefcase, MapPin } from "lucide-react";

const founders = [
  {
    name: "Chanda Kumari Panjiyar",
    role: "Founder & CEO",
    image: "/chandaaunty.jpg",
    bio: "With over 8 years of experience in civil engineering and construction management, Chanda Kumari Panjiyar founded Susta Engineering in 2024 with a vision to revolutionize sustainable construction practices in Nepal.",
    fullBio: "Chanda Kumari Panjiyar is the visionary founder and CEO of Susta Engineering Company. With a degree in Civil Engineering and over a decade of hands-on experience in the construction industry, she recognized the need for sustainable, quality-driven infrastructure development in Nepal. Under her leadership, Susta Engineering has grown from a small team of 4 to a thriving organization of 150+ professionals. She is passionate about empowering women in construction and promoting eco-friendly building practices across the country.",
    education: "B.E. in Civil Engineering, Tribhuvan University",
    experience: "10+ years in civil engineering & construction management",
    location: "Susta, Nawalparasi",
    email: "chanda@sustaengineering.com",
    expertise: ["Sustainable Construction", "Project Management", "Structural Design", "Team Leadership"],
  },
  {
    name: "KeshKumar Gupta",
    role: "Co-Founder & COO",
    image: "/keshavdai.png",
    bio: "KeshKumar Gupta brings 5+ years of expertise in project management and business operations. He spearheads our operational excellence and has been instrumental in scaling the company across multiple states.",
    fullBio: "KeshKumar Gupta is the Co-Founder and Chief Operating Officer of Susta Engineering Company. With a strong background in business administration and project management, he oversees the day-to-day operations, strategic planning, and business development. His relentless focus on operational efficiency and client satisfaction has been key to the company's rapid growth. KeshKumar is known for his ability to build high-performing teams and foster a culture of innovation and accountability.",
    education: "MBA in Operations, Pokhara University",
    experience: "5+ years in project management & business operations",
    location: "Susta, Nawalparasi",
    email: "keshkumar@sustaengineering.com",
    expertise: ["Business Operations", "Project Management", "Strategic Planning", "Team Building"],
  },
];

const teamMembers = [
  "laxman pant",
  "Bivek Gharti",
  "Avishek Jaiswal",
  "Brihatbir Thapa",
  "Rohit Joshi",
  "Neha Kapoor",
  "Suresh Reddy",
  "Deepa Nair",
  "Arjun Malhotra",
  "Kavita Iyer",
  "Manish Gupta",
  "Pooja Rao",
];

const milestones = [
  { year: 2024, event: "Susta Engineering Company founded in Susta with a team of 5" },
  { year: 2025, event: "Completed first major commercial project worth ₹2Cr" },
  { year: 2025, event: "Expanded operations to nawalparsi & Butwal" },
  { year: 2026, event: "Crossed 50+ employees milestone" },
  { year: 2026, event: "Launched digital project management platform" },
  { year: 2026, event: "Completed 150+ projects across 3 states with 100+ team members" },
];

const stats = [
  { label: "Years Established", value: "10+", icon: Calendar },
  { label: "Projects Completed", value: "100+", icon: HardHat },
  { label: "Team Members", value: "100+", icon: Users },
  { label: "Industry Awards", value: "25+", icon: Award },
];

interface Founder {
  name: string; role: string; image: string; bio: string; fullBio: string;
  education: string; experience: string; location: string; email: string; expertise: string[];
}

const About = () => {
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);

  return (
    <section className="min-h-screen bg-stone-50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-slate-950 py-24">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1541888946425-d81bb68c7b4f?w=1600&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[.2em] text-amber-400">
            About Us
          </p>
          <h1 className="font-display mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Susta Engineering Company
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
            Building Nepal's infrastructure with integrity, innovation, and sustainability since 2020.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 -mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <stat.icon size={28} />
                </span>
                <div>
                  <p className="font-display text-2xl font-bold text-slate-950">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[.2em] text-amber-700">
              Our Story
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              From a Small Office to a Trusted Name in Construction
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              Susta Engineering Company was founded in 2020 by Chanda kumari panjiyar with a small team of 4 engineers
              working out of a modest office in Susta. What started as a local contracting firm soon grew into
              a full-service construction and engineering company known for quality, timely delivery, and
              ethical business practices.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Over two yrs, we have delivered 100+ projects ranging from residential complexes and
              commercial buildings to industrial infrastructure and government contracts. Today, our team
              of 150+ professionals operates across 3 states, bringing world-class construction practices
              to every project we undertake.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80"
              alt="Construction site"
              className="h-80 w-full object-cover md:h-96"
            />
          </div>
        </div>
      </div>

      {/* Founders */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[.2em] text-amber-700">
              Leadership
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Meet Our Founders
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              The visionaries behind Susta Engineering Company who built this organization from the ground up.
            </p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {founders.map((founder) => (
              <div
                key={founder.name}
                onClick={() => setSelectedFounder(founder)}
                className="group cursor-pointer rounded-2xl border border-slate-200 bg-stone-50 p-8 transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl"
              >
                <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-center sm:gap-8">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="h-32 w-32 shrink-0 rounded-full border-4 border-amber-200 object-cover transition duration-300 group-hover:scale-105 group-hover:border-amber-400 sm:h-36 sm:w-36 md:h-40 md:w-40"
                  />
                  <div className="mt-4 sm:mt-0 sm:flex-1">
                    <h3 className="font-display text-xl font-bold text-slate-950 md:text-2xl">{founder.name}</h3>
                    <p className="text-sm font-semibold text-amber-700">{founder.role}</p>
                    <p className="mt-3 leading-7 text-slate-600 line-clamp-3">{founder.bio}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-amber-600 transition group-hover:text-amber-700">
                      View Full Profile <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Founder Modal */}
      {selectedFounder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedFounder(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedFounder(null)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-slate-500 transition hover:bg-stone-200 hover:text-slate-800"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
              <img
                src={selectedFounder.image}
                alt={selectedFounder.name}
                className="h-40 w-40 shrink-0 rounded-full border-4 border-amber-200 object-cover sm:h-48 sm:w-48 md:h-56 md:w-56"
              />
              <div className="text-center sm:text-left">
                <h3 className="font-display text-2xl font-bold text-slate-950 md:text-3xl">{selectedFounder.name}</h3>
                <p className="text-base font-semibold text-amber-700">{selectedFounder.role}</p>
                <p className="mt-4 leading-7 text-slate-600">{selectedFounder.fullBio}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl bg-stone-50 p-4">
                <GraduationCap size={20} className="shrink-0 text-amber-600" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Education</p>
                  <p className="text-sm font-medium text-slate-800">{selectedFounder.education}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-stone-50 p-4">
                <Briefcase size={20} className="shrink-0 text-amber-600" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Experience</p>
                  <p className="text-sm font-medium text-slate-800">{selectedFounder.experience}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-stone-50 p-4">
                <MapPin size={20} className="shrink-0 text-amber-600" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Location</p>
                  <p className="text-sm font-medium text-slate-800">{selectedFounder.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-stone-50 p-4">
                <Mail size={20} className="shrink-0 text-amber-600" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
                  <p className="text-sm font-medium text-slate-800">{selectedFounder.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Areas of Expertise</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedFounder.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[.2em] text-amber-700">
              Our Team
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              The People Behind the Work
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Our team of 100+ dedicated professionals across engineering, design, project management, and support.
            </p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {teamMembers.map((name) => (
              <div
                key={name}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-amber-400">
                  {name.split(" ").map((n) => n[0]).join("")}
                </span>
                <span className="font-medium text-slate-700">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[.2em] text-amber-700">
              Milestones
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Our Journey
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Key milestones that shaped Susta Engineering Company over the years.
            </p>
          </div>
          <div className="relative mt-14">
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-amber-200 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className={`relative flex items-center gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className={`inline-block rounded-2xl border border-slate-200 bg-stone-50 p-6 shadow-sm transition hover:border-amber-300 hover:shadow-lg ${i % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                      <span className="font-display text-lg font-bold text-amber-700">{m.year}</span>
                      <p className="mt-1 text-slate-600">{m.event}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-amber-300 bg-white">
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            Want to Be Part of Our Story?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Join the team at Susta Engineering Company and help us build the future of Nepal's infrastructure.
          </p>
          <a
            href="/careers"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 font-bold text-white transition hover:bg-amber-500"
          >
            Explore Careers <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
