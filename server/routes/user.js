const express = require('express');
const router=express.Router();

const { generateotp, signup, login, changepassword }=require('../controllers/Auth');

const { Authorization}=require('../middlewares/Auth');

const { resetpasswordtoken, resetpassword }=require('../controllers/resetpasspword');

const { sendemail }=require('../controllers/SendEmail');
//////////// auth routes////////

router.post('/login',login);
router.post('/signup',signup);
router.post('/sendotp',generateotp);

router.post('/changepassword',Authorization,changepassword);

router.post('/resetpasswordtoken',resetpasswordtoken);
router.post('/resetpassword',resetpassword);

router.post('/contactus',sendemail);

module.exports=router;