import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./axios";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
  username: "",
  email: "",
  phone: "",
  image_url: "",
  qualification: "",
  experience: ""
});


  // 🔹 Load existing student data (prefill)
  useEffect(() => {
    api.get(`/admin/student/${id}`)
      .then(res => {
        setForm(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to load student");
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
      alert("Student updated successfully");
      navigate("/admin/teacher");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading student data...</div>;
  }

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <h1>Edit Student</h1>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">

              <form onSubmit={handleSubmit}>

                {/* Username */}
                <div className="form-group">
                  <label>Username</label>
                  <input
                    className="form-control"
                    name="username"
                    value={form.username}
                    disabled
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label>Email</label>
                  <input
                    className="form-control"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    className="form-control"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Department */}
                <div className="form-group">
                  <label>Department</label>
                  <input
                    className="form-control"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                  />
                </div>

                {/* Roll Number */}
                <div className="form-group">
                  <label>Roll Number</label>
                  <input
                    className="form-control"
                    name="rollNumber"
                    value={form.rollNumber}
                    onChange={handleChange}
                  />
                </div>

                {/* Age */}
                <div className="form-group">
                  <label>Age</label>
                  <input
                    className="form-control"
                    type="number"
                    name="age"
                    value={form.age}
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
                    {saving ? "Saving..." : "Update Student"}
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

export default EditStudent;
