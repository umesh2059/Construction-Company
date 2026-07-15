import {useState} from "react";
import { Link } from "react-router-dom";
import {Menu,X, ArrowUpRight, Building2} from "lucide-react";

const Navbar =()=>{
    const [isOpen,setOpen] = useState(false);

    return(
        <nav className = "sticky top-0 z-50 border-b border-slate-200/80 bg-stone-50/90 backdrop-blur-lg">
            <div className = "max-w-7xl mx-auto flex items-center justify-between px-6 py-4" >
                <Link to="/" className="group flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-amber-400 transition-transform group-hover:-rotate-6"><Building2 size={21}/></span>
                    <span className="font-display text-lg font-bold tracking-tight text-slate-950">Susta Engineering Company <span className="text-amber-600"></span></span>
                </Link>

                <ul className="hidden gap-7 text-sm font-bold text-slate-600 md:flex">
                    <li><Link className="transition hover:text-amber-700" to="/">Home</Link></li>
                    <li><Link className="transition hover:text-amber-700" to="/projects">Projects</Link></li>
                    <li><Link className="transition hover:text-amber-700" to="/events">Events</Link></li>
                    <li><Link className="transition hover:text-amber-700" to="/careers">Careers</Link></li>
                    <li><Link className="transition hover:text-amber-700" to="/contact">Contact</Link></li>
                </ul>
                <Link to="/careers" className="hidden items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-amber-600 md:flex">Join the network <ArrowUpRight size={16}/></Link>

                <button className="md:hidden" onClick ={()=>setOpen(!isOpen)} aria-label="Toggle navigation">
                    {isOpen ? <X size ={28}/>:<Menu size={28}/>}
                </button>
            </div>

            {isOpen && (
                <div className="border-t border-slate-200 px-6 py-5 md:hidden">
                    <ul className = "flex flex-col gap-4 font-semibold text-slate-700">
                        <li><Link onClick={() => setOpen(false)} to = "/">Home</Link></li>
                        <li><Link onClick={() => setOpen(false)} to = "/projects">Projects</Link></li>
                        <li><Link onClick={() => setOpen(false)} to = "/events">Events</Link></li>
                        <li><Link onClick={() => setOpen(false)} to="/careers">Careers</Link></li>
                        <li><Link onClick={() => setOpen(false)} to = "/contact">Contact</Link></li>
                    </ul>
                    <Link to="/careers" onClick={() => setOpen(false)} className="mt-5 block w-full rounded-xl bg-slate-950 py-3 text-center font-bold text-white">Join the network</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
