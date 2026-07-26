import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, error, signIn, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-slate-950 text-amber-400">
            <LogIn size={32} />
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold text-slate-950">Admin Access</h1>
          <p className="mt-2 text-sm text-slate-600">Sign in to manage the portal.</p>

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 text-left">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form
            onSubmit={(e) => { e.preventDefault(); signIn(email, password); }}
            className="mt-6 space-y-4 text-left"
          >
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</label>
              <div className="relative mt-1">
                <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError(); }}
                  placeholder="admin@susta.com"
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</label>
              <div className="relative mt-1">
                <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError(); }}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-slate-800"
            >
              Sign In
            </button>
          </form>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
