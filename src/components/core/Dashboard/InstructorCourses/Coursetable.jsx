import React from 'react'
import { useSelector} from 'react-redux'
 import  ConfirmationModal  from "../../../common/ConfirmationModal";
import { useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

import { FaPen } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";
import { fetchinstructorcourses,deleteinstructorcourse } from '../../../../Services/CourseApi';
import { useNavigate } from 'react-router';

const Coursetable = ({courses,setcourses}) => {

  const navigate=useNavigate();

 const {token}=useSelector((state)=>state.auth);
 const[loading,setloading]=useState(false);

 const[confirmationmodal,setconfirmationmodal]=useState(null);

 const handlecoursedelete=async (courseId)=>{
    setloading(true);
      
    await deleteinstructorcourse(courseId,token);

      const result = await fetchinstructorcourses(token);
           if(result){
               setcourses(result);
               console.log("fetched courses",result);
           }
      setloading(false);
      setconfirmationmodal(null);
          }
  return (
    <div className="text-white w-full overflow-x-auto">
      <Table className="w-full border border-richblack-700 rounded-lg overflow-hidden">
        {/* HEADER */}
        <Thead className="bg-richblack-800 text-richblack-100">
          <Tr>
            <Th className="p-4 text-left">COURSES</Th>
            <Th className="p-4 text-left">DURATION</Th>
            <Th className="p-4 text-left">PRICE</Th>
            <Th className="p-4 text-center">ACTIONS</Th>
          </Tr>
        </Thead>

        {/* BODY */}
        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              <Td className="p-6 text-center" colSpan={4}>
                NO COURSES FOUND
              </Td>
            </Tr>
          ) : (
            courses.map((course) => (
              <Tr
                key={course._id}
                className="border-b border-richblack-700 hover:bg-richblack-800 transition-all"
              >
                {/* COURSE INFO */}
                <Td className="p-4">
                  <div className="flex gap-4 items-start">
                    <img
                      src={course.thumbnail}
                      alt="course"
                      className="h-[120px] w-[200px] rounded-md object-cover"
                    />

                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-lg">
                        {course.courseName}
                      </p>

                      <p className="text-sm text-richblack-300 line-clamp-2">
                        {course.courseDescription}
                      </p>

                      <p className="text-xs text-richblack-400">
                        CREATED AT:{" "}
                        {/* {new Date(course.createdAt).toLocaleDateString()} */}
                      </p>

                      {course.status === "draft" ? (
                        <span className="text-xs text-red-500 font-medium">
                          Draft
                        </span>
                      ) : (
                        <span className="text-xs text-yellow-400 font-medium">
                          Published
                        </span>
                      )}
                    </div>
                  </div>
                </Td>

                {/* DURATION */}
                <Td className="p-4 text-sm text-richblack-200">2 hr 30 min</Td>

                {/* PRICE */}
                <Td className="p-4 font-medium">₹{course.price}</Td>

                {/* ACTIONS */}
                <Td className="p-4">
                  <div className="flex justify-center gap-4 text-lg">
                    {/* EDIT */}
                    <button
                      onClick={() =>
                        navigate(`/dashboard/edit-course/${course._id}`)
                      }
                      className="text-blue-400 hover:text-blue-300 transition"
                    >
                      <FaPen />
                    </button>

                    {/* DELETE */}
                    <button
                      disabled={loading}
                      className="text-red-400 hover:text-red-300 transition disabled:opacity-50"
                      onClick={() => {
                        setconfirmationmodal({
                          text1: "Delete this Course",
                          text2:
                            "All lectures inside this course will be deleted",
                          btn1text: "Delete",
                          btn2text: "Cancel",
                          btn1handler: () => {
                            if (!loading) handlecoursedelete(course._id);
                          },
                          btn2handler: () => {
                            if (!loading) setconfirmationmodal(null);
                          },
                        });
                      }}
                    >
                      <IoTrashBinSharp />
                    </button>
                  </div>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {confirmationmodal && <ConfirmationModal modaldata={confirmationmodal} />}
    </div>
  );
}

export default Coursetable
