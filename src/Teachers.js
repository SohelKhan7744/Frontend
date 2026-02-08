import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./axios";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
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
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <h1>Teachers</h1>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Teachers List</h3>
            </div>

            <div className="card-body p-0">
              {loading ? (
                <div className="p-3">Loading...</div>
              ) : (
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Qualifications</th>
                      <th>Experience</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No teachers found
                        </td>
                      </tr>
                    ) : (
                      teachers.map((t) => (
                        <tr key={t.id}>
                          <td>{t.id}</td>
                          <td>
                            <Link to={`/admin/teacher/edit/${t.id}`}>
                              {t.username}
                            </Link>
                          </td>
                          <td>
                          <Link to ={`/admin/teacher/assign/${t.username}`}>
                          {t.email}
                          </Link>
                          </td>
                          <td>{t.qualifications}</td>
                          <td>{t.experience} yrs</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            <div className="card-footer clearfix">
              <ul className="pagination pagination-sm float-right">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setPage(page - 1)}
                  >
                    «
                  </button>
                </li>

                {[...Array(totalPages)].map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      page === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    page === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(page + 1)}
                  >
                    »
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Teachers;
