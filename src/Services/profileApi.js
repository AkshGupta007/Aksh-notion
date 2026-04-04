import react from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiconnector } from "./apiconnector";
import { setLoading } from "../slices/authSlice";
import { setUser } from "../slices/ProfileSlice";
import { resetcart } from "../slices/Cartslice";
import { setToken } from "../slices/authSlice";

import { toast } from "react-toastify";
import { GET_ENROLLED_COURSES_API } from "./apis";

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiconnector(
      "GET",
      GET_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    console.log("GET_USER_ENROLLED_COURSES_API RESPONSE:",response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    // Assign the courses to result
    result = response.data.data;

    toast.success("Courses fetched successfully");
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    toast.error(error.message || "Could not fetch courses");
  } finally {
    toast.dismiss(toastId);
  }

  return result;
}