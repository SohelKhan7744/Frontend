import api from "./axios"


export const login = async (username,password) => {
              const response =  await api.post("/auth/login",{username,password});

              localStorage.setItem("token",response.data.token);
              return response.data;
}

export const logout = ()=>{
    localStorage.removeItem("token");
};

export const register = async (user)=>{
    return await api.post("/auth/register",user)
};

// Student DashBoard APIs

export const getStudentProfile = () =>
  api.get("/students");

export const getStudentCourses = () =>
  api.get("/students/mycourses");

export const getAllCourses = ()=>
   api.get("/courses");

export const enrollCourse = (courseId) =>{
 return api.post("/students/enroll",{courseId})
};

// teacher dashboard APIs

export const getTeacherProfile = () =>
  api.get("/teachers/profile");

export const getTeacherCourses = () =>
  api.get("/teachers/courses");


export const assignCourseToSelf = (courseId) =>
  api.post(`/teachers/assign-course/${courseId}`);

export const getStudentsOfCourse = (courseId) =>
  api.get(`/teachers/courses/${courseId}/students`);

export const getCount = () => 
  api.get(`/admin/dashboard`);
