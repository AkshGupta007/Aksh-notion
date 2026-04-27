import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ReactStars from "react-stars";
import { useForm } from 'react-hook-form';
import { createRatingAndReview } from "../../../../Services/CourseApi"

const Reviewmodal = ({ setreviewModal }) => {
    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
  const {
         courseEntireData,
       } = useSelector((state) => state.viewcourse);
    const{register,handleSubmit, setValue,getValues}=useForm();

    useEffect(()=>{
        setValue('rating',0)    
        setValue('review','')
        console.log("user in review modal",user);
       
    },[user, courseEntireData,setValue])


    const addreview=(value)=>{
        setValue('rating',value);
    }

    const submitform=async (data)=>{
        const courseid=courseEntireData._id;    
        const {review,rating}=data;
        const res=await createRatingAndReview({ courseid, rating, review },token);
        console.log("review response",res);
        setreviewModal(null);
    }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-6 shadow-xl border border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Add Review</h2>
          <button
            onClick={() => setreviewModal(null)}
            className="text-gray-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 mb-5">
          <img
            src={user?.image}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border border-gray-600"
          />
          <div>
            <p className="text-white font-medium">{user?.firstname}</p>
            <p className="text-xs text-gray-400">Posting publicly</p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(submitform)}
          className="flex flex-col gap-4"
        >
          {/* Rating */}
          <div className="flex justify-center">
            <ReactStars
              count={5}
              size={28}
              color2={"#facc15"}
              value={getValues("rating")}
              onChange={addreview}
            />
          </div>

          {/* Textarea */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Your Review</label>
            <textarea
              {...register("review", { required: true })}
              placeholder="Write your thoughts about this course..."
              className="bg-slate-800 text-white p-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              rows={4}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={() => setreviewModal(null)}
              className="px-4 py-2 rounded-lg bg-slate-700 text-gray-300 hover:bg-slate-600 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Reviewmodal
