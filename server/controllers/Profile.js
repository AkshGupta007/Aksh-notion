const profile = require("../models/profile");
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

      const enrolledcourses = await user
        .findById(userid)
        .populate("courses");
      if (!enrolledcourses) {
        return res.status(404).json({
          success: false,
          message: "user not found or no enrolled courses",
        });
      }
      return res.status(200).json({
        success: true,
        message: "enrolled courses fetched successfully",
        data: enrolledcourses.courses,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in fetching enrolled courses",
        error: error.message, // or just `error` if you want the whole object
      });
    }

}
module.exports={updateprofile,deleteprofile,getalluserdetails,getenrolledcourses};