import React, { useEffect } from 'react'
import {useForm } from 'react-hook-form'
import { useState } from 'react';
import {Nestedview} from './Nestedview';
import { useDispatch, useSelector } from 'react-redux';
import { setStep,setEditCourse,setCourse} from '../../../../../slices/Courseslice'; 
import { toast } from 'react-toastify';
import { createSection, updateSection } from '../../../../../Services/CourseApi';


const Coursebuilder = () => {

      const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
      } = useForm();



      useEffect(() => {

 
        console.log("course is", course);
    }, []);

      const {course}=useSelector((state)=>state.course);
       const { token } = useSelector((state) => state.auth);

      const[editsection , seteditsection]=useState(false);
      const dispatch=useDispatch()
      const[loading,setloading]=useState(false);

      const Canceledit=()=>{
        seteditsection(null);
        setValue("sectionName","");
      }

      const gotoback=()=>{
       dispatch( setEditCourse(true));
       dispatch( setStep(1));
      }

      const gotonext=()=>{
        if(course?.coursecontent?.length===0){
            toast.error("Please Add Atleast One Section");
            return;
        }
        if(course.coursecontent.some((Section)=>Section?.subsections?.length===0)){
            toast.error("please add atleast one sub section")
            return
        }
        dispatch(setStep(3));
      }

      const handleChangeEditSectionName = (sectionName, sectionId) => {
        if (editsection == sectionId) {
          seteditsection(null);
          setValue("sectionName", "");
          return;
        }
        seteditsection(sectionId);
        setValue("sectionName", sectionName);
      };

     

      const onSubmit=async (data)=>{
        setloading(true);
        let result;

        if(editsection){
            result=await updateSection({
                sectionName:data.sectionName,
                sectionId:editsection,
                courseId:course._id
            },token)
        }
        else{
            result= await createSection({
              sectionName: data.sectionName,
              courseId: course._id
            },token);
        }

        if(result){
            dispatch(setCourse(result));
            seteditsection(null);
            setValue("sectionName", "");
         
        }
        setloading(false);

      }
    
  return (
    <div className="text-pink-900 bg-zinc-900 mt-6 py-5 px-2 w-auto ">
      <h1 className="mt-5">COURSE BUILDER</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input
          type="text"
          placeholder="ADD A SECTION TO BUILD YOUR COURSE"
          className="w-80 mt-3"
          {...register("sectionName", { required: true })}
        />

        {errors.sectionName && "ENTER SECTION NAME"}

        <button
          type="submit"
          className="text-white bg-yellow-400 px-2  py-2 rounded-md mt-3 w-fit"
        >
          {editsection ? "EDIT SECTION" : "CREATE SECTION"}
        </button>

        {editsection && (
          <button
            onClick={Canceledit}
            className="text-white bg-yellow-400 px-2  py-2 rounded-md mt-3 w-fit"
          >
            CANCEL EDIT
          </button>
        )}
      </form>

      {course?.coursecontent?.length > 0 && (
        <Nestedview handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className='flex gap-9'>
        <button onClick={gotoback}> GO TO BACK</button>
        <button onClick={gotonext}> GO TO NEXT</button>
      </div>
    </div>
  );
}

export default Coursebuilder
