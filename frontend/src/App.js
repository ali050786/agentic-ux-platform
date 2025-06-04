import { useState } from "react";
import HeaderBar from "./components/HeaderBar";
import PersonaBuilder from "./components/persona/PersonaBuilder";
import PersonaDashboard from "./components/persona/PersonaDashboard";
import PersonaViewer from "./components/persona/PersonaViewer";

function App() {
  const [view, setView] = useState("builder");
  const [selectedPersonaId, setSelectedPersonaId] = useState(null);

  const handlePersonaGenerated = (id) => {
    setSelectedPersonaId(id);
  };

  const handleView = (id) => {
    setSelectedPersonaId(id);
    setView("view");
  };

  let content = null;
  if (view === "builder") {
    content = (
      <PersonaBuilder onPersonaGenerated={handlePersonaGenerated} />
    );
  } else if (view === "dashboard") {
    content = <PersonaDashboard onView={handleView} />;
  } else if (view === "view" && selectedPersonaId) {
    content = (
      <PersonaViewer
        personaId={selectedPersonaId}
        onBack={() => setView("dashboard")}
      />
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 font-sans">
      <HeaderBar onNavigate={setView} />
      {content}
    </main>
  );
}

export default App;
