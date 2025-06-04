import { useEffect, useState } from 'react';
import { listSavedPersonas, deleteSavedPersona } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

export default function PersonaDashboard({ onView }) {
  const [personas, setPersonas] = useState([]);
  const { session } = useAuth();

  const fetchPersonas = async () => {
    if (!session) return;
    try {
      const list = await listSavedPersonas(session.access_token);
      setPersonas(list);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPersonas();
  }, [session]);

  const handleDelete = async (id) => {
    await deleteSavedPersona(id, session.access_token);
    fetchPersonas();
  };

  if (!session) {
    return <p className="p-6 text-center">Sign in to view saved personas.</p>;
  }

  if (personas.length === 0) {
    return <p className="p-6 text-center text-gray-500">No personas saved yet.</p>;
  }

  return (
    <div className="p-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {personas.map((p) => (
        <div key={p.id} className="bg-white shadow rounded p-4">
          <h3 className="font-semibold">{p.name}</h3>
          <p className="text-xs text-gray-500 mb-3">{p.type}</p>
          <div className="flex gap-2">
            <button
              onClick={() => onView(p.id)}
              className="bg-purple-600 text-white px-3 py-1 rounded"
            >
              View
            </button>
            <button
              onClick={() => handleDelete(p.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
