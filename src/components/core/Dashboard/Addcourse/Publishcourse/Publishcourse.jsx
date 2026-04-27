import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setStep, resetCourseState } from "../../../../../slices/Courseslice";
import { useSelector, useDispatch } from "react-redux";
import { updatecourse } from "../../../../../Services/CourseApi";
import { useNavigate } from "react-router-dom";

const Publishcourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const [loading, setloading] = useState(false);

  const { register, handleSubmit, getValues, setValue } = useForm();

  // ✅ FIXED useEffect
  useEffect(() => {
    if (course?.status === "published") {
      setValue("public", true);
    }
  }, [course, setValue]);

  const gotocourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const onsubmit = async () => {
    const isPublic = getValues("public");

    // ✅ Clean logic
    if (
      (course?.status === "published" && isPublic) ||
      (course?.status === "draft" && !isPublic)
    ) {
      gotocourses();
      return;
    }

    const formData = new FormData();
    formData.append("courseId", course._id);
    formData.append("status", isPublic ? "published" : "draft");

    setloading(true);

    const result = await updatecourse(formData, token);

    if (result) {
      gotocourses();
    }

    setloading(false);
  };

  const gotoback = () => {
    dispatch(setStep(2));
  };

  return (
    <div className="text-white h-44 flex flex-col mt-5">
      <h1 className="bg-blue-950 p-2 font-semibold">PUBLISH SETTINGS</h1>

      <form
        onSubmit={handleSubmit(onsubmit)}
        className="bg-blue-950 flex flex-col items-center justify-center pt-10 pb-10 gap-4"
      >
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("public")} />
          MAKE THIS COURSE PUBLIC
        </label>

        <div className="flex justify-end gap-2 mt-2">
          <button
            disabled={loading}
            type="button"
            onClick={gotoback}
            className="rounded-md px-3 py-2 bg-gray-600"
          >
            BACK
          </button>

          <button
            disabled={loading}
            type="submit"
            className="rounded-md bg-yellow-400 px-3 py-2 text-black font-semibold"
          >
            {loading ? "Saving..." : "SAVE CHANGES"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Publishcourse;
