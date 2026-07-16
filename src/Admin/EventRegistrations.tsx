import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CalendarCheck, Search } from "lucide-react";

type EventRegistration = {
  id: string;
  event_id: string;
  attendee_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  notes: string | null;
  created_at: string;
  events: { title: string } | null;
};

export default function EventRegistrations() {
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    supabase
      .from("event_registrations")
      .select("*, events(title)")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setRegistrations(data as EventRegistration[]);
        setLoading(false);
      });
  }, []);

  const filtered = registrations.filter(
    (r) =>
      r.attendee_name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      (r.events?.title ?? "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex items-center justify-center p-20">
        <p className="text-lg font-semibold text-slate-500">Loading registrations...</p>
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Event Registrations</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, event..."
            className="w-72 rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Event</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Phone</th>
              <th className="px-5 py-4">Company</th>
              <th className="px-5 py-4">Notes</th>
              <th className="px-5 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                  <CalendarCheck className="mx-auto mb-2" size={24} />
                  No registrations yet
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-5 py-4 font-semibold text-slate-900">{r.attendee_name}</td>
                  <td className="px-5 py-4 text-slate-600">{r.events?.title ?? "-"}</td>
                  <td className="px-5 py-4 text-slate-600">{r.email}</td>
                  <td className="px-5 py-4 text-slate-600">{r.phone ?? "-"}</td>
                  <td className="px-5 py-4 text-slate-600">{r.company ?? "-"}</td>
                  <td className="px-5 py-4 max-w-xs truncate text-slate-500">{r.notes ?? "-"}</td>
                  <td className="px-5 py-4 text-xs text-slate-400">
                    {r.created_at ? new Date(r.created_at).toLocaleDateString() : "-"}
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
