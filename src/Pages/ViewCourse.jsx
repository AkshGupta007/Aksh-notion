import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router'
import Videosidebar from '../components/core/Dashboard/ViewCourse/Videosidebar'
import Reviewmodal from '../components/core/Dashboard/ViewCourse/Reviewmodal'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCourseSectionData,
  setEntireCourseData,
  setCompletedLectures,
  setTotalNoOfLectures,
  updateCompletedLectures
} from "../slices/Viewcourse";
import { fetchcoursedetails } from '../Services/CourseApi';
import {getCourseProgress} from "../Services/CourseApi"

const ViewCourse = () => {
    const [reviewModal,setreviewModal]=useState(null);
      const { courseId } = useParams();
      const { token } = useSelector((state) => state.auth);
      const dispatch = useDispatch();


        useEffect(() => {
          const setCourseSpecificDetails = async () => {
            try {
              const courseData = await fetchcoursedetails(courseId, token);

              // update redux state
              dispatch(
                setCourseSectionData(courseData.details.coursecontent),
              );
              dispatch(setEntireCourseData(courseData.details));
              

              // calculate total lectures
              let lectures = 0;
              courseData?.details?.coursecontent?.forEach((sec) => {
                lectures += sec.subsections.length;
              });
              dispatch(setTotalNoOfLectures(lectures));
            } catch (error) {
              console.error("Error fetching course details:", error);
            }
          };

          setCourseSpecificDetails();
        }, [courseId, token, dispatch]);


  useEffect(() => {
    const fetch = async () => {
      const res = await getCourseProgress(courseId, token);
      console.log("course progress response", res);
      if (res) {
        dispatch(setCompletedLectures(res.completedsubsections));
      }
    };
    fetch();
  }, [courseId, token]);

  return (
    <div className="flex h-screen">
      <div className="w-[300px]">
        <Videosidebar setreviewModal={setreviewModal} />
      </div>

      <div className="flex-1 h-full">
        <Outlet />
      </div>

      {reviewModal && <Reviewmodal setreviewModal={setreviewModal} />}
    </div>
  );
}

export default ViewCourse
