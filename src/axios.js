import axios from "axios";



const api = axios.create({ baseURL: "https://fullstack-production-522c.up.railway.app/"});

// Attach token automatatically

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;