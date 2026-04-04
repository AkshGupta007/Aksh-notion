import React, { useEffect, useState } from "react";
import { getUserEnrolledCourses } from "../../../../Services/profileApi";
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";

const Enrolled = () => {
  const [courses, setcourses] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const fetchdata = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      console.log("raw response is", response);

      // adjust based on API
      setcourses(response);
    } catch (error) {
      console.log("error", error);
      setcourses([]);
    }
  };

  useEffect(() => {
    if (token) {
      fetchdata();
    }
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
              className="grid grid-cols-3 items-center p-4 border-b border-gray-700"
            >
              {/* LEFT: Course Info */}
              <div className="flex gap-3 items-center">
                <img
                  src={course?.thumbnail}
                  alt={course?.coursename}
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <p className="font-medium">{course?.coursename}</p>
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
                  Progress: {course?.progressPercentage || 0}%
                </p>
                <div className="w-32">
                  <ProgressBar
                    completed={course?.progressPercentage || 0}
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
