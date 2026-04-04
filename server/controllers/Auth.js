//send otp
// signup
// login
// channge password

const Otp = require("../models/otpschema");
const user = require("../models/users");
const profile = require("../models/profile");
const bcrypt = require("bcrypt");
const otpgenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const generateotp = async (req, res) => {
  try {
    // check if user exists

    const { email } = req.body;
    const check = await user.findOne({ email });
    if (check) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }

    var generatedotp = otpgenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    // making sure otp is unique
    const result = await Otp.findOne({ otp: generatedotp });
    while (result) {
      generatedotp = otpgenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      result = await Otp.findOne({ otp: generatedotp });
    }
    const otpbody = await Otp.create({ email, otp: generatedotp }); //otp send to user using pre hook
    return res.status(200).json({
      success: true,
      message: "otp sent successfully",
      data: otpbody,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};

const signup = async (req, res) => {
  try {
    // data from req body
    const {
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
      otp,
      accounttype,
    } = req.body;
    // validation of data
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !confirmpassword ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }
    // check user availablity
    const normalizedEmail = email.toLowerCase();
    const check = await user.findOne({ email: normalizedEmail });

    if (check) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }
    // 2 password match
    if (password !== confirmpassword) {
      return res
        .status(400)
        .json({ success: false, msg: "passwords dont match" });
    }
    //otp validation
    const recentotp = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (recentotp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "otp not found",
      });
    } else if (recentotp[0].otp != otp) {
      return res.status(400).json({
        success: false,
        message: "invalid otp",
      });
    }
    // paswsword hashing
    const hashedpassword = await bcrypt.hash(password, 10);
    /////// db entry
    const profiledata = await profile.create({
      gender: null,
      dob: null,
      about: null,
      contact: null
    });
    const userdata = await user.create({
      firstname,
      lastname,
      email,
      password: hashedpassword,
      accounttype,
      additionaldetails: profiledata._id,
    });
    return res.status(200).json({
      success: true,
      message: "user registered congo",
      data: userdata,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    ////////////validation//////
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "incomplete creditials",
      });
    }
    const userdata = await user.findOne({ email }).populate("additionaldetails");
    ///////chceck user existence////
    if (!userdata) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    ////////////generate token/////
    const payload = {
      id: userdata._id,
      email: userdata.email,
      username: userdata.firstname,
      accounttype: userdata.accounttype,
    };
    //// password matching and token generation///

    const ismatch = await bcrypt.compare(password, userdata.password);
     if( !ismatch){
      return res.status(400).json({
        success:false,
       message:"incorrect password"
      })
     }

  
      const token = jwt.sign(payload, process.env.JWT_SECRET)
      userdata.token=token;
    

    // set cookie and send response

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.cookie("token", token, options).status(200).json({
      success: true,
      message: "login succesfuly",
      user:userdata,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred in login",
    });
  }
};

const changepassword = async (req, res) => {
  try {
    const { email, password, newpassword, confirmpassword } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and current password required",
      });
    }

    const userdata = await user.findOne({ email });
    if (!userdata) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, userdata.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect current password",
      });
    }

    if (newpassword !== confirmpassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    const updatedUser = await user.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in changing password",
    });
  }
};



  module.exports={
    generateotp,
    signup,
    login,
    changepassword
  }