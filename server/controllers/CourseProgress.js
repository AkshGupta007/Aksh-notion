const CourseProgress = require("../models/courseprogress");

exports.markLectureAsComplete = async (req, res) => {
  try {
    const { courseId, subsectionId } = req.body;
    const userId = req.user.id;

    if (!courseId || !subsectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing courseId or subsectionId",
      });
    }

    // find existing progress
    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    });

    console.log("Existing course progress:", courseProgress);

    if (!courseProgress) {
      // create new progress
      courseProgress = await CourseProgress.create({
        courseId,
        userId,
        completedsubsections: [subsectionId],
      });
    } else {
      // avoid duplicate
      if (!courseProgress.completedsubsections.includes(subsectionId)) {
        courseProgress.completedsubsections.push(subsectionId);
        await courseProgress.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: "Lecture marked as completed",
      data: courseProgress,
    });

  } catch (error) {
    console.error("MARK LECTURE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while marking lecture",
    });
  }
};


exports.getCourseProgress = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        const courseProgress = await CourseProgress.findOne({
            courseId,
            userId,
        });

        if (!courseProgress) {
            return res.status(404).json({
                success: false,
                message: "Course progress not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course progress retrieved successfully",
            data: courseProgress,
        });
    } catch (error) {
        console.error("GET COURSE PROGRESS ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while retrieving course progress",
        });
    }
};
