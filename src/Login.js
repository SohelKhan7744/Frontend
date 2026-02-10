
import { useState } from "react";
import { login } from "./Service";
import { useNavigate } from "react-router-dom";
import { redirectByRole } from "./redirectByrole";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();

  if (loading) return; // extra safety

  setLoading(true);
  try {
    await login(username, password);
    redirectByRole(navigate);
  } catch {
    toast.error("Invalid credentials");
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="w-full max-w-md bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="text"
            placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-700 text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

         <button
  type="submit"
  disabled={loading}
  className={`
    w-full flex items-center justify-center gap-2 py-3 rounded-lg
    font-semibold text-white transition-all duration-300
    ${
      loading
        ? "bg-blue-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 active:scale-95"
    }
  `}
>
  {loading ? (
    <>
      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      Logging in...
    </>
  ) : (
    "Login"
  )}
</button>

        </form>
      </div>
    </div>
  );
}

export default Login;
