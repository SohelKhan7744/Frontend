import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "./axios";
import { redirectByRole } from "./redirectByrole";
function TeacherOnboarding() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    experience: "",
    qualifications: "",
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
      await api.post("/teachers/profile", form);
      toast.success("Profile completed 🎉");
      navigate(redirectByRole);
      navigate("/teachers/dashboard")
    } catch (err) {
      setError(err.response?.data || "Profile creation failed");
       toast.error("Teacher profile already exists");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg w-96"
      >
        <h2 className="text-xl font-bold mb-4">Teacher Onboarding</h2>

        <p className="text-sm text-gray-400 text-center">
          Complete your profile to start enrolling in courses
        </p>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        <input
          type="number"
          name="experience"
          placeholder="Experience (years)"
          value={form.experience}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-700"
          required
        />

        <input
          name="qualifications"
          placeholder="Qualifications"
          value={form.qualifications}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-700"
          required
        />

        <button className="w-full bg-blue-600 py-2 rounded"
         type="Submit"
         disabled ={loading}>
           {loading ? "Saving..." : "Complete Profile"}
        </button>
      </form>
    </div>
  );
}

export default TeacherOnboarding;
