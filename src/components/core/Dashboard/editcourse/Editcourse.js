import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { fetchcoursedetails } from '../../../../Services/CourseApi';
import { setCourse, setEditCourse } from '../../../../slices/Courseslice';
import { setLoading } from '../../../../slices/authSlice';
import Rendersteps from '../Addcourse/Rendersteps';

const Editcourse = () => {
    const dispatch=useDispatch();
     const [courses,setcourses]=useState([]);
    //  const[Loading,setLoading]=useState(false);
     const {token}=useSelector((state)=>state.auth);
      const { course} = useSelector((state) => state.course);

     useEffect(()=>{

        const fetch=async()=>{
            console.log("courseid",courseId);

            setLoading(true);
            const result=await fetchcoursedetails(courseId,token);

            if(result){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result.details))
            }
              setLoading(false);
        };

        fetch();
     },[]);

    const{courseId}=useParams()
  return (
    <div>

        <h1 className='text-5xl text-white  font-bold mb-9 '>Edit Course</h1>

        { course && <Rendersteps/>}
      
    </div>
  )
}

export default Editcourse
