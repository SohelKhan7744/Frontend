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
 <div className="w-full">
  {/* Header */}
  <div className="mb-6">
    <h1 className="text-2xl font-semibold text-slate-200">
      Students
    </h1>
    <p className="text-slate-400 text-sm">
      Manage registered students
    </p>
  </div>

  {/* Card Wrapper */}
  <div className="bg-[#111c2d] border border-[#1e293b] rounded-lg shadow-md overflow-hidden">
    
    {/* Table */}
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-sm text-slate-300">
        <thead>
          <tr className="border-b border-[#1e293b] text-slate-400 bg-[#1a2436]">
            <th className="px-6 py-3 text-left font-medium">ID</th>
            <th className="px-6 py-3 text-left font-medium">Name</th>
            <th className="px-6 py-3 text-left font-medium">Email</th>
            <th className="px-6 py-3 text-left font-medium">Department</th>
            <th className="px-6 py-3 text-left font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr
              key={s.id}
              className="border-b border-[#1e293b] hover:bg-[#243244] transition"
            >
              <td className="px-6 py-3">{s.id}</td>
              <td className="px-6 py-3">
                <Link
                  to={`/admin/student/edit/${s.id}`}
                  className="text-blue-400 hover:text-blue-300 transition"
                >
                  {s.username}
                </Link>
              </td>
              <td className="px-6 py-3">{s.email}</td>
              <td className="px-6 py-3">{s.department}</td>
              <td className="px-6 py-3">
                <span className="px-3 py-1 text-xs rounded-full bg-[#1a2436] text-slate-300 border border-[#243244]">
                  Inactive
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Pagination */}
    <div className="flex justify-end items-center gap-3 px-6 py-4 border-t border-[#1e293b] bg-[#111c2d]">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-4 py-2 rounded-md bg-[#1a2436] hover:bg-[#243244] text-slate-300 disabled:opacity-40 transition"
      >
        Prev
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-4 py-2 rounded-md transition ${
            page === i + 1
              ? "bg-blue-600 text-white"
              : "bg-[#1a2436] hover:bg-[#243244] text-slate-300"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 rounded-md bg-[#1a2436] hover:bg-[#243244] text-slate-300 disabled:opacity-40 transition"
      >
        Next
      </button>
    </div>
  </div>
</div>
);

}
export default Students;