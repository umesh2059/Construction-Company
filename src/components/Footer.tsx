import { Building2, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2">
              <Building2 size={28} />
              <h2 className="text-2xl font-bold">
                ConstructHub
              </h2>
            </div>

            <p className="text-gray-400 mt-4">
              Connecting construction companies,
              students, professionals, and projects
              on one platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer">
                Home
              </li>
              <li className="hover:text-white cursor-pointer">
                Projects
              </li>
              <li className="hover:text-white cursor-pointer">
                Careers
              </li>
              <li className="hover:text-white cursor-pointer">
                Events
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Services
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>Internships</li>
              <li>Jobs</li>
              <li>Projects</li>
              <li>Events</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-3 text-gray-400">

              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>info@constructhub.com</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>+91 9876543210</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>Bangalore, India</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
          © 2026 ConstructHub. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;