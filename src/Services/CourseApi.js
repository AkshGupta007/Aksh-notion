// import react from "react";
// import { useDispatch, useSelector } from "react-redux";
import { apiconnector } from "./apiconnector";
// import { setLoading } from "../slices/authSlice";
// import { setUser } from "../slices/ProfileSlice";
// import { resetcart } from "../slices/Cartslice";
// import { setToken } from "../slices/authSlice";
import { toast } from "react-toastify";
import {
  CATEGORIES_API,
  EDIT_COURSE_API,
  CREATE_COURSE_API,
  CREATE_SECTION_API,
  UPDATE_SECTION_API,
  DELETE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SUBSECTION_API,
  GET_INSTRUCTOR_COURSES_API,
  DELETE_INSTRUCTOR_COURSE_API,
  GET_COURSE_DETAILS_API,
  CATEGORIES_PAGE_DETAILS_API,
  CREATE_RATINGANDREVIEW_API,
  MARK_LECTURE_COMPLETE_API,
  GET_COURSE_PROGRESS_API,
} from "./apis";

export const fetchCategories = async () => {
  try {
    const result = await apiconnector("GET", CATEGORIES_API);

    // console.log("printing", result.data.data);
    // toast.success("Categories fetched successfully");

    return result.data.data;
  } catch (error) {
    console.log("error" + error);
    toast.error("Could not fetch categories");
  }
};


export const fetchPageCategories = async (categoryid) => {
  try {
    const result = await apiconnector("POST", CATEGORIES_PAGE_DETAILS_API,{categoryid});

    console.log("printing category page data", result.data.data);
    // toast.success("Categories fetched successfully");

    return result.data.data;
  } catch (error) {
    console.log("error",error);
    toast.error("Could not fetch page details");
  }
};

export const updatecourse = async (formData, token) => {
  try {
    const response = await apiconnector("PUT", EDIT_COURSE_API, formData, {
      Authorization: `Bearer ${token}`, // ✅ attach token properly
    });
    toast.success("UPDATE successfull");
    return response.data.Course;
  } catch (error) {
    console.log("error", error);
    toast.error("error in updating");
  }
};

export const addcourse = async (formData, token) => {
  for (let [key, value] of formData.entries()) {
    //   console.log("we are in addd course",key, value);
  }
  try {
    const response = await apiconnector("POST", CREATE_COURSE_API, formData, {
      Authorization: `Bearer ${token}`, // ✅ attach token properly
    });

    console.log("response is", response.data);
    console.log("response is", response.data.course);

    toast.success("COURSE ADDED SUCCESSFULLY");
    return response.data.course;
  } catch (error) {
    console.log("error", error);

    toast.error("error in adding course");
  }
};

export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector("PUT", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log(
      "UPDATE SECTION API RESPONSE............",
      response.data.course,
    );
    if (!response?.data?.course) {
      throw new Error("Could Not Update Section");
    }
    toast.success("Course Section Updated");
    result = response?.data?.course;
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log(
      "CREATE SECTION API RESPONSE............",
      response.data.course,
    );
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section");
    }
    toast.success("Course Section Updated");
    result = response?.data?.course;
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSection = async (sectionId, courseid, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "DELETE",
      DELETE_SECTION_API,
      {
        sectionId,
        courseid,
      },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    console.log(
      "DELETE SECTION API RESPONSE............",
      response.data.course,
    );
    if (!response?.data?.success) {
      throw new Error("Could Not delete Section");
    }
    toast.success("delete Section Updated");
    result = response?.data?.course;
  } catch (error) {
    console.log("delete SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
/////// review api


export const createRatingAndReview=async({ courseid, rating, review }, token)=>{
  const toastId = toast.loading("Loading...");
  try {
     
    const result = await apiconnector(
      "POST",
      CREATE_RATINGANDREVIEW_API,
      { courseid, rating, review },
      {
        Authorization: `Bearer ${token}`,
      },
    );

    if(result?.data?.success){
        toast.success("review created successfully");
        return result.data.data;
    }
  } catch (error) {
    console.error("Full error object:", error);
    console.error("Controller response:", error.response?.data);

    toast.error(error.response?.data?.message || error.message);}
  toast.dismiss(toastId);
}




///// course progress api 

// mark lecture as complete
export const markLectureAsComplete = async (courseId, subsectionId, token) => {
  let result = false;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiconnector(
      "POST",
      MARK_LECTURE_COMPLETE_API,
      { courseId, subsectionId },
      {
        Authorization: `Bearer ${token}`,
      },
    );

    console.log("API RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success("Lecture Completed");
    result = true;
  } catch (error) {
    console.log("API ERROR:", error);
    toast.error(error.message);
    result = false;
  }

  toast.dismiss(toastId);
  return result;
};

// get course progress
export const getCourseProgress = async (courseId, token) => {
  try {
    const response = await apiconnector(
      "POST",
      GET_COURSE_PROGRESS_API,
      { courseId },
      { Authorization: `Bearer ${token}` },
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    return response?.data?.data; // returns courseProgress object with completedsubsections
  } catch (error) {
    console.log("API ERROR:", error);
    // ✅ return empty progress instead of null so .completedsubsections doesn't crash
    return { completedsubsections: [] };
  }
};

/// subsection api

// export const deleteSubSection = async (courseID, subsectionID, sectionId, token) => {
//   let result = null;
//   const toastId = toast.loading("Loading...");
//   try {
//     const response = await apiconnector("DELETE", DELETE_SUBSECTION_API, {
//       courseID,
//       subsectionID,
//       sectionId
//     }, {
//       Authorization: `Bearer ${token}`,
//     });
//     console.log(
//       "DELETE SUBSECTION API RESPONSE............",
//       response.data.course,
//     );
//     if (!response?.data?.success) {
//       throw new Error("Could Not delete Section");
//     }
//     toast.success("delete Section Updated");
//     result = response?.data?.course;
//   } catch (error) {
//     console.log("delete SUBSECTION API ERROR............", error);
//     toast.error(error.message);
//   }
//   toast.dismiss(toastId);
//   return result;
// };

// export const UpdateSubSection = async (data,courseID token) => {
//   let result = null;
//   const toastId = toast.loading("Loading...");
//   try {
//     const response = await apiconnector("POST", UPDATE_SUBSECTION_API, {
//       sectionId:data.sectionId,
//       courseID,
//       subsectionID:data.subsectionID
//     }, {
//       Authorization: `Bearer ${token}`,
//     });
//     console.log(
//       "UPDATED SUBSECTION API RESPONSE............",
//       response.data.course,
//     );
//     if (!response?.data?.success) {
//       throw new Error("Could Not delete Section");
//     }
//     toast.success("updated Section Updated");
//     result = response?.data?.course;
//   } catch (error) {
//     console.log("updatedSUBSECTION API ERROR............", error);
//     toast.error(error.message);
//   }
//   toast.dismiss(toastId);
//   return result;
// };

// export const CreateSubSection = async (data, token) => {
//   let result = null;
//   const toastId = toast.loading("Loading...");
//   try {
//     const response = await apiconnector("POST", CREATE_SUBSECTION_API, data, {
//       Authorization: `Bearer ${token}`,
//     });
//     console.log(
//       "CREATED SUBSECTION API RESPONSE............",
//       response.data.course,
//     );
//     if (!response?.data?.success) {
//       throw new Error("Could Not CREATEe SUBSECTION")
//     }
//     toast.success("CREATE SUBSECTION SUCCES");
//     result = response?.data?.course;
//   } catch (error) {
//     console.log("CREATESUBSECTION API ERROR............", error);
//     toast.error(error.message);
//   }
//   toast.dismiss(toastId);
//   return result}

// ✅ Fix: signature now (data, token) — courseID lives inside FormData
export const CreateSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }
    const response = await apiconnector("POST", CREATE_SUBSECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATED SUBSECTION API RESPONSE", response.data.course);
    if (!response?.data?.success) {
      throw new Error("Could not create SubSection");
    }
    toast.success("Lecture created successfully");
    result = response?.data?.course;
  } catch (error) {
    console.log("CREATE SUBSECTION API ERROR", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// ✅ Fix 1: missing comma between courseID and token in params
// ✅ Fix 2: send formData directly so all changed fields (title/desc/video) are included
export const UpdateSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATED SUBSECTION API RESPONSE", response.data.course);
    if (!response?.data?.success) {
      throw new Error("Could not update SubSection");
    }
    toast.success("Lecture updated successfully");
    result = response?.data?.course;
  } catch (error) {
    console.log("UPDATE SUBSECTION API ERROR", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSubSection = async (
  courseID,
  subsectionID,
  sectionID,
  token,
) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    console.log("deatils are", courseID);
    console.log("subsection", subsectionID);
    console.log("section", sectionID);
    console.log("api", DELETE_SUBSECTION_API);
    const response = await apiconnector(
      "DELETE",
      DELETE_SUBSECTION_API,
      { courseID, subsectionID, sectionID },
      { Authorization: `Bearer ${token}` },
    );
    console.log("DELETE SUBSECTION API RESPONSE", response.data.course);
    if (!response?.data?.success) {
      throw new Error("Could not delete SubSection");
    }
    toast.success("Lecture deleted successfully");
    result = response?.data?.course;
  } catch (error) {
    console.log("DELETE SUBSECTION API ERROR", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchinstructorcourses = async (token) => {
  let result;
  try {
    const response = await apiconnector(
      "GET",
      GET_INSTRUCTOR_COURSES_API,
      {},
      {
        Authorization: `Bearer ${token}`,
      },
    );

    if (!response?.data?.success) {
      throw new Error("Could not fetch courses of instructors");
    }

    // console.log("printing", response.data.courses);
    // toast.success("Courses fetched successfully");

    result = response?.data.courses;
  } catch (error) {
    console.log("error", error);
    toast.error("Could not fetch courses of instructors");
  }
  return result;
};

//deleteinstructorcourse;

export const deleteinstructorcourse = async (courseId,token) => {

  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "POST",
      DELETE_INSTRUCTOR_COURSE_API,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      },
    );
  
    if (!response?.data?.success) {
      throw new Error("Could Not delete Section");
    }
    toast.success("Course Deleted successfuly");
  
  } catch (error) {
    console.log("delete SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);

};


export const fetchcoursedetails = async (courseId,token) => {
  let result;
  try {
    const response = await apiconnector(
      "POST",
      GET_COURSE_DETAILS_API,
      { courseId },
      {
        Authorization: `Bearer ${token}`,
      },
    );

    if (!response?.data?.success) {
      throw new Error("Could not fetch course details");
    }

    // console.log("printing", response.data.courses);
    // toast.success("Course details fetched successfully");

    result = response?.data;

    console.log("printing result of course details", result);
  } catch (error) {
    console.log("error", error);
    toast.error("Could not fetch courses details");
  }
  return result;
};
