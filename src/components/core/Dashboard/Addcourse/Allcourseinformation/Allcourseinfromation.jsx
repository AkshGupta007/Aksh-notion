import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCategories,
  addcourse,
} from "../../../../../Services/CourseApi";

import { updatecourse } from "../../../../../Services/CourseApi";
import Requirementlist from "./Requirementlist";
import { setStep, setCourse } from "../../../../../slices/Courseslice";

import logo from "../../../../../assests/input.png";



const Allcourseinfromation = () => {
  const dispatch = useDispatch();

  const { course, editCourse } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const [categories, setCategories] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [preview, setPreview] = useState(logo);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
  } = useForm();

  // 📌 Fetch categories + populate form in edit mode
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const res = await fetchCategories();
      if (res?.length) setCategories(res);

      if (editCourse && course) {
       reset({
         courseTitle: course.courseName,
         courseDescription: course.courseDescription,
         coursePrice: course.price,
         courseBenefits: course.whatYouWillLearn,
         courseCategory: course.category?._id || course.category,
         courseRequirements: course.instructions,
       });
       setPreview(course.thumbnail);
     setTags(course.tags || []);
      }

      setLoading(false);
    };

    init();
  }, [editCourse, course,reset]);

  // 📌 Check if form updated
  const isFormUpdated = () => {
    if (!course) {
      console.log("no course found");
      return;
    }; // ✅ prevent crash

    const data = getValues();

    return (
      data.courseTitle !== course.courseName ||
      data.courseDescription !== course.courseDescription ||
      data.coursePrice !== course.price ||
      data.courseBenefits !== course.whatYouWillLearn ||
      data.courseCategory !== (course.Category) ||
      JSON.stringify(data.courseRequirements) !==
        JSON.stringify(course.instructions)
    );
  };

  // 📌 Submit handler
  const onSubmit = async (data) => {
    const formData = new FormData();

    setLoading(true);

    try {
      if (editCourse) {
        if (!isFormUpdated()) {
          console.log("No changes made");
          setLoading(false);
          return;
        }

        formData.append("courseId", course._id);

        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseDescription);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("tags", JSON.stringify(tags));
        formData.append(
          "instructions",
          JSON.stringify(data.courseRequirements),
        );

        if (data.courseImage instanceof File) {
          formData.append("thumbnail", data.courseImage);
        }

      try {
        const result = await updatecourse(formData, token);
        dispatch(setCourse(result));
        dispatch(setStep(2));
      } catch (error) {
        console.error("Error updating form:", error);
      }

      } else {
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseDescription);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("tags", JSON.stringify(tags));
        formData.append(
          "instructions",
          JSON.stringify(data.courseRequirements),
        );

        if (data.courseImage) {
          formData.append("thumbnail", data.courseImage);
        }

        const result = await addcourse(formData, token);
        if (result){
          dispatch(setCourse(result));
          dispatch(setStep(2));
          console.log("uploaded course",course);
          console.log("uploaded course", result); ;
        }
        
      }

      
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    setLoading(false);
  };

 
    return (
      <div className="text-zinc-800 w-full max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 bg-richblack-800 p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold">Course Information</h2>

          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-purple-100">Course Title</label>
            <input
              type="text"
              placeholder="Enter course name"
              {...register("courseTitle", { required: true })}
              className="bg-richblack-700 p-3 rounded-md outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-purple-100">Description</label>
            <textarea
              placeholder="Enter course description"
              {...register("courseDescription", { required: true })}
              className="bg-richblack-700 p-3 rounded-md outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-purple-100">Price (₹)</label>
            <input
              type="number"
              placeholder="Enter price"
              {...register("coursePrice", { required: true })}
              className="bg-richblack-700 p-3 rounded-md outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-purple-100">Category</label>
            <select
              {...register("courseCategory", { required: true })}
              className="bg-richblack-700 p-3 rounded-md outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-purple-100">Tags</label>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            <input
              placeholder="Press Enter to add tag"
              className="bg-richblack-700 p-3 rounded-md outline-none focus:ring-2 focus:ring-yellow-500"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  e.preventDefault();
                  const newTags = [...tags, e.target.value.trim()];
                  setTags(newTags);
                  setValue("courseTags", newTags);
                  e.target.value = "";
                }
              }}
            />
          </div>

          {/* Thumbnail Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-purple-100">Course Thumbnail</label>

            <input
              type="file"
              hidden
              id="fileInput"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                  setValue("courseImage", file);
                }
              }}
            />

            <div
              onClick={() => document.getElementById("fileInput").click()}
              className="cursor-pointer border-2 border-dashed border-richblack-600 rounded-lg p-4 flex justify-center items-center hover:border-yellow-500 transition"
            >
              <img
                src={preview}
                alt="thumbnail"
                className="max-h-[200px] object-contain"
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-purple-100">
              What you will learn
            </label>
            <textarea
              placeholder="Enter benefits"
              {...register("courseBenefits", { required: true })}
              className="bg-richblack-700 p-3 rounded-md outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Requirements */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-purple-100">Requirements</label>
            <Requirementlist
              name="courseRequirements"
              setValue={setValue}
              getValues={getValues}
              register={register}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            {editCourse && (
              <button
                type="button"
                onClick={() => dispatch(setStep(2))}
                className="px-5 py-2 bg-richblack-600 rounded-md hover:bg-richblack-500 transition"
              >
                Skip
              </button>
            )}

            <button
              type="submit"
              disabled={Loading}
              className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition disabled:opacity-50"
            >
              {editCourse ? "Save Changes" : "Continue"}
            </button>
          </div>
        </form>
      </div>
    );
};

export default Allcourseinfromation;
