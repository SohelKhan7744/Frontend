import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./Protected";

import AdminLayout from "./AdminOutlat";
import DashboardPage from "./DashBoardPage";
import Students from "./Students";
import EditStudent from "./EditStudent";
import Teachers from "./Teachers";
import EditTeacher from "./EditTeacher";
import AssignTeacherToCourse from "./AssignTeacher";
import Courses from "./Courses";
import EditCourse from "./EditCourse";

function App() {
  return (
    <>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="student" element={<Students />} />
          <Route path="student/edit/:id" element={<EditStudent />} />
          <Route path="teacher" element={<Teachers />} />
          <Route path="teacher/edit/:id" element={<EditTeacher />} />
          <Route path="teacher/assign/:username" element={<AssignTeacherToCourse />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/edit/:id" element={<EditCourse />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="dark"
      />
    </>
  );
}

export default App;
