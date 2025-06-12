import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Rocket } from "lucide-react";

export default function HeaderBar() {
  const { user, signIn, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isBuilder = location.pathname === "/builder";
  const isDashboard = location.pathname === "/dashboard";

  return (
    <header
      className="fixed left-1/2 transform -translate-x-1/2 py-3 px-6 text-sm flex justify-between items-center z-50 w-full max-w-[1200px] md:max-w-[900px] sm:max-w-full border border-purple-200 bg-white"
      style={{ top: "20px", borderRadius: "40px", color: "#333333", boxShadow: "0 2px 12px 0 rgba(80, 0, 120, 0.07)" }}
    >
      <span className="font-semibold text-lg"><Rocket className="inline w-5 h-5 mr-1 align-text-bottom text-purple-600" /> Open UX Lab</span>
      <div className="flex gap-4 items-center">
        {!isBuilder && !isDashboard && (
          <Button className="bg-purple-600 px-3 py-1 rounded" onClick={() => navigate('/builder')}>
          Generate Persona
        </Button>
        )}
        {isDashboard && (
          <Button className="bg-purple-600 px-3 py-1 rounded" onClick={() => navigate('/builder')}>
            Generate Persona
          </Button>
        )}
        {user && !isDashboard ? (
          <Button className="bg-purple-600 px-3 py-1 rounded" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
        ) : null}
        {user ? (
          <>
            <span className="text-xs">Hi, {(() => {
              const name = user.user_metadata?.full_name;
              if (name) return name.split(' ')[0];
              if (user.email) return user.email.split('@')[0];
              return '';
            })()}</span>
            <button onClick={signOut} className="bg-white text-purple-700 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <button onClick={signIn} className="bg-white text-purple-700 px-3 py-1 rounded">
            Log in with Google
          </button>
        )}
      </div>
    </header>
  );
}
