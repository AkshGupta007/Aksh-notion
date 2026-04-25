const subsection = require("../models/subsection");
const Section = require("../models/section");
const Course = require("../models/courses");
const courseprogress = require("../models/courseprogress");
const { uploadimagetocloudinary } = require("../utils/imageuploader");

// exports.createsubsection= async(req,res)=>{
//     try{
//         // fetch data
//         const{sectionid,title,description,duration,courseID}=req.body;
//         const video=req.files?.video;

//         // validation
//         if(!sectionid || !title || !description || !duration || !video) {
//             return res.status(400).json({
//                 success:false,
//                 message:"invalid data"
//             })
//         }
//         // upload video to cloudinary
//          const videoupload= await uploadimagetocloudinary(video,process.env.CLOUDINARY_FOLDER_NAME);

//         // create subsection
//         const subsectiondetails= await subsection.create({
//             title,
//             description,
//             timeduration:duration,
//             video:videoupload.secure_url
//         });

//         const sectionupdate = await Section.findByIdAndUpdate(sectionid, {
//             $push :{
//                 subsections:subsectiondetails._id
//             }
//         },{ new : true});

//         return res.status(200).json({
//             success:true,
//             message:"subsection created and added to section successfully",
//             subsection: sectionupdate
//         });

//     }
//     catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"error in creating subsection",
//             error:error.message
//         })
//     }
// }

// exports.deletesubsection = async (req, res) => {
//   try {
//     const { sectionId, subsectionID,courseID } = req.body;

//     // Find the section and pull out the subsection
//     const updatedSection = await Section.findByIdAndUpdate(
//       sectionId,
//       { $pull: { subSections: subsectionID } }, // remove subsection reference
//       { new: true },
//     ).populate("subsections");

//     if (!updatedSection) {
//       return res.status(404).json({
//         success: false,
//         message: "Section not found",
//       });
//     }

//     // Optionally delete the actual SubSection document
//     await subsection.findByIdAndDelete(subsectionID);

//        const updatedcourse = await Course.findById(courseID).populate({
//           path: "coursecontent",
//           populate: {
//             path: "subsections",
//           },
//         });

//     return res.status(200).json({
//       success: true,
//       message: "Subsection deleted successfully",
//       course: updatedcourse,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error deleting subsection",
//       error: error.message,
//     });
//   }
// };

// /// hw : update

// exports.updatesubsection = async (req, res) => {
//   try {
//     const { subSectionId, title, timeDuration, description } = req.body;

//     // validation
//     if (!subSectionId) {
//       return res.status(400).json({
//         success: false,
//         message: "SubSection ID is required",
//       });
//     }

//     // find and update
//     const updatedSubSection = await subsection.findByIdAndUpdate(
//       subSectionId,
//       {
//         title,
//         timeDuration,
//         description,
//       },
//       { new: true },
//     );

//     if (!updatedSubSection) {
//       return res.status(404).json({
//         success: false,
//         message: "SubSection not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "SubSection updated successfully",
//       subsection: updatedSubSection,
//     });
//   } catch (error) {
//     console.error("Error updating subsection:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error updating subsection",
//     });
//   }
// };


// ✅ Fix: return updated course instead of just the section
exports.createsubsection = async (req, res) => {
  try {
    const { sectionId, title, description,  courseID } = req.body;
    const video = req.files?.video;

    if (
      !sectionId ||
      !title ||
      !description ||
      !video ||
      !courseID
    ) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    const videoupload = await uploadimagetocloudinary(
      video,
      process.env.CLOUDINARY_FOLDER_NAME,
    );

    console.log("video to cloudinary",videoupload);

    const subsectiondetails = await subsection.create({
      title,
      description,
      video: videoupload.secure_url,
      timeduration: Math.round(videoupload.duration) || 0, // ✅ Cloudinary gives duration in seconds

    });

    await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subsections: subsectiondetails._id } },
      { new: true },
    );

    // ✅ Fix: return full populated course (frontend dispatches setCourse)
    const updatedCourse = await Course.findById(courseID).populate({
      path: "coursecontent",
      populate: { path: "subsections" },
    });

    return res.status(200).json({
      success: true,
      message: "Subsection created successfully",
      course: updatedCourse, // ✅ was returning "subsection: sectionupdate"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating  subsection",
      error: error.message,
    });
  }
};

exports.deletesubsection = async (req, res) => {

  console.log("req.body =>", req.body); 
  try {
    const { sectionID, subsectionID, courseID } = req.body;
 


    const section = await Section.findById(sectionID);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }
    // ✅ Fix: field name was "subSections" (capital S) — model uses "subsections"
    await Section.findByIdAndUpdate(
      sectionID,
      { $pull: { subsections: subsectionID } },
      { new: true },
    );

    await subsection.findByIdAndDelete(subsectionID);

    const updatedCourse = await Course.findById(courseID).populate({
      path: "coursecontent",
      populate: { path: "subsections" },
    });

    return res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
      course: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting subsection",
      error: error.message,
    });
  }
};

// ✅ Fix: return updated course instead of just subsection
exports.updatesubsection = async (req, res) => {
  try {
    // ✅ Fix: read "subSectionId" to match what frontend appends in FormData
    const { subSectionId, title, timeduration, description, courseID } =
      req.body;

    if (!subSectionId || !courseID) {
      return res.status(400).json({
        success: false,
        message: "SubSection ID and Course ID are required",
      });
    }

    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (timeduration) updateFields.timeduration = timeduration;

    if (req.files?.video) {
      const videoupload = await uploadimagetocloudinary(
        req.files.video,
        process.env.CLOUDINARY_FOLDER_NAME,
      );
      updateFields.video = videoupload.secure_url;
    }

    const updatedSubSection = await subsection.findByIdAndUpdate(
      subSectionId,
      updateFields,
      { new: true },
    );

    if (!updatedSubSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" });
    }

    // ✅ Fix: return full course so frontend can dispatch setCourse
    const updatedCourse = await Course.findById(courseID).populate({
      path: "coursecontent",
      populate: { path: "subsections" },
    });

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      course: updatedCourse, // ✅ was returning only subsection
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating subsection",
      error: error.message,
    });
  }
};