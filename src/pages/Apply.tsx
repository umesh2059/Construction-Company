import { useState } from "react";
import { useParams } from "react-router-dom";

const Apply = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    alert("Application Submitted Successfully!");
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold">
        Apply for Job #{id}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4"
      >
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-3 border rounded-lg"
          value={formData.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value,
            })
          }
        />

        <input
          type="text"
          accept = ".pdf,.doc,.docx"
          placeholder="Resume Link"
          className="w-full p-3 border rounded-lg"
          value={formData.resume}
          onChange={(e) =>
            setFormData({
              ...formData,
              resume: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
        >
          Submit Application
        </button>
      </form>
    </section>
  );
};

export default Apply;