import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./axios";
import EditCourseSkeleton from "./EditCourseSkeleton";
import { toast } from "react-toastify";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.get(`/${id}`)
      .then(res => {
        setForm({
          title: res.data.title,
          description: res.data.description
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to load course");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    try {
      await api.put(`/${id}`, form);
      navigate("/admin/courses");
    } catch (err) {
      if (err.response?.status === 400) {
        setErrors(err.response.data.errors || {});
      } else {
        alert("Update failed");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <EditCourseSkeleton />;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="max-w-xl mx-auto bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-xl font-bold mb-6">Edit Course</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="text-sm text-gray-400">Course Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 rounded bg-gray-700 text-white
                ${errors.title ? "border border-red-500" : ""}`}
            />
            {errors.title && (
              <p className="text-red-400 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-400">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full mt-1 px-3 py-2 rounded bg-gray-700 text-white"
            />
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
              {saving ? "Saving..." : "Update Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourse;
