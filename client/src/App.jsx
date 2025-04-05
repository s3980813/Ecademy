import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RedirectByRole from "./components/RedirectByRole";
import TeacherDashboard from "./pages/TeacherDashboard";
import QuestionSet from "./pages/QuestionSet";
import QuestionSetDetail from "./pages/QuestionSetDetail";
import Navbar from "./components/Navbar";
import "./App.css";
import Test from "./pages/Test";

export default function App() {
    const location = useLocation();
    const hideNavbar = ['/login', '/register', '/teacher-dashboard/question-set', '/teacher-dashboard', "/teacher-dashboard/question-set/:id"]
        .some(path => location.pathname.startsWith(path));

    return (
        <>
            {!hideNavbar && <Navbar />}
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoutes>
                        <RedirectByRole />
                        </ProtectedRoutes>
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/teacher-dashboard" element={<ProtectedRoutes isTeacher={true}><TeacherDashboard /></ProtectedRoutes>} />
                <Route path="/teacher-dashboard/question-set" element={<ProtectedRoutes isTeacher={true}><QuestionSet /></ProtectedRoutes>} />
                <Route path="/teacher-dashboard/question-set/:id" element={<ProtectedRoutes isTeacher={true}><QuestionSetDetail /></ProtectedRoutes>} />
                <Route path="/teacher-dashboard/test" element={<ProtectedRoutes isTeacher={true}><Test /></ProtectedRoutes>} />
                <Route path="*" element={<div className="flex justify-center items-center h-screen">404 Not Found</div>} />
            </Routes>
        </>
    );
}
