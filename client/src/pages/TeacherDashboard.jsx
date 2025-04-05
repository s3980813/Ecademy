import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TeacherDashboard() {
  const { user, logout } = useAuth();
  const [Sets, setSets] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchSets = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/question-sets/teacher/${user._id}`);
            if (response.status === 200) {
                setSets(response.data);
            } else {
                console.error('Failed to fetch question sets:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching question sets:', error);
        }
    };
    fetchSets();
  }, [user._id, BACKEND_URL]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
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

      {/* Main Content */}
      <main className="flex-1 p-10 bg-background">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {user?.username || "Teacher"} 👋</h1>
        <p className="text-gray-600">Here’s your teaching control center 🧑‍🏫.</p>

        {/* Some dashboard boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          
          <div className="bg-card shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">Question Sets</h2>
            <p className="text-gray-500 mt-2">Manage and edit your question sets.</p>

            {/* Display first 5 question sets */}
            <ul className="mt-4">
              {Sets.slice(0, 5).map((set) => (
                <li key={set._id} className="text-blue-500 hover:underline">
                  <a href={`/teacher-dashboard/question-set/${set._id}`}>
                    <div className="flex items-center justify-between p-2 border border-gray-200">
                      <p className="font-semibold">{set.name}</p>
                      <p className="text-gray-600 text-sm">Easy: {set.easy} | Medium: {set.medium} | Hard: {set.hard}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">Tests Created</h2>
            <p className="text-gray-500 mt-2">View or schedule student tests.</p>
          </div>

          <div className="bg-card shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">Submissions</h2>
            <p className="text-gray-500 mt-2">Review completed tests from students.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
