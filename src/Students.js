import React, { useEffect, useState } from "react";
import api from "./axios";
import { Link } from "react-router-dom";
import TableSkeleton from "./SkeletonTable";
import CardSkeleton from "./SkeletonCard";


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
    <div className="p-4 md:p-6 bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Students</h1>
        <p className="text-gray-400 text-sm">Manage registered students</p>
      </div>

      {/* Card */}
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading?(
                  <TableSkeleton/>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr
                    key={s.id}
                    className="border-t border-gray-700 hover:bg-gray-700/40"
                  >
                    <td className="px-4 py-3">{s.id}</td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/admin/student/edit/${s.id}`}
                        className="text-blue-400 hover:underline"
                      >
                        {s.username}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{s.email}</td>
                    <td className="px-4 py-3">{s.department}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs rounded bg-gray-600">
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
           <CardSkeleton/>
          ) : students.length === 0 ? (
            <div className="p-4 text-center">No students found</div>
          ) : (
            students.map((s) => (
              <div key={s.id} className="p-4 space-y-2">
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

                <span className="inline-block text-xs bg-gray-600 px-2 py-1 rounded">
                  Inactive
                </span>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-end gap-2 p-4 border-t border-gray-700">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-blue-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Students;
