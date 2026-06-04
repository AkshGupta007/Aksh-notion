import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchcoursedetails } from "../../../../Services/CourseApi";
import { setCourse, setEditCourse } from "../../../../slices/Courseslice";
import Rendersteps from "../Addcourse/Rendersteps";

const Editcourse = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const { courseId } = useParams();

  // ✅ local loading state — doesn't touch Redux, no re-render cascade
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const result = await fetchcoursedetails(courseId, token);
        if (result) {
          dispatch(setEditCourse(true));
          dispatch(setCourse(result.details));
        }
      } catch (error) {
        console.error("Failed to fetch course:", error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId && token) {
      fetchData();
    }
  }, [courseId,token, dispatch]);

  if (loading) {
    return (
      <div className="text-white text-center p-8 text-lg">
        Loading course...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-5xl text-white font-bold mb-9">Edit Course</h1>
      {course ? (
        <Rendersteps />
      ) : (
        <p className="text-richblack-300">Course not found.</p>
      )}
    </div>
  );
};

export default Editcourse;
