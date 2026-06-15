import {useState} from "react";
import { Link } from "react-router-dom";
import {Menu,X} from "lucide-react";

const Navbar =()=>{
    const [isOpen,setOpen] = useState(false);

    return(
        <nav className = "bg-white shadow-md">
            <div className = "max-w-7xl mx-auto px-6 py-4 flex justify-between items-center" >
                <h1 className="text-2xl font-bold text-orange-600">
                    Susta-Enginnering & Construction 
                </h1>


                <ul className="hidden md:flex gap-8 font-medium">
                    <li className="cursor-pointer hover:text-orange-600"><Link to="/">Home</Link></li>
                    <li className="cursor-pointer hover:text-orange-600"><Link to="/projects">Projects</Link></li>
                    <li className="cursor-pointer hover:text-orange-600"><Link to="/events">Events</Link></li>
                    <li className="cursor-pointer hover:text-orange-600"><Link to="/careers">Careers</Link></li>
                    <li className=" cursor-pointer hover:text-orange-600"><Link to="/contact">Contacts</Link></li>
                </ul> 
                    <button className="hidden md:block bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
                        Apply Now
                    </button>

                    <button className="md:hidden"
                    onClick ={()=>setOpen(!isOpen)}>
                        {isOpen ? <X size ={28}/>:<Menu size={28}/>}
                    </button>
            </div>

            {isOpen && (
                <div className="md:hidden px-6 pb-4">
                    <ul className = "flex flex-col gap-4 font-medium">
                        <li><Link to = "/">Home</Link></li>
                        <li><Link to = "/projects">Projects</Link></li>
                       <li><Link to = "/events">Events</Link></li>
                      <li><Link to="/careers">Careers</Link></li>
                       <li><Link to = "/contact">Contact</Link></li>
                    </ul>
                    <button className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg">Apply Now</button>
                </div>
            )}

        </nav>
    );
};

export default Navbar;