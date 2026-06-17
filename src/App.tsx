
import {Routes,Route} from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Events from "@/pages/Events";
import Career from "@/pages/Career";
import Internship from "@/pages/Internship";
import Contact from "@/pages/Contact";
import ProjectDetails from "@/pages/ProjectDetails";
import CareerDetails from "@/pages/careerDetails";
import Apply from "@/pages/Apply";



const App = () => {
  return (
     <div>
        <Navbar/>
         <Routes>
           <Route path = "/" element ={<Home/>}/>
           <Route path = "/projects" element ={<Projects/>}/>
           <Route path = "/events" element ={<Events/>}/>
           <Route path = "/careers" element ={<Career/>}/>
           <Route path = "/internship" element ={<Internship/>}/>
           <Route path = "/contact" element = {<Contact/>}/>
           <Route path = "/projects/:id" element = {<ProjectDetails/>}/>
           <Route path =  "/careers/:id" element = {<CareerDetails/>}/>
           <Route path = "/apply/:id"  element ={<Apply/>}/>
         </Routes>
     </div>
  );
};

export default App;