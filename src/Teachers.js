import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./axios";
import TableSkeleton from "./SkeletonTable";
import CardSkeleton from "./SkeletonCard";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    fetchTeachers(page);
  }, [page]);

  const fetchTeachers = async (pageNumber) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/admin/teacher?page=${pageNumber}&limit=${limit}`
      );
      setTeachers(res.data.data);
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
        <h1 className="text-2xl font-bold">Teachers</h1>
        <p className="text-gray-400 text-sm">Manage faculty members</p>
      </div>

      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Qualifications</th>
                <th className="px-4 py-3">Experience</th>
              </tr>
            </thead>

            {loading ? (
              <TableSkeleton />
            ) : (
              <tbody>
                {teachers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-6 text-center">
                      No teachers found
                    </td>
                  </tr>
                ) : (
                  teachers.map((t) => (
                    <tr
                      key={t.id}
                      className="border-t border-gray-700 hover:bg-gray-700/40"
                    >
                      <td className="px-4 py-3">{t.id}</td>
                      <td className="px-4 py-3">
                        <Link
                          to={`/admin/teacher/edit/${t.id}`}
                          className="text-blue-400 hover:underline"
                        >
                          {t.username}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          to={`/admin/teacher/assign/${t.username}`}
                          className="text-blue-400 hover:underline"
                        >
                          {t.email}
                        </Link>
                      </td>
                      <td className="px-4 py-3">{t.qualifications}</td>
                      <td className="px-4 py-3">{t.experience} yrs</td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>

        {/* Mobile Cards */}
        {loading ? (
          <CardSkeleton />
        ) : (
          <div className="md:hidden divide-y divide-gray-700">
            {teachers.length === 0 ? (
              <div className="p-4 text-center">No teachers found</div>
            ) : (
              teachers.map((t) => (
                <div key={t.id} className="p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">ID</span>
                    <span>{t.id}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Name</span>
                    <Link
                      to={`/admin/teacher/edit/${t.id}`}
                      className="text-blue-400"
                    >
                      {t.username}
                    </Link>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Email</span>
                    <Link
                      to={`/admin/teacher/assign/${t.username}`}
                      className="text-blue-400"
                    >
                      {t.email}
                    </Link>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Qualifications</span>
                    <span>{t.qualifications}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Experience</span>
                    <span>{t.experience} yrs</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

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

export default Teachers;
