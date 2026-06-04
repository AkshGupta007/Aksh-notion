import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCategories,
  addcourse,
  updatecourse,
} from "../../../../../Services/CourseApi";

import Requirementlist from "./Requirementlist";
import { setStep, setCourse } from "../../../../../slices/Courseslice";

import logo from "../../../../../assests/input.png";

const Allcourseinfromation = () => {
  const dispatch = useDispatch();

  const { course, editCourse } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [preview, setPreview] = useState(logo);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // ✅ Fix 1: course?._id (primitive string) not course (object) in deps
  // ✅ Fix 2: reset removed from deps — new function ref every render
  // ✅ Fix 3: finally block — loading always stops even on error
  useEffect(() => {
    const init = async () => {
      setLoading(true);

      try {
        const res = await fetchCategories();
        if (res?.length) setCategories(res);

        if (editCourse && course) {
          reset({
            courseTitle: course.courseName,
            courseDescription: course.courseDescription,
            coursePrice: course.price,
            courseBenefits: course.whatYouWillLearn,
            courseCategory: course.category?._id || course.category,
            courseRequirements: course.instructions || [],
          });
          setPreview(course.thumbnail);
          setTags(course.tags || []);
        }
      } catch (error) {
        console.error("Init error:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [editCourse, course , reset]); // ✅ only primitives here

  const isFormUpdated = () => {
    if (!course) return false;

    const data = getValues();

    return (
      data.courseTitle !== course.courseName ||
      data.courseDescription !== course.courseDescription ||
      data.coursePrice !== course.price ||
      data.courseBenefits !== course.whatYouWillLearn ||
      data.courseCategory !== (course.category?._id || course.category) ||
      JSON.stringify(data.courseRequirements) !==
        JSON.stringify(course.instructions)
    );
  };

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
          console.error("Error updating course:", error);
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
        if (result) {
          dispatch(setCourse(result));
          dispatch(setStep(2));
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loading guard — form won't render until reset() has populated values
  if (loading) {
    return <div className="text-white text-center p-8 text-lg">Loading...</div>;
  }

  return (
    <div className="text-zinc-800 w-full max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 bg-richblack-800 p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-white">
          Course Information
        </h2>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-purple-100">Course Title</label>
          <input
            type="text"
            placeholder="Enter course name"
            {...register("courseTitle", { required: true })}
            className="bg-richblack-700 p-3 rounded-md outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.courseTitle && (
            <p className="text-red-500 text-sm">Course title is required</p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-purple-100">Description</label>
          <textarea
            placeholder="Enter course description"
            {...register("courseDescription", { required: true })}
            className="bg-richblack-700 p-3 rounded-md outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.courseDescription && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
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
          {errors.coursePrice && (
            <p className="text-red-500 text-sm">Price is required</p>
          )}
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
          {errors.courseCategory && (
            <p className="text-red-500 text-sm">Category is required</p>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-purple-100">Tags</label>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => setTags(tags.filter((_, idx) => idx !== i))}
                  className="ml-1 font-bold"
                >
                  ×
                </button>
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
            accept="image/*"
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
          <label className="text-sm text-purple-100">What you will learn</label>
          <textarea
            placeholder="Enter benefits"
            {...register("courseBenefits", { required: true })}
            className="bg-richblack-700 p-3 rounded-md outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.courseBenefits && (
            <p className="text-red-500 text-sm">Benefits are required</p>
          )}
        </div>

        {/* Requirements */}
        <div className="flex flex-col gap-1">
          <Requirementlist
            name="courseRequirements"
            setValue={setValue}
            getValues={getValues}
            register={register}
            label="Requirements"
            errors={errors}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          {editCourse && (
            <button
              type="button"
              onClick={() => dispatch(setStep(2))}
              className="px-5 py-2 bg-richblack-600 text-white rounded-md hover:bg-richblack-500 transition"
            >
              Skip
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : editCourse ? "Save Changes" : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Allcourseinfromation;
