
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
import Dashboard from "@/Admin/Dashboard";
import CreateEvent from "@/Admin/CreateEvent";
import EventRegistration from "@/pages/EventRegistration";



const App = () => {
  return (
     <div>
        <Navbar/>
         <Routes>
           <Route path = "/" element ={<Home/>}/>
           <Route path = "/projects" element ={<Projects/>}/>
           <Route path = "/events" element ={<Events/>}/>
           <Route path = "/events/:id/register" element ={<EventRegistration/>}/>
           <Route path = "/careers" element ={<Career/>}/>
           <Route path = "/internship" element ={<Internship/>}/>
           <Route path = "/contact" element = {<Contact/>}/>
           <Route path = "/projects/:id" element = {<ProjectDetails/>}/>
           <Route path =  "/careers/:id" element = {<CareerDetails/>}/>
           <Route path = "/apply/:id"  element ={<Apply/>}/>
           <Route path = "/admin" element ={<Dashboard/>}/>
           <Route path = "/admin/events" element ={<CreateEvent/>}/>
         </Routes>
     </div>
  );
};

export default App;
