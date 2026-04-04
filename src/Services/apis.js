const BASE_URL = process.env.REACT_APP_BASE_URL;

export const CATEGORIES_API = `${BASE_URL}/course/getallCategories`;
export const LOGIN_API = `${BASE_URL}/user/login`;
export const SIGNUP_API = `${BASE_URL}/user/signup`;
export const SENDOTP_API = `${BASE_URL}/user/sendotp`;
export const RESETPASSWORDTOKEN_API = `${BASE_URL}/user/resetpasswordtoken`;
export const RESETPASSWORD_API = `${BASE_URL}/user/resetpassword`;
export const UPDATEPROFILE_API = `${BASE_URL}/profile/updateprofile`;
export const CHANGEPASSWORD_API = `${BASE_URL}/user/changepassword`;
export const DELETEPROFILE_API = `${BASE_URL}/profile/deleteprofile`;

export const GET_ENROLLED_COURSES_API = `${BASE_URL}/profile/getenrolledcourses`;

// console.log("BASE_URL:", process.env.REACT_APP_BASE_URL);
