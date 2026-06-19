import { Link } from "react-router-dom";


const Adminsidebar = ()=>{
    return (
        <div className="w-64 min-h-screen bg-gray-900 text-white p-6">
            <h2 className="text-2xl font-bold mb-8">
                Admin panel
            </h2>

            <nav className="space-y-4">
                <Link 
                  to = "/admin"
                  className="block"
                  >
                  </Link>
                  <Link 
                  to = "/admin/careers"
                  className="blocks">
                    Careers
                  </Link>
                  <Link 
                  to = "/admin/projects"
                  className="block">
                    projects
                  </Link>

                  <Link 
                   to = "/admin/application"
                   className="block">
                    Application
                   </Link>
            </nav>
        </div>
    )
}

export default Adminsidebar;