const Section = require("../models/section");
const Course = require("../models/courses");
const subsection = require("../models/subsection");

exports.createsection = async (req, res) => {
  try {
    // data fetch
    const { sectionName, courseId } = req.body;

    // validatiom
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        msg: "invalid data",
      });
    }
    // find if exit 

    // section creation
    const sectiondetails = await Section.create({ sectionName});
    // update course by pushing section id in course model
    const courseupdate = await Course
      .findByIdAndUpdate(
        courseId,
        { $push: { coursecontent: sectiondetails._id } },
        { new: true },
      ).populate("coursecontent")
  

    // return response

    return res.status(200).json({
      success: true,
      message: "section created and added to course successfully",
      course: courseupdate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in create of section",
      error: error
    });
  }
};

exports.updatesection = async (req, res) => {
  try {
    const { sectionId, sectionName,courseId } = req.body;

    if (!sectionId || !sectionName) {
      return res.status(400).json({
        success: false,
        message: "invalid data",
      });
    }
     await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true },
    );

    const updatedcourse = await Course.findById(courseId).populate({
      path: "coursecontent",
      populate: {
        path: "subsections",
      },
    });
    return res.status(200).json({
      success: true,
      message: "section updated successfully",
      course : updatedcourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in updating section",
    });
  }
};

// exports.deletesection = async (req, res) => {
//   try {
//     const { sectionid } =req.body;
//     await Section.findByIdAndDelete(sectionid);

//      await course.updateOne(
//       { coursecontent: sectionid },
//       {
//         $pull: {
//           coursecontent: sectionid,
//         },
//       },
//     );

//     return res.status(200).json({
//       success: true,
//       message: "section deleted successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "error in deleting section",
//       error:error
//     });
//   }
// };


exports.deletesection = async (req, res) => {
  try {
    const { sectionId } = req.body;

    if (!sectionId) {
      return res.status(400).json({
        success: false,
        message: "Section ID is required",
      });
    }

    // 1. Find section (to get subsections)
    const section = await Section.findById(sectionId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // 2. Delete all subsections inside this section (if any)
    // await subsection.deleteMany({
    //   _id: { $in: section.subsections },
    // });

    // 3. Delete section
    await Section.findByIdAndDelete(sectionId);

    // 4. Remove section from course
const updatedcourse = await Course.findOneAndUpdate(
  { coursecontent: sectionId },
  {
    $pull: {
      coursecontent: sectionId,
    },
  },
  { new: true },
).populate({
  path: "coursecontent",
  populate: {
    path: "subsections",
  },
});

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      course:updatedcourse
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in deleting section",
      error: error.message,
    });
  }
};