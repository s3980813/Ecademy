import { useAuth } from "../hooks/useAuth";

export default function Sidebar() {
    const { logout } = useAuth();
    
    const handleLogout = async () => {
        await logout();
    };

    return (
        <aside className="w-64 bg-[#1E293B] text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">🎓 Ecademy</h2>
        <nav className="flex flex-col gap-4 text-lg">
          <a href="/teacher-dashboard" className="hover:text-yellow-400">🏠 Dashboard</a>
          <a href="/teacher-dashboard/question-set" className="hover:text-yellow-400">🧠 Question Sets</a>
          <a href="/teacher-dashboard/test" className="hover:text-yellow-400">📝 Tests</a>
        </nav>
        <button 
          onClick={handleLogout} 
          className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
        >
          Logout
        </button>
      </aside>
    );
}