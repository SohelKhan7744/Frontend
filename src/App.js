import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Login";
import Register from "./Register";
import DashboardPage from "./DashBoardPage";
import ProtectedRoute from "./Protected";
import StudentOnboarding from "./StudentOnborading";
import StudentDashboard from "./StudentDashboard";
import TeacherOnboarding from "./TeacherOnboard";
import TeacherDashboard from "./TeacherDashboard";
import Students from "./Students";
import EditStudent from "./EditStudent";
import Teachers from "./Teachers";
import EditTeacher from "./EditTeacher";
import AssignTeacherToCourse from "./AssignTeacher";
import Courses from "./Courses";
import EditCourse from "./EditCourse";

function App() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
    
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Admin App</h1>

        <div className="flex gap-6">
          {!isLoggedIn && (
            <>
              <Link className="hover:text-blue-400" to="/login">Login</Link>
              <Link className="hover:text-blue-400" to="/register">Register</Link>
            </>
          )}

          {isLoggedIn && (
            <>
              
              <button
                onClick={logout}
                className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div className="min-h-[85vh]">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student/onboarding" element={<StudentOnboarding />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/teachers/onboarding" element={<TeacherOnboarding/>}/>
          <Route path="/teachers/dashboard" element={<TeacherDashboard/>}/>
          <Route path="/admin/student" element={<Students/>}/>
          <Route path="/admin/student/edit/:id" element={<EditStudent />} />
          <Route path="/admin/teacher" element={<Teachers />} />
          <Route path="/admin/teacher/edit/:id" element={<EditTeacher />} />
          <Route path="/admin/teacher/assign/:username" element ={<AssignTeacherToCourse/>}/>
          <Route path="admin/courses" element={<Courses/>} />
          <Route path="/admin/courses/edit/:id" element={<EditCourse />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
