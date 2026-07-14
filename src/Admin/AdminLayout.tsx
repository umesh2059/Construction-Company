import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, CalendarPlus, Briefcase, LogOut, Building2 } from "lucide-react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/events", label: "Events", icon: CalendarPlus, end: false },
  { to: "/admin/careers", label: "Jobs", icon: Briefcase, end: false },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();

  return (
    <div className="flex min-h-screen bg-stone-50">
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white p-6 md:flex">
        <Link to="/admin" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-amber-400">
            <Building2 size={21} />
          </span>
          <span className="font-display text-base font-bold text-slate-950">Admin Panel</span>
        </Link>

        <nav className="mt-10 flex flex-col gap-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                pathname === to
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="rounded-xl bg-slate-50 p-4 text-xs text-slate-500 break-all">
            <p className="font-semibold text-slate-700">{user?.email}</p>
          </div>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
