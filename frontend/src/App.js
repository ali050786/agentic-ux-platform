import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import HeaderBar from "./components/HeaderBar";
import PersonaBuilder from "./components/persona/PersonaBuilder";
import PersonaDashboard from "./components/persona/PersonaDashboard";
import PersonaViewer from "./components/persona/PersonaViewer";
import { useAuth } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { session } = useAuth();
  return session ? children : <Navigate to="/builder" />;
}

function App() {
  return (
    <main className="min-h-screen bg-gray-100 font-sans">
      <Router>
        <HeaderBar />
        <Routes>
          <Route path="/builder" element={<PersonaBuilder />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <PersonaDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/persona/:id"
            element={
              <PrivateRoute>
                <PersonaBuilder />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/builder" />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
