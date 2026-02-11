import React, { useEffect, useState } from "react";
import api from "./axios";
import { Link } from "react-router-dom";
import StudentCardSkeleton from "./StudentSkeleton";
import StudentTableSkeleton from "./StudentTableSkeleton";

function Students() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    fetchStudents(page);
  }, [page]);

  const fetchStudents = async (pageNumber) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/admin/student?page=${pageNumber}&limit=${limit}`
      );
      setStudents(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-4">
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-100">
          Students
        </h1>
        <p className="text-gray-400 text-sm">
          Manage registered students
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
        
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-750 text-gray-300">
              <tr className="border-b border-gray-700">
                <th className="px-6 py-3 text-left font-medium">ID</th>
                <th className="px-6 py-3 text-left font-medium">Name</th>
                <th className="px-6 py-3 text-left font-medium">Email</th>
                <th className="px-6 py-3 text-left font-medium">Department</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <StudentTableSkeleton />
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-6 text-center text-gray-400">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-gray-700 hover:bg-gray-700/40 transition"
                  >
                    <td className="px-6 py-4">{s.id}</td>

                    <td className="px-6 py-4">
                      <Link
                        to={`/admin/student/edit/${s.id}`}
                        className="text-blue-400 hover:text-blue-300 hover:underline transition"
                      >
                        {s.username}
                      </Link>
                    </td>

                    <td className="px-6 py-4 text-gray-300">
                      {s.email}
                    </td>

                    <td className="px-6 py-4 text-gray-300">
                      {s.department}
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-gray-700 text-gray-300">
                        Inactive
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-700">
          {loading ? (
            <StudentCardSkeleton />
          ) : students.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              No students found
            </div>
          ) : (
            students.map((s) => (
              <div key={s.id} className="p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">ID</span>
                  <span>{s.id}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Name</span>
                  <Link
                    to={`/admin/student/edit/${s.id}`}
                    className="text-blue-400"
                  >
                    {s.username}
                  </Link>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Email</span>
                  <span>{s.email}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Department</span>
                  <span>{s.department}</span>
                </div>

                <span className="inline-block text-xs bg-gray-700 px-3 py-1 rounded-full">
                  Inactive
                </span>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 px-6 py-4 border-t border-gray-700">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-40 transition"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-md transition ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-40 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Students;
