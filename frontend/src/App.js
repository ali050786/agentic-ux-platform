import HeaderBar from "./components/HeaderBar";
import PersonaBuilder from "./components/persona/PersonaBuilder";

function App() {
  return (
    <main className="min-h-screen bg-gray-100 font-sans">
      <HeaderBar />
      <PersonaBuilder />
    </main>
  );
}

export default App;