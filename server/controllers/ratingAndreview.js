const ratingandreview= require("../models/ratingandreview");
const Course= require("../models/courses");
const mongoose = require("mongoose");
exports.createreview = async (req, res) => {
  try {
    const { courseid, rating, review } = req.body;
    const userid = req.user.id;

    console.log("courseid:", courseid);
    console.log("userid:", userid);

    // ✅ validation
    if (!courseid || !rating || !review) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ rating validation
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // ✅ check enrollment
    const userEnrolled = await Course.findOne({
      _id: courseid,
      studentsenrolled: {
        $elemMatch: {
          $eq: new mongoose.Types.ObjectId(userid),
        },
      },
    });

        console.log("userEnrolled:", userEnrolled);

    if (!userEnrolled) {
      return res.status(403).json({
        success: false,
        message: "User not enrolled in course",
      });
    }

    // ✅ check duplicate review
    const alreadyReviewed = await ratingandreview.findOne({
      user: userid,
      course: courseid,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "User already reviewed this course",
      });
    }

console.log("alreadyReviewed:", alreadyReviewed);
    // ✅ create review
    const ratingAndReview = await ratingandreview.create({
      user: userid,
      course: courseid,
      rating,
      review,
    });

    // ✅ update course
    await Course.findByIdAndUpdate(
      courseid,
      {
        $push: {
          ratingandreview: ratingAndReview._id,
        },
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Review created successfully",
      data: ratingAndReview,
    });
  } catch (error) {
    console.error("ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error in creating review",
      error: error.message,
    });
  }
};

exports.getavgrating= async(req,res)=>{
    try{
        const courseid=req.body.courseid;
        ///// aggregrate functions to calculate average rating and total number of reviews

        const results = await ratingandreview.aggregrate([
            {
                $match:{course:mongoose.Types.ObjectId(courseid)}
            },
            {
                $group:{
                    _id:null,
                    Avgrating:{$avg:"$rating"}
                }
            }
        ])
    if(results.length>0){
        return res.status(200).json({
            success:true,
            Avgrating:results[0].Avgrating
        })
     } else{
        return res.status(200).json({
            success:true,
            Avgrating:0
        })
    }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"error in getting average rating"
        })
    }}

exports.allreviews= async(req,res)=>{
        try{
            const allreviews= await ratingandreview.find({}).sort({ rating:-1}).populate({
                path:"user",
                select: " Firstname Lastname email"
            }).populate({
                path:"course",
                select:"coursename"
            }).exec();
            return res.status(200).json({
                success:true,
                message:"all reviews fetched successfully",
                data:allreviews
            })
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"error in fetching all reviews"
            })
        }}