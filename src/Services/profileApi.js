import {apiconnector} from "./apiconnector";
import { toast } from "react-toastify";
import {
  GET_ENROLLED_COURSES_API,
  GET_ALL_COURSE_REVIEWS_API,
  GET_ALL_REVIEWS_API,
  INSTRUCTOR_DASHBOARD_API
} from "./apis";

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiconnector("GET", GET_ENROLLED_COURSES_API, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("GET_USER_ENROLLED_COURSES_API RESPONSE:", response);

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

export const fetchallreviews = async () => {
  let result = [];
  try {
    const response = await apiconnector("GET", GET_ALL_REVIEWS_API, null, {});

    result = response?.data?.data;
  } catch (error) {
    console.error("Error fetching response", error);
    toast.error(error.response.data.message || "Could not fetch reviews");
  }
  return result;
};

export const fetchallcoursereviews = async (courseId) => {
  let result = [];
  try {
    const response = await apiconnector(
      "POST",
      GET_ALL_COURSE_REVIEWS_API,
      { courseId },
      {},
    );

    result = response?.data?.data;
  } catch (error) {
    console.error("Error fetching response", error);
    toast.error(
      error.response.data.message || "Could not fetch course reviews",
    );
  }
  return result;
};

export const getInstructorDashboard = async (token) => {
  try {
    const response = await apiconnector("GET", INSTRUCTOR_DASHBOARD_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (response?.data?.courses) {
      return response.data.courses;
    } else {
      throw new Error(response?.data?.message || "Failed to fetch dashboard");
    }
  } catch (error) {
    console.error("Dashboard error:", error.response?.data || error.message);
    throw error;
  }
};