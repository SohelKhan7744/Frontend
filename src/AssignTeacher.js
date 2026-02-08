import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./axios";
import { toast } from "react-toastify";

function AssignTeacherToCourse(){
     const { username } = useParams();
     const navigate = useNavigate();

     const [courses, setCourses] = useState([]);
     const [courseId, setCourseId] = useState("");
     const [loading, setLoading] = useState(true);
     const [saving, setSaving] = useState(false);

    //  Load all courses

    useEffect(()=>{
        api.get("/courses")
        .then(res =>{
            setCourses(res.data);
            setLoading(false);
        })
        .catch(err =>{
            console.error(err);
             toast.error("Fail to load course");
             setLoading(true);
        }
    );
    },[]);

    const handleAssign = async (e) => {
        e.preventDefault();

        if(!courseId){
            toast.error("Please select a course");
            return;
        }
        setSaving(true);

        try{
           await api.post("/admin/courses/assign-teacher",{
            teacherUsername : username,
            courseId : courseId
           });
        }catch(err){
            console.error(err);
            toast.error("Assignment failed");
        }finally{
            toast.success("Assign Successfully")
            setSaving(false);
        }
    };

    if(loading){
        return <div className="p-4">Loading course...</div>;
        }

        return (
            <div className="content-wrapper">
            <div className="content-header">
           <div className="confainer-fluid">
           <h1>Assign Teacher To Course</h1>
           <p className="text-muted">
            Teacher: <b>{username}</b>
           </p>
           </div>
            </div>

            <section className="content">
            <div className="container-fluid">
           <div className="card">
          <form onSubmit={handleAssign}>
          <div className="form-group">
            <label>Select Course</label>
         <select className="form-control"
         value={courseId} onChange={(e)=> setCourseId(e.target.value)}>
          <option value="">-- Select Course --</option>
          {courses.map((c)=>(
            <option key={c.id} value={c.id}>{c.title}</option>
          ))
          }
         </select>
          </div>
          <div className="d-flex justify-content-between">
       <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
       <button type="submit" className="btn btn-primary" disabled ={saving}>
        {saving? "Assigning..." : "Assign Teacher"}
       </button>
          </div>
          </form>
           </div>
            </div>
            </section>
            </div>
        )
      
        
}
export default AssignTeacherToCourse;