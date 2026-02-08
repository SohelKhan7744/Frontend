import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./axios";

function StudentOnboarding() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    age: "",
    rollNumber: "",
    department: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/students/profile", form);
      navigate("/student/dashboard");
    } catch (err) {
      setError(err.response?.data || "Profile creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-xl w-96 flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-center text-white">
          Student Onboarding
        </h2>

        <p className="text-sm text-gray-400 text-center">
          Complete your profile to start enrolling in courses
        </p>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
          className="px-4 py-2 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          name="rollNumber"
          placeholder="Roll Number"
          value={form.rollNumber}
          onChange={handleChange}
          required
          className="px-4 py-2 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
          className="px-4 py-2 rounded bg-gray-700 text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 py-2 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Complete Profile"}
        </button>
      </form>
    </div>
  );
}

export default StudentOnboarding;
