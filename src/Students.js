import React,
{useEffect, useState} from "react";
import api from "./axios";
import { Link } from "react-router-dom";

function Students(){
    const [students,setStudents] = useState([]);
    const [page,setPage] = useState(1);
    const [limit] =useState(10);
    const [total,setTotal] = useState(0);
    const [loading,setLoading] = useState(false);

    const totalPages = Math.ceil(total/limit);

    useEffect(()=>{
        fetchStudent(page);
    },[page]);

    const fetchStudent = async (pageNumber) => {
        try{
         setLoading(true);
         const res = await api.get(`/admin/student?page=${pageNumber}&limit=${limit}`);
         setStudents(res.data.data);
         setTotal(res.data.total);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    };

    return(
        <div className="content-wrapper">
            {/* Header */}
            <div className="content-header">
              <div className="container-fluid">
                <h1 className="m-0">
                    Students
                </h1>
              </div>
            </div>
               {/* Content */}
        <section className="content">
            <div className="container-fluid">
             <div className="card">
                <div className="card-header">
                <h3 className="card-title">
                 Students List
                </h3>
                </div>
             <div className="card-body p-0">
                {loading ?(<div className="p-3">
              loading.......</div>):(
                <table className="table table-bordered table-hover">
               <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Status</th>
                </tr>
               </thead>
               <tbody>
                {students.length === 0 ?(
                    <tr>
                        <td colSpan="5" className="text-center">No students found</td>
                    </tr>):(
                        students.map((s) =>( 
                            <tr key={s.id}>
                                <td>{s.id}</td>
                               <td>
                                <Link to={`/admin/student/edit/${s.id}`}>
                                   {s.username}
                                       </Link>
                                           </td>
                              <td>{s.email}</td>
                         <td>{s.department}</td>
                        <td> 
                      <span className="badge badge-secondary">
                                       Inactive
                                 </span>
                              </td>
                            </tr>
                        ))
                    )}
               </tbody>
                </table>
              )}
             </div>
             {/* pagination */}
             <div className="card-footerc clearfix">
              <ul className="pagination pagination-sm-0 float-right">
                <li className={`page-item ${page === 1 ? "disabled": ""}`}>
           <button className="page-link" onClick={()=> setPage(page -1)}> 
              «
           </button>
                </li>
                {[...Array(totalPages)].map((_,i)=> (
                    <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
            <button className="page-link" onClick={()=>{setPage(page +1)}}>
                 »
            </button>
                    </li>
                ))}
              </ul>
             </div>
             </div>
            </div>
        </section>
        </div>
    )
}
export default Students;