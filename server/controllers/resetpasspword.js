const user=require('../models/users');
const{sendmail}=require('../utils/sendmail');
const crypto=require('crypto');
const bcrypt=require('bcrypt');


require("dotenv").config();
const CLIENT_URL = process.env.CLIENT_URL;

const resetpasswordtoken=async(req,res)=>{



  // get email
  // get email

  // check user and alidate
  //generate token
  // update user by token and its expiry time
  // generate url in frontend port
  //send email containg url
  //return response
  try {
    const { email } = req.body;
    const userid = await user.findOne({ email });
    if (!userid) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    const token = crypto.randomUUID();
    const updatedetails = await user.findOneAndUpdate(
      { email: email },
      { token: token, tokenexpiry: Date.now() + 5 * 60 * 1000 },
      { new: true },
    );
    const url = `${CLIENT_URL}/update-password/${token}`;
    //// send email containing url
    await sendmail(email, "password reset link", url);
    return res.json({
      success: true,
      message: "password reset link sent to your email",
      data: updatedetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in reset password",
      error: error.message,
    });
  }
}
 ////////reset password///

 const resetpassword=async(req,res)=>{
    // get token, pass,and confirm pass form boy
    // validate//
    // check user by token
    // check token expiry
    // hash and update password

    try{
        const{password,confirmpassword,token}=req.body;
        // validation
        if (password!==confirmpassword){
            return res.status(400).json({
                success:false,
                message:"password and confirm password does not match"
            })
        }
        const userid= await user.findOne({token:token});
        if(!userid){
            return res.status(400).json({
                success:false,
                message:"invalid token"
            })
        }
        if(userid.tokenexpiry<Date.now()){
            return res.status(400).json({
                success:false,
                message:"token expired"
            })
        }
        const hashedpassword= await bcrypt.hash(password,10);
        const updatepassword= await user.findByIdAndUpdate(userid._id,{password:hashedpassword},{new:true});
        return res.status(200).json({
            success:true,
            message:"password reset successful",
    })
} catch(error){
    return res.status(500).json({
        success:false,
        message:"error in resetting password"
    })
}
 };

 module.exports={
    resetpasswordtoken,
    resetpassword
}