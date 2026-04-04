const section = require("../models/section");
const course = require("../models/courses");

exports.createsection = async (req, res) => {
  try {
    // data fetch
    const { sectionname, courseid } = req.body;

    // validatiom
    if (!sectionname || !courseid) {
      return res.status(400).json({
        success: false,
        msg: "invalid data",
      });
    }

    // section creation
    const sectiondetails = await section.create({ sectionname });
    // update course by pushing section id in course model
    const courseupdate = await course
      .findByIdAndUpdate(
        courseid,
        { $push: { coursecontent: sectiondetails._id } },
        { new: true },
      )
  

    // return response

    return res.status(200).json({
      success: true,
      message: "section created and added to course successfully",
      data: courseupdate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in creating section",
      error: error.message
    });
  }
};

exports.updatesection = async (req, res) => {
  try {
    const { sectionid, sectionname } = req.body;

    if (!sectionid || !sectionname) {
      return res.status(400).json({
        success: false,
        message: "invalid data",
      });
    }
    const updatesection = await section.findByIdAndUpdate(
      sectionid,
      { sectionname },
      { new: true },
    );
    return res.status(200).json({
      success: true,
      message: "section updated successfully",
      data: updatesection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in updating section",
    });
  }
};

exports.deletesection = async (req, res) => {
  try {
    const { sectionid } = req.params;
    const deletesection = await section.findByIdAndDelete(sectionid);

    await course.updateOne(
      { section: sectionid },
      {
        $pull: {
          section: sectionid,
        },
      },
    );

    return res.status(200).json({
      success: true,
      message: "section deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in deleting section",
    });
  }
};
