import React from 'react'
import { useForm } from 'react-hook-form';
import { setStep,resetCourseState } from '../../../../../slices/Courseslice';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import { updatecourse } from '../../../../../Services/CourseApi';
import { useNavigate } from 'react-router';


const Publishcourse = () => {

    const dispatch=useDispatch();
      const navigate = useNavigate();

    useEffect(()=>{
    if(course?.status==="published"){
            setValue("public",true);
        }
    },[])


    const {course}=useSelector((state)=>state.course);
           const { token } = useSelector((state) => state.auth);

           const[loading,setloading]=useState(false);

          const {
            register,
            handleSubmit,
            getValues,
            setValue,
            formState: { errors },
          } = useForm();

        const gotocourses=()=>{
            dispatch(resetCourseState());
            navigate("/dashboard/my-courses")
        }

 const onsubmit=async(data)=>{
    if(course?.status==='published'&& getValues("public")===true ||
  course?.status==='draft'&& getValues("public")===false  ){
    //no upds\ation in form so no need to make api call
    gotocourses();
    return ;
  }

  const formData=new FormData();

  formData.append("courseId",course._id);
  const updatedstatus=getValues("public")?"published":"draft";
  formData.append("status",updatedstatus);
 

  setloading(true);
  const result=await updatecourse(formData,token);

  if(result){
    gotocourses();
  }

  setloading(false);





 }

 const gotoback=()=>{
    dispatch(setStep(2));
 }

  return (
    <div className=" text-white h-44 flex flex-col  mt-5">
      <h1 className="bg-blue-950 "> PUBLISH SETTINGS</h1>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className=" bg-blue-950 flex flex-col items-center justify-center pt-10 pb-10"
      >
        <label >
          <input type="checkbox" {...register("public")} />
          MAKE THIS COURSE PUBLIC
        </label>

        <div className=" flex justify-end gap-2 mt-2">
          <button
            disabled={loading}
            type="button"
            className="rounded-md  text-white px-2 py-2"
            onClick={() => gotoback()}
          >
            BACK
          </button>

          <button
            disabled={loading}
            type="submit"
            className="rounded-md bg-yellow-400 text-white px-2 py-2"
          >
            SAVE CHANGES
          </button>
        </div>
      </form>
    </div>
  );
}

export default Publishcourse
