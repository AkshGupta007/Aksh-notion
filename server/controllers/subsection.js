const subsection = require("../models/subsection");
const Section = require("../models/section");
const Course = require("../models/courses");
const courseprogress = require("../models/courseprogress");
const { uploadimagetocloudinary } = require("../utils/imageuploader");

exports.createsubsection= async(req,res)=>{
    try{
        // fetch data
        const{sectionid,title,description,duration}=req.body;
        const video=req.files.video;

        // validation
        if(!sectionid || !title || !description || !duration || !video) {
            return res.status(400).json({
                success:false,
                message:"invalid data"
            })
        }
        // upload video to cloudinary
         const videoupload= await uploadimagetocloudinary(video,process.env.CLOUDINARY_FOLDER_NAME);

        // create subsection
        const subsectiondetails= await subsection.create({
            title,
            description,
            timeduration:duration,
            video:videoupload.secure_url
        });

        const sectionupdate = await Section.findByIdAndUpdate(sectionid, {
            $push :{
                subsections:subsectiondetails._id
            }
        },{ new : true});

        return res.status(200).json({
            success:true,
            message:"subsection created and added to section successfully",
            data:subsectiondetails
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"error in creating subsection",
            error:error.message
        })
    }
}

exports.deletesubsection = async (req, res) => {
  try {
    const { sectionId, subSectionId } = req.body;

    // Find the section and pull out the subsection
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $pull: { subSections: subSectionId } }, // remove subsection reference
      { new: true },
    ).populate("subSections");

    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // Optionally delete the actual SubSection document
    await SubSection.findByIdAndDelete(subSectionId);

    return res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
      data: updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting subsection",
      error: error.message,
    });
  }
};



/// hw : update and delete sub-section