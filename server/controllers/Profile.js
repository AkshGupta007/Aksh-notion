const { populate } = require("../models/Category");
const profile = require("../models/profile");
const Course = require("../models/courses");
const user = require("../models/users");
const Category = require("../models/Category");
const CourseProgress = require("../models/courseprogress");
const ratingandreview = require("../models/ratingandreview");
const Section = require("../models/section");
const subsection = require("../models/subsection");
// const cloudinary = require("../utils/imageuploader");

const updateprofile = async (req, res) => {
    try{
        const{dob,about,contact,gender}= req.body;

        console.log("data is",dob,about,contact,gender)
        const userbody=req.user.id;

    if (!contact && !gender && !about && !dob) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required",
      });
    }
        const userdetails= await user.findById(userbody);
        const profileid=userdetails.additionaldetails;

        const updatedprofile = await profile.findByIdAndUpdate(
          profileid,
          {
            "additionaldetails.gender": gender,
            "additionaldetails.dob": dob,
            "additionaldetails.about": about,
            "additionaldetails.contact": contact,
          },
          { new: true },
        );

        return res.status(200).json({
            success:true,
            message:"profile updated successfully",
            data:updatedprofile
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"error in updating profile"
        })
    }
}

// const deleteprofile = async(req,res)=>{
//     try{
//         const userbody=req.user.id;
//         const userdetails= await user.findById(userbody);
//         if(!userdetails){
//             return res.status(404).json({
//                 success:false,
//                 message:"user not found"
//             })  
//         };
//         const profileid=userdetails.additionaldetails;
//         await profile.findByIdAndDelete(profileid);
//         await user.findByIdAndDelete(userdetails._id);
//         return res.status(200).json({
//             success:true,
//             message:"profile deleted successfully"
//         })
//     } catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"error in deleting profile"
//         })
//     }};
// ✅ Delete reviews — works for both instructor and student
const deleteUserReviews = async (userId) => {
  const reviews = await ratingandreview.find({ user: userId });
  for (const review of reviews) {
    await Course.findByIdAndUpdate(review.course, {
      $pull: { ratingAndReviews: review._id },
    });
    const remaining = await ratingandreview.find({
      course: review.course,
      _id: { $ne: review._id },
    });}
  //   const avg =
  //     remaining.length > 0
  //       ? remaining.reduce((acc, r) => acc + r.rating, 0) / remaining.length
  //       : 0;
  //   await Course.findByIdAndUpdate(review.course, {
  //     averageRating: parseFloat(avg.toFixed(1)),
  //   });
  // }
  await ratingandreview.deleteMany({ user: userId });
};


const deleteprofile = async (req, res) => {
  const userId = req.user.id;
  const userdetails = await user.findById(userId);

  if (userdetails.accounttype === "instructor") {
    // delete all their courses + sections + subsections
    const courses = await Course.find({ instructor: userId });
    for (const course of courses) {
      for (const sectionId of course.coursecontent) {
        const section = await Section.findById(sectionId);
        for (const subId of section.subsections) {
          const sub = await subsection.findById(subId);
          // delete video from cloudinary
          // await cloudinary.uploader.destroy(sub.cloudinaryPublicId);
          await subsection.findByIdAndDelete(subId);
        }
        await Section.findByIdAndDelete(sectionId);
      }
      // remove course from enrolled students
      await User.updateMany(
        { _id: { $in: course.studentsenrolled } },
        { $pull: { courses: course._id } },
      );
      await Course.findByIdAndDelete(course._id);
    }
  }

  if (userdetails.accounttype === "user") {
    // remove student from all enrolled courses
    await Course.updateMany(
      { _id: { $in: userdetails.courses } },
      { $pull: { studentsenrolled: userId } },
    );
    // delete progress records
    await CourseProgress.deleteMany({ userId });
  }

  // // delete profile picture from cloudinary
  // if (userdetails.imagePublicId) {
  //   await cloudinary.uploader.destroy(userdetails.imagePublicId);
  // }

  // delete profile and user
  await profile.findByIdAndDelete(userdetails.additionaldetails);
  await user.findByIdAndDelete(userId);
  await deleteUserReviews(userId);

  res.status(200).json({ success: true, message: "Account deleted" });
};



const getalluserdetails = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({
        success: false,
        message: "User ID missing from request",
      });
    }

    const userid = req.user.id;
    const userDetails =
      await user.findById(userid).populate("additionaldetails");

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching user details",
      error: error.message,
    });
  }
};


const getenrolledcourses= async(req,res)=>{
    try {
      const userid = req.user.id;

     const enrolledcourses = await user.findById(userid).populate({
       path: "courses", // populate the user's courses
       populate: {
         path: "coursecontent", // inside each course, populate coursecontent
         populate: {
           path: "subsections", // inside each section, populate subsections
         },
       },
     });
      if (!enrolledcourses) {
        return res.status(404).json({
          success: false,
          message: "user not found or no enrolled courses",
        });
      }

      // ✅ calculate totalDuration for each course
    const coursesWithDuration = enrolledcourses.courses.map((course) => {
      let totalSeconds = 0;

      course.coursecontent?.forEach((section) => {
        section.subsections?.forEach((sub) => {
          const duration = parseFloat(sub.timeduration) || 0; // ✅ field from your subsection model
          totalSeconds += duration;
        });
      });

      // ✅ convert seconds → "Xh Ym" format
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);

      const totalDuration =
        hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

      return {
        ...course.toObject(), // ✅ spread mongoose doc as plain object
        totalDuration,        // ✅ attach calculated duration
      };
    });
      
      return res.status(200).json({
        success: true,
        message: "enrolled courses fetched successfully",
        data: coursesWithDuration,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in fetching enrolled courses",
        error: error.message, // or just `error` if you want the whole object
      });
    }

}


// Controller: Instructor Dashboard
const instructorDashboard = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id });

    const courseData = courses.map(course => ({
      _id: course._id,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      totalStudentsEnrolled: course.studentsenrolled.length,
      totalAmountGenerated: course.studentsenrolled.length * course.price,
    }));

    res.status(200).json({ courses: courseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports={updateprofile,deleteprofile,getalluserdetails,getenrolledcourses,instructorDashboard};
