import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children, isTeacher, isStudent }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Checking authentication...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // if the page requires a teacher and the user is not a teacher, redirect to the home page
    if (isTeacher && !user.isTeacher) {
        return <Navigate to="/" replace />;
    }

    // if the page requires a student and the user is not a student, redirect to the home page
    if (isStudent && user.isTeacher) {
        return <Navigate to="/" replace />;
    }

    return children;
}
