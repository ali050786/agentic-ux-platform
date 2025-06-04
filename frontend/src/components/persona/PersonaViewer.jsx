import { useEffect, useState } from 'react';
import PersonaPreview from './PersonaPreview';
import { getSavedPersona } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

export default function PersonaViewer({ personaId, onBack }) {
  const { session } = useAuth();
  const [persona, setPersona] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (session && personaId) {
        try {
          const data = await getSavedPersona(personaId, session.access_token);
          setPersona(data.persona_json);
        } catch (err) {
          console.error(err);
        }
      }
    }
    fetchData();
  }, [personaId, session]);

  return (
    <div className="p-6">
      <button onClick={onBack} className="mb-4 bg-gray-200 px-3 py-1 rounded">
        ← Back
      </button>
      <PersonaPreview persona={persona} loading={!persona} />
    </div>
  );
}
