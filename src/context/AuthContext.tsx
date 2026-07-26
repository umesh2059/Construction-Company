import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

const ADMIN_EMAIL =
  import.meta.env.VITE_ADMIN_EMAIL?.trim().toLowerCase() || "";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAdmin = (user: User | null) => {
    if (!user) return null;

    const email = user.email?.trim().toLowerCase();

    if (email !== ADMIN_EMAIL) {
      supabase.auth.signOut();
      return null;
    }

    return user;
  };

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(checkAdmin(session?.user ?? null));
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(checkAdmin(session?.user ?? null));
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setError(null);

    const enteredEmail = email.trim().toLowerCase();

    if (enteredEmail !== ADMIN_EMAIL) {
      setError("Access denied. Only the administrator can sign in.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: enteredEmail,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    if (data.user?.email?.trim().toLowerCase() !== ADMIN_EMAIL) {
      await supabase.auth.signOut();
      setError("Access denied.");
      return;
    }

    setUser(data.user);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAdmin:
          user?.email?.trim().toLowerCase() === ADMIN_EMAIL,
        signIn,
        signOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}