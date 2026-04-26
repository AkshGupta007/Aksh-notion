const { populate } = require("../models/Category");
const profile = require("../models/profile");
const Course = require("../models/courses");
const user = require("../models/users");

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

const deleteprofile = async(req,res)=>{
    try{
        const userbody=req.user.id;
        const userdetails= await user.findById(userbody);
        if(!userdetails){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })  
        };
        const profileid=userdetails.additionaldetails;
        await profile.findByIdAndDelete(profileid);
        await user.findByIdAndDelete(userdetails._id);
        return res.status(200).json({
            success:true,
            message:"profile deleted successfully"
        })
    } catch(error){
        return res.status(500).json({
            success:false,
            message:"error in deleting profile"
        })
    }};

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
