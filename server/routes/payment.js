const express = require('express');
const router=express.Router();

const{ Authorization,isstudent}=require('../middlewares/Auth');


const { capturepayment , verifyPayment ,sendPaymentSuccessEmail}=require('../controllers/Razorpay') ;

router.post('/capturepayment',Authorization,isstudent,capturepayment);
router.post('/verifysignature',Authorization,isstudent,verifyPayment);
router.post("/sendpaymentemail", Authorization,isstudent, sendPaymentSuccessEmail);

module.exports=router;