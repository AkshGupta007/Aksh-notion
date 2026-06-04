import React from 'react'
import { useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { fetchinstructorcourses } from "../../../Services/CourseApi";
import Coursetable from './InstructorCourses/Coursetable'
import { useNavigate } from 'react-router';
const Mycourses = () => {
 const [courses,setcourses]=useState([]);
 const {token}=useSelector((state)=>state.auth);
 const navigate=useNavigate();

 useEffect( ()=>{
    const fetching=async()=>{
        const result = await fetchinstructorcourses(token);
        if(result){
            setcourses(result);
            // console.log("fetched courses",result);
        }
    }
    fetching();

 },[token]);

  return (
    <div className="text-white flex flex-col">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl sm:text-4xl">MY COURSES</h1>

        <button
          onClick={() => navigate("/dashboard/add-course")}
          className="bg-yellow-400 px-2 py-2 rounded-md"
        >
          Add COURSES
        </button>
      </div>

      {courses && <Coursetable courses={courses} setcourses={setcourses} />}
    </div>
  );
}

export default Mycourses
