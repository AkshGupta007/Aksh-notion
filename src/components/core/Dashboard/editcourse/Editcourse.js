import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchcoursedetails } from "../../../../Services/CourseApi";
import { setCourse, setEditCourse } from "../../../../slices/Courseslice";
import { setLoading } from "../../../../slices/authSlice";
import Rendersteps from "../Addcourse/Rendersteps";

const Editcourse = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  const { courseId } = useParams(); // ✅ single source

  useEffect(() => {
    const fetchData = async () => {
      console.log("courseid", courseId);

      dispatch(setLoading(true)); // ✅ correct

      const result = await fetchcoursedetails(courseId, token);

      if (result) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result.details));
      }

      dispatch(setLoading(false)); // ✅ correct
    };

    if (courseId && token) {
      fetchData();
    }
  }, [courseId, token, dispatch]);

  return (
    <div>
      <h1 className="text-5xl text-white font-bold mb-9">Edit Course</h1>

      {course && <Rendersteps />}
    </div>
  );
};

export default Editcourse;
