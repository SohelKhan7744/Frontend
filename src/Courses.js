import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./axios";
import CourseTableSkeleton from "./CourseTableSkeleton";
import CourseCardSkeleton from "./CourseCardSkeleton";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <p className="text-gray-400 text-sm">
          All available courses in the system
        </p>
      </div>

      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Course Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            {loading ? (
              <CourseTableSkeleton />
            ) : (
              <tbody>
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-6 text-center">
                      No courses found
                    </td>
                  </tr>
                ) : (
                  courses.map((c) => (
                    <tr
                      key={c.id}
                      className="border-t border-gray-700 hover:bg-gray-700/40"
                    >
                      <td className="px-4 py-3">{c.id}</td>
                      <td className="px-4 py-3">{c.name}</td>
                      <td className="px-4 py-3">{c.category}</td>
                      <td className="px-4 py-3">{c.duration}</td>
                      <td className="px-4 py-3">
                        <Link
                          to={`/admin/course/edit/${c.id}`}
                          className="text-blue-400 hover:underline"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>

        {/* Mobile Cards */}
        {loading ? (
          <CourseCardSkeleton />
        ) : (
          <div className="md:hidden divide-y divide-gray-700">
            {courses.length === 0 ? (
              <div className="p-4 text-center">No courses found</div>
            ) : (
              courses.map((c) => (
                <div key={c.id} className="p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Course</span>
                    <span>{c.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Category</span>
                    <span>{c.category}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Duration</span>
                    <span>{c.duration}</span>
                  </div>

                  <Link
                    to={`/admin/course/edit/${c.id}`}
                    className="inline-block text-blue-400 text-sm"
                  >
                    Edit Course →
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
