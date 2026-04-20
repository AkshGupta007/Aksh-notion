const Course=require('../models/courses');
const user = require('../models/users');
const Category=require('../models/Category');
const {uploadimagetocloudinary}=require('../utils/imageuploader');

// exports.createcourse= async(req,res)=>{
//     try{

//         console.log("Course route hit");
//         //fetch data
//         const {
//           courseName,
//           courseDescription,
//           price,
//           whatYouWillLearn,
//           Categoryid,
//           tags,
//           instructions,
//         } = req.body;
//         const thumbnail=req.files.thumbnailimage;

//         //validate
//         if(!courseName || !courseDescription || !price || !whatYouWillLearn  || !tags || !instructions){
//             console.log("image of course:", thumbnail);
//             return res.status(400).json({
//                 success:false,
//                 message:"all fields are required",
            
//             })

//         }
//         // instructor details
//         const userid=req.user.id;
//         const instructordetails= await user.findById(userid);
//         if(!instructordetails){
//             return res.status(404).json({
//                 success:false,
//                 message:"instructor not found"
//             })
//         }

//         // tag validation
//         const tagvaliation = await Category.findById(Categoryid);
//         if(!tagvaliation){
//             return res.status(404).json({
//                 success:false,
//                 message:"category not found"
//             })
//         }

//         // image upload to cloudinary
//         const thumbnailimage= await uploadimagetocloudinary(thumbnail,process.env.CLOUDINARY_FOLDER_NAME);


//         ////// entry in database

//         const coursedetail= await course.create({
//             courseName,
//             courseDescription,
//             price,
//             thumbnail:thumbnailimage.secure_url,
//             instructor:instructordetails._id,
//             Category:tagvaliation._id,
//             tags:JSON.parse(tags),
//             instructions:JSON.parse(instructions),
//             whatYouWillLearn
//         })
//         return res.status(200).json({
//             success:true,
//             message:"course created successfully",
//             coursedetail,
//         })
//     }
//     catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"error in creating course",
//             error:error.message
//         })
//     }
// }

exports.createcourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      price,
      whatYouWillLearn,
      category,
      tags,
      instructions,
    } = req.body;
    const thumbnail = req.files?.thumbnail;

            const thumbnailimage = await uploadimagetocloudinary(
              thumbnail,
              process.env.CLOUDINARY_FOLDER_NAME,
            );


    if (
      !courseName ||
      !courseDescription ||
      price == null ||
      !whatYouWillLearn ||
      !category ||
      !tags ||
      !instructions 
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userId = req.user?.id;
    const instructor = await user.findById(userId);
    if (!instructor)
      return res
        .status(404)
        .json({ success: false, message: "Instructor not found" });

    const categoryDoc = await Category.findById(category);
    if (!categoryDoc)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    let parsedTags;
    try {
      parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
    } catch {
      return res
        .status(400)
        .json({ success: false, message: "Invalid tags format" });
    }

  

    const courseDoc = await Course.create({
      courseName,
      courseDescription,
      price,
      instructor: instructor._id,
      Category: categoryDoc._id,
      tags: parsedTags,
      instructions:
        typeof instructions === "string"
          ? JSON.parse(instructions)
          : instructions,
      whatYouWillLearn,
      thumbnail: thumbnailimage.secure_url,
    });

    /////add course id in category

    await Category.findByIdAndUpdate(category,{
      $push:{
        courses:courseDoc._id
      }
    },{new:true});

    return res
      .status(201)
      .json({ success: true, message: "Course created", course: courseDoc });
  } catch (err) {
    console.error("FULL ERROR:", err); // check your server terminal
    return res.status(500).json({
      success: false,
      message: "Error creating course",
      error: err.message, // send just the message, not the whole object
    });
  }
};
exports.getallcourses= async(req,res)=>{
    const details= await Course.find({}).populate("instructor").populate("category").populate("ratingandreview");
    return res.status(200).json({
        success:true,
        details
    })
}

exports.getcoursedetails=async(req,res)=>{
    try{
        const{courseId}=req.body;
        const details= await Course.findById(courseId).populate({
            path:"instructor",
            populate:{
                path:"additionaldetails"
            }
        }).populate("Category").populate({
            path:"coursecontent",
            populate:{
                path:"subsections"
            }
        }).exec();
        if(!details){
            return res.status(404).json({
                success:false,
                message:"course not found"
            })
        }

        return res.status(200).json({
            success:true,
            details,
            message:"course details fetched successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"error in fetching course details",
            error:error.message
        })

    }
}

exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ error: "Course ID is required" });
    }

    // Find the course
    const updatedcourse = await Course.findById(courseId);
    if (!updatedcourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Update only given fields
    for (const key in req.body) {
      if (req.body[key] !== undefined && key !== "courseId") {
        updatedcourse[key] = req.body[key];
      }
    }

    await updatedcourse.save();

    res.status(200).json({ message: "Course updated successfully", Course: updatedcourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while updating course" });
  }
};



// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      courses: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};

exports.deleteinstructorcourse=async(req,res)=>{

  try{
const {courseId}=req.body;
console.log("BODY:", req.body);

const result= await Course.findByIdAndDelete(courseId,{new:true});
 res.status(200).json({
      success: true,
      message:"course deleted"
    });
  }catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete instructor courses",
      error: error.message,
    });
  }
}