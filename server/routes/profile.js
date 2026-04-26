const express = require('express');
const router=express.Router();

const { Authorization } = require("../middlewares/Auth");

const { updateprofile, deleteprofile, getalluserdetails, getenrolledcourses,instructorDashboard } = require("../controllers/Profile");

router.put('/updateprofile', Authorization, updateprofile);
router.delete('/deleteprofile', Authorization, deleteprofile);
router.get('/getalluserdetails', Authorization, getalluserdetails);
router.get('/getenrolledcourses', Authorization, getenrolledcourses);
router.get('/instructordashboard', Authorization, instructorDashboard);

module.exports=router;