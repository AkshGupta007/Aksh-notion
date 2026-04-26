import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getInstructorDashboard } from '../Services/profileApi';
import { fetchinstructorcourses } from '../Services/CourseApi';
import InstructorChart from '../components/core/Dashboard/instructor dashboard/InstructorChart';
import { Link } from 'react-router-dom';
const InstructorDashboard = () => {
    const { token } = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const [instructorData, setInstructorData] = useState(null);
    const [instructorCourses, setInstructorCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchInstructorData = async () => {
          try {
            setLoading(true);
            const data= await getInstructorDashboard(token);
            const data2= await fetchinstructorcourses(token);
            console.log("Instructor Dashboard Data:", data);
            console.log("Instructor Courses Data:", data2);
            if(data){
                setInstructorData(data);
            }

            if(data2){
                setInstructorCourses(data2);
            }
          } catch (error) {
            console.error("Error fetching instructor data:", error);
          }
          setLoading(false);
        };

        fetchInstructorData();
      }, [token]);
 
      const totalstudents = instructorData?.reduce(
        (acc, curr) => acc + curr.totalStudentsEnrolled,
        0,
      );
      const totalEarnings = instructorData?.reduce(
        (acc, curr) => acc + curr.totalAmountGenerated,
        0,
      );

      console.log("Total Students Enrolled:", totalstudents);
      console.log("Total Earnings:", totalEarnings);
  return (
    <div className="text-white">
      <h1>Hi {user?.firstname}</h1>
      <p>Let's start something new</p>

      {loading ? (
        <div className="spinner"></div>
      ) : instructorCourses.length > 0 ? (
        <div className="flex  md:flex-row gap-10 mt-10">
          <InstructorChart courses={instructorData} />
          <div className="bg-slate-600 p-6 rounded-lg shadow-md w-full md:w-1/3 h-fit">
            <p className="text-4xl text-yellow-300 underline-offset-0">
              Statistics
            </p>
            <div className="mt-6 space-y-4 text-lg">
              <p>
                <span className="text-green-400">
                  Total Students Enrolled:
                </span>{" "}
                {totalstudents}
              </p>

              <p>
                <span className="text-blue-400">Total Courses:</span>{" "}
                {instructorCourses.length}
              </p>

              <p>
                <span className="text-purple-400">Total Earnings:</span> RS.
                {totalEarnings}
              </p>

              
            </div>
            
          </div>
        </div>
      ) : (
        <p>No courses found. Please create a course to see the dashboard.</p>
      )}

      <div>
        <div className="flex items-center justify-between mt-10 mb-5 mr-7">
          <h2 className="text-2xl font-bold mt-10 mb-5">Your Courses</h2>

          <button>
            <Link
              to="/dashboard/my-courses"
              className="text-blue-500 underline"
            >
              VIEW ALL
            </Link>
          </button>
        </div>
        <div className="flex gap-6 flex-wrap">
          {instructorCourses.slice(0, 3).map((course) => (
            <div
              key={course._id}
              className="bg-gray-800 text-white rounded-xl p-4 w-[250px] shadow-md hover:shadow-lg transition-all duration-300"
            >
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="w-[100px] h-[100px] object-cover rounded-md mx-auto"
              />

              <div className="mt-4 space-y-1 text-center">
                <p className="font-semibold text-lg">{course.courseName}</p>

                <div className="flex justify-center items-center gap-2 text-sm text-gray-300">
                  <p>{course.studentsenrolled.length} students</p>
                  <span>|</span>
                  <p>₹ {course.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {instructorCourses.length === 0 && (
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              You have not created any courses yet
            </p>
            <Link
              to="/dashboard/addCourse"
              className="text-blue-500 underline mt-2 inline-block"
            >
              Create a Course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default InstructorDashboard
