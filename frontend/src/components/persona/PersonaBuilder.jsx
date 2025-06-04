import { useState } from "react";
import PersonaForm from "./PersonaForm";
import PersonaPreview from "./PersonaPreview";
import { generatePersona, savePersonaExport } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

export default function PersonaBuilder({ onPersonaGenerated }) {
  const [loading, setLoading] = useState(false);
  const [personaData, setPersonaData] = useState(null);
  const { session } = useAuth();

  const handleGenerate = async (formData) => {
    try {
      console.log("➡️ Sending request:", formData);
      setLoading(true);
      const result = await generatePersona(formData);
      console.log("✅ Response:", result);
      setPersonaData(result);
      if (session) {
        const { id } = await savePersonaExport(
          { project_id: formData.project_name, type: result.type, persona_json: result },
          session.access_token
        );
        if (onPersonaGenerated) {
          onPersonaGenerated(id);
        }
      }
    } catch (error) {
      console.error("❌ Error from API:", error);
      alert("Something went wrong while generating persona.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <aside className="w-full md:w-1/3 p-4 bg-white border-r overflow-y-auto">
        <PersonaForm onGenerate={handleGenerate} loading={loading} />
      </aside>
      <section className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <PersonaPreview persona={personaData} loading={loading} />
      </section>
    </div>
  );
}
