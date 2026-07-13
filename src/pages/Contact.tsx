import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const sendEmail = async (data: ContactFormData) => {
    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      await emailjs.send(
        "service_construction",
        "template_contact",
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          to_name: "ConstructionHub Team",
        },
        "your_emailjs_user_id"
      );

      setSubmitStatus("success");
      reset();
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Failed to send message. Please try again later.");
    }
  };

  const onSubmit = (data: ContactFormData) => {
    sendEmail(data);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Construction Ave, Building Hub, NY 10001",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "contact@constructionhub.com\ncareers@constructionhub.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567\n+1 (555) 987-6543",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-orange-600 font-semibold">Contact Us</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">
            Get in Touch
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Have questions about projects, internships, or partnerships? We'd love to hear from you.
            Fill out the form or reach out through any of our channels below.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-4 rounded-xl bg-orange-100 flex-shrink-0">
                  <item.icon className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-gray-600 whitespace-pre-line">{item.details}</p>
                </div>
              </div>
            ))}

            <div className="p-6 bg-orange-600 rounded-xl text-white">
              <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
              <p className="text-orange-100 mb-4">
                We typically respond within 24 hours during business days.
              </p>
              <div className="flex items-center gap-2 text-orange-100">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Available Mon-Fri, 9AM-6PM EST</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-orange-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      {...register("name")}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                        errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-orange-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...register("email")}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                        errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-orange-600">*</span>
                  </label>
                  <select
                    id="subject"
                    {...register("subject")}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                      errors.subject ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Project Inquiry">Project Inquiry</option>
                    <option value="Internship Opportunities">Internship Opportunities</option>
                    <option value="Career Opportunities">Career Opportunities</option>
                    <option value="Partnership and Collaboration">Partnership & Collaboration</option>
                    <option value="Event Inquiry">Event Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-orange-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Tell us about your inquiry..."
                    {...register("message")}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors resize-none ${
                      errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="w-full md:w-auto px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {submitStatus === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                  {submitStatus !== "loading" && <Send className="w-5 h-5" />}
                  <span>
                    {submitStatus === "loading" ? "Sending..." : "Send Message"}
                  </span>
                </button>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 transition-all duration-300 ease-out">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-800">Message Sent Successfully!</p>
                      <p className="text-sm text-green-700">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 transition-all duration-300 ease-out">
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-red-800">Failed to Send Message</p>
                      <p className="text-sm text-red-700">{errorMessage}</p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;