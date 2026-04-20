const jwt = require("jsonwebtoken");
require("dotenv").config();

////// authorization////////
const Authorization = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.headers["authorization"]?.split(" ")[1]?.replace(/"/g, "");

    // console.log("Auth header:", req.headers["authorization"]);
    console.log("Auth header:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "unauthorized access",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decode); // 👀 check payload
    req.user = decode;
    next();
  } catch (error) {
    console.log(error.name, error.message);
    return res.status(500).json({
      success: false,
      message: "authorization failed",
    });
  }
};
/////////isstudent///
const isstudent = async (req, res, next) => {
  try {
    if (req.user.accounttype != "user") {
      return res.status(403).json({
        success: false,
        message: "access denied, students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "authorization failed",
    });
  }
};

//////isadmin/////

const isadmin = async (req, res, next) => {
  try {
    if (req.user.accounttype != "admin") {
      return res.status(403).json({
        success: false,
        message: "access denied, admin only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "authorization failed",
    });
  }
};

//////isinstructor/////

const isInstructor = async (req, res, next) => {
  try {
    if (req.user.accounttype != "instructor") {
      return res.status(403).json({
        success: false,
        message: "access denied, instructor only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "authorization failed",
    });
  }
};

module.exports = {
  Authorization,
  isstudent,
  isadmin,
  isInstructor,
};
