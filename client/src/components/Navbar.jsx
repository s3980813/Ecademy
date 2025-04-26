import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
    const { logout, user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-[#1E293B] text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">🎓 Ecademy</h1>
            <button 
                className="md:hidden text-2xl focus:outline-none" 
                onClick={toggleMenu}
            >
                ☰
            </button>
            <nav className={`md:flex md:items-center md:gap-4 ${isOpen ? "block" : "hidden"} absolute md:static top-16 left-0 w-full bg-[#1E293B] md:w-auto md:bg-transparent`}>
                {user.isTeacher ? (
                    <>
                        <a href="/teacher-dashboard" className="block px-4 py-2 hover:text-yellow-400">🏠 Dashboard</a>
                        <a href="/teacher-dashboard/question-set" className="block px-4 py-2 hover:text-yellow-400">🧠 Question Sets</a>
                        <a href="/teacher-dashboard/test" className="block px-4 py-2 hover:text-yellow-400">📝 Tests</a>
                    </>
                ) : (
                    <>
                        <a href="/student-dashboard" className="block px-4 py-2 hover:text-yellow-400">🏠 Dashboard</a>
                        <a href="/student-dashboard/test" className="block px-4 py-2 hover:text-yellow-400">📝 Assigned Tests</a>
                        <a href="/student-dashboard/test-search" className="block px-4 py-2 hover:text-yellow-400">🔍 Search Tests</a>
                    </>
                )}
                <button 
                    onClick={handleLogout} 
                    className="block mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                >
                    Logout
                </button>
            </nav>
        </header>
    );
}
