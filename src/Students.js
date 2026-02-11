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
  <div className="relative px-8 py-6">

    {/* Soft Gradient Background Like Dashboard */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-850 to-gray-900 opacity-70 pointer-events-none"></div>

    <div className="relative z-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white">
          Students
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage registered students
        </p>
      </div>

      {/* Glass Card */}
      <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700/60 text-gray-300">
                <th className="px-8 py-4 text-left font-medium">ID</th>
                <th className="px-8 py-4 text-left font-medium">Name</th>
                <th className="px-8 py-4 text-left font-medium">Email</th>
                <th className="px-8 py-4 text-left font-medium">Department</th>
                <th className="px-8 py-4 text-left font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <StudentTableSkeleton />
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-8 text-center text-gray-400">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-gray-700/40 hover:bg-gray-700/30 transition duration-200"
                  >
                    <td className="px-8 py-5">{s.id}</td>

                    <td className="px-8 py-5">
                      <Link
                        to={`/admin/student/edit/${s.id}`}
                        className="text-blue-400 hover:text-blue-300 transition"
                      >
                        {s.username}
                      </Link>
                    </td>

                    <td className="px-8 py-5 text-gray-300">
                      {s.email}
                    </td>

                    <td className="px-8 py-5 text-gray-300">
                      {s.department}
                    </td>

                    <td className="px-8 py-5">
                      <span className="px-3 py-1 text-xs rounded-full bg-gray-700/70 text-gray-300">
                        Inactive
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-3 px-8 py-5">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded-lg bg-gray-700/70 hover:bg-gray-600 transition disabled:opacity-40"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-lg transition ${
                page === i + 1
                  ? "bg-blue-600 shadow-lg"
                  : "bg-gray-700/70 hover:bg-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-lg bg-gray-700/70 hover:bg-gray-600 transition disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
);
}