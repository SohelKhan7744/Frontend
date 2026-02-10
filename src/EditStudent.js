import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./axios";
import EditSkeleton from "./EditSkeliton";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    department: "",
    year: ""
  });

  useEffect(() => {
    api
      .get(`/admin/student/${id}`)
      .then((res) => {
        setForm(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert("Failed to load student");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    try {
      await api.put(`/admin/student/${id}`, form);
      navigate("/admin/student");
    } catch (err) {
      if (err.response?.status === 400 || err.response?.status === 409) {
        setErrors(err.response.data.errors || {});
      } else {
        alert("Update failed");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <EditSkeleton />;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="max-w-xl mx-auto bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-xl font-bold mb-6">Edit Student</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="text-sm text-gray-400">Username</label>
            <input
              value={form.username}
              disabled
              className="w-full mt-1 px-3 py-2 rounded bg-gray-700 text-gray-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 rounded bg-gray-700 text-white
                ${errors.email ? "border border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-400">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 rounded bg-gray-700 text-white
                ${errors.phone ? "border border-red-500" : ""}`}
            />
            {errors.phone && (
              <p className="text-red-400 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="text-sm text-gray-400">Department</label>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded bg-gray-700 text-white"
            />
          </div>

          {/* Year */}
          <div>
            <label className="text-sm text-gray-400">Year</label>
            <input
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 rounded bg-gray-700 text-white
                ${errors.year ? "border border-red-500" : ""}`}
            />
            {errors.year && (
              <p className="text-red-400 text-sm">{errors.year}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Update Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;
