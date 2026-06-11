import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Careers from "@/components/Career";
import Footer from "@/components/Footer";

function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <About/>
      <Services/>
      <Projects/>
      <Careers/>
      <Footer/>
    </div>
  )
}

export default Home
