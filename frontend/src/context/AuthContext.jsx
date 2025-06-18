import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
      setSession(data?.session || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session);
      setUser(session?.user || null);
      setSession(session);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      window.location.href = 'https://agenticpersona-k1lhmsyz5-ali050786-gmailcoms-projects.vercel.app/builder';
    } catch (err) {
      alert("Unexpected error: " + err.message);
      console.error(err);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
