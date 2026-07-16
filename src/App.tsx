
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
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
import EventRegistration from "@/pages/EventRegistration";
import Dashboard from "@/Admin/Dashboard";
import CreateEvent from "@/Admin/CreateEvent";
import CreateCareer from "@/Admin/CreateCareer";
import CreateProject from "@/Admin/CreateProject";
import ManageImages from "@/Admin/ManageImages";
import Applications from "@/Admin/Application";
import EventRegistrations from "@/Admin/EventRegistrations";
import Login from "@/Auth/Login";
import ProtectedRoute from "@/Auth/protectedRoute";
import AdminLayout from "@/Admin/AdminLayout";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id/register" element={<EventRegistration />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/internship" element={<Internship />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/careers/:id" element={<CareerDetails />} />
        <Route path="/apply/:id" element={<Apply />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="events" element={<CreateEvent />} />
          <Route path="careers" element={<CreateCareer />} />
          <Route path="projects" element={<CreateProject />} />
          <Route path="images" element={<ManageImages />} />
          <Route path="event-registrations" element={<EventRegistrations />} />
          <Route path="applications" element={<Applications />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
