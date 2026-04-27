import React, { useEffect, useState } from "react";
import { getUserEnrolledCourses } from "../../../../Services/profileApi";
import { getCourseProgress } from "../../../../Services/CourseApi"; // ✅ import
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router";

const Enrolled = () => {
  const [courses, setCourses] = useState([]);
  const [progressMap, setProgressMap] = useState({}); // ✅ { courseId: percentage }
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

//   const calculateProgress = async (course) => {
//     const totalLectures =
//       course?.coursecontent?.reduce(
//         (acc, sec) => acc + sec.subsections.length,
//         0,
//       ) || 0;

//     if (totalLectures === 0) return 0;

//     const res = await getCourseProgress(course._id, token);
//     const completed = res?.completedsubsections?.length || 0; // ✅ correct field

//     return Math.round((completed / totalLectures) * 100);
//   };

  
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await getUserEnrolledCourses(token);
//       setCourses(response);
//       const map = {};
//       await Promise.all(
//         response.map(async (course) => {
//           map[course._id] = await calculateProgress(course);
//         }),
//       );
//       setProgressMap(map);
//     } catch (error) {
//       console.log("error", error);
//       setCourses([]);
//     }
//   };


//   if (token) fetchData();
// }, [token]);

useEffect(() => {
  const calculateProgress = async (course) => {
    const totalLectures =
      course?.coursecontent?.reduce(
        (acc, sec) => acc + sec.subsections.length,
        0,
      ) || 0;

    if (totalLectures === 0) return 0;

    const res = await getCourseProgress(course._id, token);
    const completed = res?.completedsubsections?.length || 0;

    return Math.round((completed / totalLectures) * 100);
  };

  const fetchData = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setCourses(response);
      const map = {};
      await Promise.all(
        response.map(async (course) => {
          map[course._id] = await calculateProgress(course);
        }),
      );
      setProgressMap(map);
    } catch (error) {
      console.log("error", error);
      setCourses([]);
    }
  };

  if (token) fetchData();
}, [token]);
  return (
    <div className="text-white w-full">
      {courses?.length === 0 ? (
        <p>NO ENROLLED COURSES</p>
      ) : (
        <div className="w-full">
          {/* Header */}
          <div className="grid grid-cols-3 bg-gray-800 p-3 rounded-t-md text-sm font-semibold">
            <p>Course Name</p>
            <p className="text-center">Duration</p>
            <p className="text-right">Progress</p>
          </div>

          {/* Course List */}
          {courses.map((course) => (
            <div
              key={course?._id}
              className="grid grid-cols-3 items-center p-4 border-b border-gray-700 cursor-pointer"
              onClick={() => {
                const section = course?.coursecontent?.[0];
                const subsection = section?.subsections?.[0];

                if (!section || !subsection) return;

                navigate(
                  `/view-course/courseId/${course._id}/sectionId/${section._id}/subSectionId/${subsection._id}`,
                );
              }}
              // onClick={() =>
              //   navigate(
              //     `/view-course/courseId/${course?._id}/sectionId/${course?.coursecontent?.[0]?._id}/subSectionId/${course?.coursecontent?.[0]?.subsections?.[0]?._id}`,
              //   )
              // }
            >
              {/* LEFT: Course Info */}
              <div className="flex gap-3 items-center">
                <img
                  src={course?.thumbnail}
                  alt={course?.coursename}
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <p className="font-medium">{course?.courseName}</p>
                  <p className="text-xs text-gray-400">
                    {course?.coursedescription}
                  </p>
                </div>
              </div>

              {/* CENTER: Duration */}
              <p className="text-center text-sm">
                {course?.totalDuration || "N/A"}
              </p>

              {/* RIGHT: Progress */}
              <div className="flex flex-col items-end gap-1">
                <p className="text-xs">
                  Progress: {progressMap[course._id] ?? 0}%{" "}
                  {/* ✅ read from map */}
                </p>
                <div className="w-32">
                  <ProgressBar
                    completed={progressMap[course._id] ?? 0} // ✅ read from map, never a Promise
                    height="6px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Enrolled;
