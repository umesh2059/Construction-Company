import {BrowserRouter} from "react-router-dom";
import {Routes,Route} from "react-router-dom";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Events from "@/pages/Events";
import Career from "@/pages/Career";
import Internship from "@/pages/Internship";
import Contact from "@/pages/Contact";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element ={<Home/>}/>
        <Route path = "/projects" element ={<Projects/>}/>
        <Route path = "/events" element ={<Events/>}/>
        <Route path = "/careers" element ={<Career/>}/>
        <Route path = "/internship" element ={<Internship/>}/>
        <Route path = "/contact" element = {<Contact/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;