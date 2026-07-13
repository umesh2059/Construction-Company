import { ArrowRight, Building2, HardHat, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = ()=>{
    return(
        <section className="relative isolate overflow-hidden bg-slate-950 text-white">
          <div className="grid-pattern absolute inset-0 opacity-70"></div>
          <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl"></div>
          <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
            <div className="grid items-end gap-14 lg:grid-cols-[1.35fr_.65fr]">
              <div className="max-w-4xl">
                <p className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[.22em] text-amber-400"><span className="h-2 w-2 rounded-full bg-amber-400"></span> India’s built-environment network</p>
                <h1 className="font-display text-5xl font-bold leading-[.98] tracking-tight md:text-7xl lg:text-8xl">Building what’s <span className="text-amber-400">next.</span></h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">A smarter place to discover landmark projects, build your construction career, and meet the people shaping tomorrow’s cities.</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-amber-300">Explore projects <ArrowRight size={18}/></Link>
                  <Link to="/careers" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-bold transition hover:border-white hover:bg-white/10">Find your role</Link>
                </div>
                <div className="mt-16 grid max-w-2xl grid-cols-3 border-t border-white/15 pt-7">
                  <div><h2 className="font-display text-3xl font-bold">150<span className="text-amber-400">+</span></h2><p className="mt-1 text-sm text-slate-400">Projects</p></div>
                  <div><h2 className="font-display text-3xl font-bold">50<span className="text-amber-400">+</span></h2><p className="mt-1 text-sm text-slate-400">Companies</p></div>
                  <div><h2 className="font-display text-3xl font-bold">1k<span className="text-amber-400">+</span></h2><p className="mt-1 text-sm text-slate-400">Future builders</p></div>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                  <div className="relative h-80 overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-amber-400 via-amber-500 to-orange-700 p-6 text-slate-950">
                    <div className="absolute inset-x-0 bottom-0 h-48 bg-slate-950 [clip-path:polygon(0_70%,18%_45%,31%_60%,48%_18%,64%_50%,78%_0,100%_35%,100%_100%,0_100%)]"></div>
                    <div className="relative flex justify-between text-xs font-bold uppercase tracking-widest"><span>Featured build</span><Building2 size={19}/></div>
                    <div className="absolute bottom-6 z-10"><p className="font-mono text-xs text-amber-300">01 / URBAN INFRASTRUCTURE</p><h2 className="mt-2 font-display text-3xl font-bold text-white">Cities in motion</h2></div>
                  </div>
                  <div className="mt-4 flex items-center justify-between px-2 text-sm text-slate-300"><span className="flex items-center gap-2"><MapPin size={16} className="text-amber-400"/> Bangalore, India</span><HardHat size={18} className="text-amber-400"/></div>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
};

export default Hero;
