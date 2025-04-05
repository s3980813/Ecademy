import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-secondary text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold text-primary">
                        Ecademy
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <Link to="/teacher-dashboard" className="hover:text-accent transition">Home</Link>
                        <Link to="/teacher-dashboard/question-set" className="hover:text-accent transition">Question Sets</Link>
                        <Link to="/profile" className="hover:text-accent transition">Profile</Link>
                    </div>

                    {/* Right side: login/avatar */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <span>{user.username}</span>
                                <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 transition">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile hamburger */}
                    <div className="md:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                                viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    <Link to="/" className="block hover:text-accent" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/question-sets" className="block hover:text-accent" onClick={() => setMenuOpen(false)}>Question Sets</Link>
                    <Link to="/profile" className="block hover:text-accent" onClick={() => setMenuOpen(false)}>Profile</Link>
                    {user ? (
                        <button onClick={() => { logout(); setMenuOpen(false); }} className="block text-left w-full text-red-500">
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="block text-blue-500" onClick={() => setMenuOpen(false)}>
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
