import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Load initial session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
      setSession(data?.session || null);
    });

    // Subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session);
      setUser(session?.user || null);
      setSession(session);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: process.env.REACT_APP_AUTH_REDIRECT || "https://agenticpersona.vercel.app/builder", // Uses env var if set
        },
      });
    } catch (err) {
      alert("Unexpected error: " + err.message);
      console.error(err);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (err) {
      console.error("Sign-out error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
