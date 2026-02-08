import { useEffect, useState } from "react";
import {
  getTeacherCourses,
  getAllCourses,
  assignCourseToSelf,
  getStudentsOfCourse
} from "./Service";
import { toast } from "react-toastify";

function TeacherDashboard() {
  const [myCourses, setMyCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assigningId, setAssigningId] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [myRes, allRes] = await Promise.all([
        getTeacherCourses(),
        getAllCourses()
      ]);

      setMyCourses(myRes.data);
      setAllCourses(allRes.data);
    } catch {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (courseId) => {
    try {
      setAssigningId(courseId);
      await assignCourseToSelf(courseId);
      toast.success("Course assigned to you 🎓");
      loadDashboard();
    } catch (err) {
  if (err.response?.status === 409) {
    toast.info("Course already assigned");
  } else if (err.response?.status === 403) {
    toast.error("You are not allowed to assign this course");
  } else {
    toast.error("Assignment failed");
  }
}
 finally {
      setAssigningId(null);
    }
  };

  const viewStudents = async (course) => {
    try {
      const res = await getStudentsOfCourse(course.id);
      setStudents(res.data);
      setSelectedCourse(course);
    } catch {
      toast.error("Not allowed to view students");
    }
  };

  if (loading) {
    return <p className="text-center text-white mt-10">Loading...</p>;
  }

  return (
    <div className="p-8 text-white space-y-10">

    
      <h1 className="text-3xl font-bold">Teacher Dashboard</h1>

  
      <section>
        <h2 className="text-2xl font-semibold mb-3">My Courses</h2>

        {myCourses.length === 0 ? (
          <p className="text-gray-400">You have not assigned any courses.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {myCourses.map(course => (
              <div key={course.id} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-bold">{course.title}</h3>
                <p className="text-gray-300 text-sm">{course.description}</p>

                <button
                  onClick={() => viewStudents(course)}
                  className="mt-3 bg-blue-600 px-4 py-1 rounded"
                >
                  View Students
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

    
      <section>
        <h2 className="text-2xl font-semibold mb-3">All Courses</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {allCourses.map(course => {
            const owned = myCourses.some(c => c.id === course.id);

            return (
              <div key={course.id} className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-xl font-bold">{course.title}</h3>
                <p className="text-gray-300 text-sm">{course.description}</p>

                <button
                  disabled={owned || assigningId === course.id}
                  onClick={() => handleAssign(course.id)}
                  className={`mt-3 px-4 py-1 rounded
                    ${owned
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                  {owned
                    ? "Assigned"
                    : assigningId === course.id
                      ? "Assigning..."
                      : "Assign to Me"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* STUDENTS MODAL */}
      {selectedCourse && (
        <div className="bg-black/70 fixed inset-0 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                Students – {selectedCourse.title}
              </h2>
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  setStudents([]);
                }}
                className="text-red-400"
              >
                Close
              </button>
            </div>

            {students.length === 0 ? (
              <p className="text-gray-400">No students enrolled.</p>
            ) : (
              <table className="w-full border border-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-2 text-left">Username</th>
                    <th className="p-2 text-left">Roll No</th>
                    <th className="p-2 text-left">Department</th>
                    <th className="p-2 text-left">Age</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.id} className="border-t border-gray-700">
                      <td className="p-2">{s.user.username}</td>
                      <td className="p-2">{s.rollNumber}</td>
                      <td className="p-2">{s.department}</td>
                      <td className="p-2">{s.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default TeacherDashboard;
