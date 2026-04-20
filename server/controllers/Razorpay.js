const { instance } = require("../connections/razorpay");
const user = require("../models/users");
const Course = require("../models/courses");
const {sendmail} = require("../utils/sendmail");
const mongoose = require("mongoose");
const crypto = require("crypto");
require("dotenv").config();
/////// capture the order and initiate razorpay payment

exports.capturepayment = async (req, res) => {
  //// get courseid and userid
  ///validation of ids and coursedetails
  //// previous payment check
  // order create
  /// return response

  try {
    const { courses } = req.body;
    const userid = req.user.id;

    if (courses.length === 0) {
      return res.status(400).json({
        success: "false",
        message: "provide course",
      });
    }

    // validare coursedetailsss
    let totalamount = 0;

    for (const courseid of courses) {
      let coursedetail;
      try {
        coursedetail = await Course.findById(courseid);

        if (!coursedetail) {
          return res.status(401).json({
            message: "course not found",
          });
        }

        const uid = new mongoose.Types.ObjectId(userid);

        if (coursedetail.studentsenrolled.includes(uid)) {
          console.log("alreaady enrolled h tu")
          return res.status(400).json({
            success: false,
            message: "user already enrolled in the course",
          });
        }

        totalamount += coursedetail.price;
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          error: error.message,
        });
      }
    }

    const amount = totalamount * 100;
    const currency = "INR";

    const options = {
      amount,
      currency,
      receipt: Math.random().toString(),
      notes: {
        courses,
        userid,
      },
    };
    ///// intitate payment using razorpat

    const paymentresponse = await instance.orders.create(options);
    console.log(paymentresponse);
    return res.status(200).json({
      success: true,
      message: paymentresponse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error in creating order",
      error: error.message,
    });
  }
};



exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courses,
    } = req.body;
    const userId = req.user?.id;

    // 🔍 Debug - remove after fix confirmed
    console.log(
      "RAZORPAY_SECRET loaded:",
      process.env.RAZORPAY_KEY_SECRET ? "YES" : "UNDEFINED ❌",
    );
    console.log("userId:", userId);
    console.log("courses:", courses);

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing parameters" });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Server misconfiguration: missing secret",
        });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Signature" });
    }

    await enrollstudents(userId, courses);

    return res.status(200).json({ success: true, message: "Payment Verified" });
  } catch (error) {
    console.error("Payment verification error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server Error" });
  }
};

const enrollstudents = async (userId, courses) => {
  console.log("in enroll students")
  if (!userId || !courses) {
    throw new Error("No user or course id given");
  }

  for (const courseid of courses) {
    console.log("Enrolling in course:", courseid);

    const coursedetails = await Course.findByIdAndUpdate(
      courseid,
      { $push: { studentsenrolled: userId } },
      { new: true },
    );
    console.log("Course updated:", coursedetails?._id);

    if (!coursedetails) {
      throw new Error(`Course ${courseid} doesn't exist`);
    }

    const userdetails = await user.findByIdAndUpdate(
      userId,
      { $push: { courses: courseid } },
      { new: true },
    );
    console.log("User updated:", userdetails?._id);

    if (!userdetails) {
      throw new Error("User doesn't exist");
    }

    console.log("✅ Enrolled successfully in:", courseid);
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  try {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user?.id;

    if (!orderId || !paymentId || !amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the fields" });
    }

    const enrolledStudent = await user.findById(userId);

    if (!enrolledStudent) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await sendmail(
      enrolledStudent.email,
      "Payment Received",
      `Hi ${enrolledStudent?.firstname}, your payment of ₹${amount / 100} was successful! Order ID: ${orderId}`,
    );

    return res
      .status(200)
      .json({ success: true, message: "Payment success email sent" });
  } catch (error) {
    console.error("Send payment email error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Could not send email" });
  }
};

