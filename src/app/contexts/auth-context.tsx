import type { User } from "@supabase/supabase-js";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { usePeladaStore } from "@/store/pelada/pelada.store";
import { supabase } from "../lib/supabase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const resetPelada = usePeladaStore((state) => state.resetPelada);

  useEffect(() => {
    async function loadSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      if (!session) {
        resetPelada();
      }
      setLoading(false);
    }
    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);

      if (!session) {
        resetPelada();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [resetPelada]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
