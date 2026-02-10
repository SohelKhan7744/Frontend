import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./axios";

function EditTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    image_url: "",
    experience: "",
    qualification: ""
  });

  // Load previous data
  useEffect(() => {
    api.get(`/admin/teacher/${id}`)
      .then(res => {
        setForm(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to load teacher");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put(`/admin/teacher/${id}`, form);
      alert("Teacher updated successfully");
      navigate("/admin/teacher");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading teacher data...</div>;
  }

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <h1>Edit Teacher</h1>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>

                <div className="form-group">
                  <label>Username</label>
                  <input
                    className="form-control"
                    value={form.username}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    className="form-control"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Qualifications</label>
                  <input
                    className="form-control"
                    name="qualifications"
                    value={form.qualification}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Experience (years)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Update Teacher"}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditTeacher;
