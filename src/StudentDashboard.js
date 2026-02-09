import { useEffect, useState } from "react";
import { getStudentProfile, getStudentCourses , getAllCourses, enrollCourse} from "./Service";
import { toast } from "react-toastify";


function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [allCourses,setAllCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
const SkeletonBox = ({className})=>(
<div className ={`animate-pulse bg-gray-700 rounded ${className}`}/>
)
   const StudentDashboardSkeleton = () =>
   {
     return (
         <div className="p-8 text-white space-y-6">
          {/* Header */}
            <SkeletonBox className="h-8 w-64" />
            {/* profile Card */}
            <div className="bg-gray-800 p-4 rounded-lg space-y-3">
           <SkeletonBox className="h-4 w-32"/>
           <SkeletonBox className="h-4 w-40"/>
           <SkeletonBox className="h-4 w-48"/> 
            </div>
            {/* All Courses */}

            <SkeletonBox className="h-6 w-40"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_,i) => (
                <div key={i}
                className="bg-gray-700 p-4 rounded-lg space-y-3">
                <SkeletonBox className="h-5 w-3/4"/>
                <SkeletonBox className="h-4 w-full"/>
                <SkeletonBox className="h-9 w-28 mt-3"/>
                </div>
              ))}
            </div>
            {/* My Courses */}
            <SkeletonBox className="h-6 w-36 mt-6"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(2)].map((_,i) => (
            <div key={i}
            className="bg-gray-700 p-4 rounded-lg space-y-3">
             <SkeletonBox className="h-5 w-3/4"/>  
             <SkeletonBox className="h-4 w-full"/>
            </div>
          ))}
            </div>

         </div>
     )
   }

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async () => {
    try {
      setLoading(true);

      const profileRes = await getStudentProfile();
      setProfile(profileRes.data);

      const allCoursesRes = await getAllCourses();
      setAllCourses(allCoursesRes.data);

      const courseRes = await getStudentCourses();
      setCourses(courseRes.data);



    } catch (err) {
  console.error(err);

  if (err.response?.status === 401 || err.response?.status === 403) {
    toast.error("Session expired. Please login again.");
    setError("Unauthorized access. Please login again.");
  } else {
    toast.error("Failed to load student data");
    setError("Failed to load student data.");
  } 
} finally {
    setLoading(false); 
  }

  };

  if (loading) {
    return <StudentDashboardSkeleton/>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }
 const handleEnroll = async (courseId) => {
  try {
    await enrollCourse(courseId);

    toast.success("🎉 Enrolled successfully!");

    const courseRes = await getStudentCourses();
    setCourses(courseRes.data);

  } catch (err) {
    if (err.response?.status === 409) {
      toast.info("ℹ️ You are already enrolled in this course");
    } else if (err.response?.status === 403) {
      toast.error("⛔ You are not allowed to enroll");
    } else {
      toast.error("❌ Enrollment failed");
    }
  }
};




  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {profile.user.username}
      </h1>

      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <p><b>Age:</b> {profile.age}</p>
        <p><b>Roll No:</b> {profile.rollNumber}</p>
        <p><b>Department:</b> {profile.department}</p>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-3">All Courses</h2>

{allCourses.length === 0 ? (
  <p>No courses available</p>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {allCourses.map(course => {
      const alreadyEnrolled = courses.some(
        c => c.id === course.id
      );

      return (
        <div key={course.id} className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-xl font-bold">{course.title}</h3>
          <p className="text-sm text-gray-300">{course.description}</p>

          <button
            disabled={alreadyEnrolled}
            onClick={() => handleEnroll(course.id)}
            className={`mt-3 px-4 py-2 rounded 
              ${alreadyEnrolled
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {alreadyEnrolled ? "Enrolled" : "Enroll"}
          </button>
        </div>
      );
    })}
  </div>
)}

      <h2 className="text-2xl font-semibold mb-3">My Courses</h2>

      {courses.length === 0 ? (
        <p>No enrolled courses</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map(course => (
            <div key={course.id} className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-xl font-bold">{course.title}</h3>
              <p className="text-sm text-gray-300">{course.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
