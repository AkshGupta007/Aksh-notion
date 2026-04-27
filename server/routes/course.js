const express = require('express');
const router=express.Router();



const{Authorization,
    isstudent,
    isadmin,
    isInstructor
}=require('../middlewares/Auth');

// course controllers import

const {
  createcourse,
  getallcourses,
  getcoursedetails,
  updateCourse,
  getInstructorCourses,
  deleteinstructorcourse,
} = require("../controllers/course");


/// course progress controler

const { markLectureAsComplete ,getCourseProgress} = require("../controllers/CourseProgress");

/// categories controllers import

const { createCategory, getallCategory, getcategorypagedetails }= require('../controllers/Category');

///// section controllers import

const{ createsection,deletesection, updatesection }=require('../controllers/Section');

///// sub-section controllers import

const{ createsubsection, deletesubsection, updatesubsection }=require('../controllers/subsection');

//// rating controllers import

const{ createreview,getavgrating, allreviews,getallcoursereviews }=require('../controllers/ratingAndreview');



/////////////
///////////////////course routes//////////

router.post("/createcourse", Authorization, isInstructor, createcourse); //// cousrse create by instructor

router.put('/updatecourse',Authorization,isInstructor, updateCourse); //// cousrse update by instructor
router.get('/getallcourses', getallcourses); /// get all courses
router.post('/getcoursedetails', getcoursedetails); /// get course details by id
router.get('/getinstructorcourses',Authorization, getInstructorCourses);
router.post("/deleteinstructorcourse", Authorization,isInstructor,deleteinstructorcourse);

///////// category routes//////////
router.post('/createCategory', Authorization,isadmin, createCategory); /// create category by admin
router.get('/getallCategories', getallCategory); /// get all categories
router.post('/getcategorypagedetails', getcategorypagedetails); /// get category page details by id


///////// section routes////////
router.post('/createsection', Authorization,isInstructor, createsection);
router.delete('/deletesection', Authorization,isInstructor, deletesection);
router.put('/updatesection', Authorization,isInstructor, updatesection);


///////// sub-section routes/////////
router.post('/createsubsection', Authorization,isInstructor, createsubsection);
router.put('/updatesubsection',Authorization,isInstructor,updatesubsection)
router.delete('/deletesubsection',Authorization, isInstructor, deletesubsection);

///////// rating and review routes//////////
router.post('/createreview', Authorization,isstudent, createreview);
router.get('/getaveragerating', getavgrating);
router.get('/getallreviews', allreviews);
router.post('/getallcoursereviews',getallcoursereviews);

///////// course progress routes//////////

router.post('/marklecturecomplete', Authorization,isstudent, markLectureAsComplete);
router.post('/getcourseprogress', Authorization,isstudent, getCourseProgress);
module.exports=router;