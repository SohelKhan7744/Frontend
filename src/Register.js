import { useState } from "react";
import { login, register } from "./Service";
import { useNavigate } from "react-router-dom";
import { redirectByRole } from "./redirectByrole";
import { toast } from "react-toastify";

function Register(){
    const navigate = useNavigate();

    const [showPassword,setShowPassword] = useState(false);
    const [error,setError] = useState({});

   const [form,setForm] = useState({
    username: "",
    password: "",
    email:"",
    phone:"",
    image_url:"",
    role: "STUDENT"
   });

   const handleChange =(e)=>{
    setForm({...form,[e.target.name]: e.target.value});

     if (error[e.target.name]) {
    setError({ ...error, [e.target.name]: null });
  }
   };
const handleRegistar = async (e) => {
  e.preventDefault();
  setError({});
  try {
    await register(form);
    alert("Registration successful. Please login.");
    navigate("/login");
  } catch (err) {
    if (err.response) {

      if(err.response?.status == 409){
        setError(err.response.data.errors || {})
      } else{
        toast.error("Something went wrong");
      }
    }
  }
};

return(
    <div className="flex justify-center items-center min-h-screen">
    <form onSubmit={handleRegistar}
    className="flex flex-col gap-6 bg-gray-800 p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center text-white">Registration</h2>

     <input name="username"
     value={form.username}
     placeholder="Enter UserName"
     onChange={handleChange}
     className={`px-4 py-2 rounded bg-gray-700 text-white focus:ring-blue-500  
        ${error.username ? "border border-red-500": ""}`} />

        {error.username && (
  <p className="text-red-400 text-sm">{error.username}</p>
)}

      <input name="email"
      value={form.email}
     placeholder="Enter Email"
     onChange={handleChange} 
     className={`px-4 py-2 rounded bg-gray-700 text-white focus:ring-blue-500
      ${error.email ? "border border-red-500": ""}`} />

      {error.email && (
  <p className="text-red-400 text-sm">{error.email}</p>
)}

      <input name="phone"
      value={form.phone}
     placeholder="Enter Phone"
     onChange={handleChange} 
      className={`px-4 py-2 rounded bg-gray-700 text-white 
      ${error.phone ? "border border-red-500" : ""}`}/>

     {error.phone && (
  <p className="text-red-400 text-sm">{error.phone}</p>
)}
     <div className="relative">
  <input
    name="password"
    value={form.password}
    type={showPassword ? "text" : "password"}
    placeholder="Enter Password"
    onChange={handleChange}
    className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-700 text-white
               focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2
               text-gray-400 hover:text-white text-lg"
  >
    {showPassword ? "🔒" : "🔓"}
  </button>
</div>

     <input name="image_url"
     value={form.image_url}
     placeholder="Enter Image_url"
     onChange={handleChange} 
      className="px-4 py-2 rounded bg-gray-700 text-white focus:ring-blue-500"/>

      <select name="role"
      value={form.role}
       onChange={handleChange}
        className="px-4 py-2 rounded bg-gray-700 text-white focus:ring-blue-500">
    <option value="STUDENT">Student</option>
    <option value="TEACHER">Teacher</option>
      </select>

     <button type="submit"
     className="bg-blue-600 py-2 rounded font-semibold hover:bg-blue-700 transiton">Register</button>
    </form>
    </div>
)

}
export default Register;