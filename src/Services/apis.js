const BASE_URL = process.env.REACT_APP_BASE_URL;

export const CATEGORIES_API = `${BASE_URL}/course/getallCategories`;
export const CATEGORIES_PAGE_DETAILS_API = `${BASE_URL}/course/getcategorypagedetails`;


export const LOGIN_API = `${BASE_URL}/user/login`;
export const SIGNUP_API = `${BASE_URL}/user/signup`;
export const SENDOTP_API = `${BASE_URL}/user/sendotp`;
export const RESETPASSWORDTOKEN_API = `${BASE_URL}/user/resetpasswordtoken`;
export const RESETPASSWORD_API = `${BASE_URL}/user/resetpassword`;
export const UPDATEPROFILE_API = `${BASE_URL}/profile/updateprofile`;
export const CHANGEPASSWORD_API = `${BASE_URL}/user/changepassword`;
export const DELETEPROFILE_API = `${BASE_URL}/profile/deleteprofile`;



export const ORDER_RESPONSE_API = `${BASE_URL}/payment/capturepayment`;
export const COURSE_VERIFY_API = `${BASE_URL}/payment/verifysignature`;
export const SEND_PAYMENT_SUCCESS_EMAIL_API = `${BASE_URL}/payment/sendpaymentemail`;






export const GET_ENROLLED_COURSES_API = `${BASE_URL}/profile/getenrolledcourses`;

export const EDIT_COURSE_API = `${BASE_URL}/course/updatecourse`;

export const CREATE_COURSE_API = `${BASE_URL}/course/createcourse`;

export const DELETE_INSTRUCTOR_COURSE_API = `${BASE_URL}/course/deleteinstructorcourse`;

export const GET_INSTRUCTOR_COURSES_API = `${BASE_URL}/course/getinstructorcourses`;

export const GET_COURSE_DETAILS_API = `${BASE_URL}/course/getcoursedetails`;

export const UPDATE_SECTION_API=`${BASE_URL}/course/updatesection`;
export const CREATE_SECTION_API = `${BASE_URL}/course/createsection`;
export const DELETE_SECTION_API = `${BASE_URL}/course/deletesection`;

export const CREATE_SUBSECTION_API = `${BASE_URL}/course/createsubsection`;
export const UPDATE_SUBSECTION_API = `${BASE_URL}/course/updatesubsection`;
export const DELETE_SUBSECTION_API = `${BASE_URL}/course/deletesubsection`;

// console.log("BASE_URL:", process.env.REACT_APP_BASE_URL);



///////// section routes////////
// router.post('/createsection', Authorization,isInstructor, createsection);
// // router.delete('/deletesection/:sectionid', Authorization,isInstructor, deletesection);
// // router.put('/updatesection/:sectionid', Authorization,isInstructor, updatesection);


// ///////// sub-section routes/////////
// router.post('/createsubsection', Authorization,isInstructor, createsubsection);
// router.delete('/deletesubsection', isInstructor, deletesubsection);
