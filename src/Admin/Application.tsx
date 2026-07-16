import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Application } from "@/types/Application";
import { Briefcase, Search, ExternalLink } from "lucide-react";

export default function Applications() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    supabase
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setApps(data as Application[]);
        setLoading(false);
      });
  }, []);

  const filtered = apps.filter(
    (a) =>
      a.applicant_name.toLowerCase().includes(search.toLowerCase()) ||
      a.job_title.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex items-center justify-center p-20">
        <p className="text-lg font-semibold text-slate-500">Loading applications...</p>
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Applications</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, job, email..."
            className="w-72 rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
              <th className="px-5 py-4">Applicant</th>
              <th className="px-5 py-4">Job</th>
              <th className="px-5 py-4">Experience</th>
              <th className="px-5 py-4">Contact</th>
              <th className="px-5 py-4">Resume</th>
              <th className="px-5 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                  <Briefcase className="mx-auto mb-2" size={24} />
                  No applications yet
                </td>
              </tr>
            ) : (
              filtered.map((app) => (
                <tr key={app.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">{app.applicant_name}</p>
                    <p className="text-xs text-slate-400">{app.location}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium">{app.job_title}</p>
                    <p className="text-xs text-slate-400">{app.company}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{app.experience}</td>
                  <td className="px-5 py-4">
                    <p className="text-slate-600">{app.email}</p>
                    <p className="text-xs text-slate-400">{app.phone}</p>
                  </td>
                  <td className="px-5 py-4">
                    <a
                      href={app.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-amber-600 hover:text-amber-700"
                    >
                      View <ExternalLink size={14} />
                    </a>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-400">
                    {app.created_at ? new Date(app.created_at).toLocaleDateString() : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
