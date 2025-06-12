import { useEffect, useState } from 'react';
import { listSavedPersonas, deleteSavedPersona } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FileUser, Eye, Trash2 } from "lucide-react";

export default function PersonaDashboard() {
  const [personas, setPersonas] = useState([]);
  const { session } = useAuth();
  const navigate = useNavigate();
  const [moreOpenId, setMoreOpenId] = useState(null);

  const fetchPersonas = async () => {
    if (!session) return;
    try {
      const list = await listSavedPersonas(session.access_token);
      console.log('Dashboard personas JSON:', list);
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
    <div className="w-full max-w-[1200px] mx-auto my-40 flex justify-center">
      <div className="p-6 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {personas.map((p) => {
          // Prefer title, then role, then type for designation
          const designation = p.title || p.role || p.type || 'Designation';
          return (
            <div key={p.id} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center w-full">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow mb-4">
                {p.profile_image_url ? (
                  <img src={p.profile_image_url} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400"><FileUser className="w-10 h-10 text-gray-400" /></div>
                )}
              </div>
              <h3 className="font-bold text-xl text-center mb-1">{p.name}</h3>
              <p className="text-gray-500 text-base text-center mb-4">{designation}</p>
              <div className="flex gap-2 w-full justify-center">
                <button
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg flex items-center justify-center text-sm font-medium"
                  onClick={() => navigate(`/persona/${p.id}`)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </button>
                <button
                  className="bg-gray-100 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg flex items-center justify-center"
                  onClick={() => handleDelete(p.id)}
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
