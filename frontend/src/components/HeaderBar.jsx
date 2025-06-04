import { useAuth } from "../context/AuthContext";

export default function HeaderBar() {
  const { user, signIn, signOut } = useAuth();

  return (
    <header className="bg-purple-700 text-white py-3 px-6 text-sm flex justify-between items-center">
      <span className="font-semibold text-lg">🚀 OpenUXlab</span>
      {user ? (
        <div className="flex gap-4 items-center">
          <span className="text-xs">Hi, {user.email}</span>
          <button onClick={signOut} className="bg-white text-purple-700 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={signIn} className="bg-white text-purple-700 px-3 py-1 rounded">
          Sign in with Google
        </button>
      )}
    </header>
  );
}
