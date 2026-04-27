import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Videosidebar = ({ setreviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewcourse);

  useEffect(() => {
    if (!courseSectionData.length) return;

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subsections.findIndex((data) => data._id === subSectionId);

    setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
    const activeSubSectionId =
      courseSectionData[currentSectionIndex]?.subsections?.[
        currentSubSectionIndex
      ]?._id;
    setVideoBarActive(activeSubSectionId);
  }, [
    courseSectionData,
    courseEntireData,
    location.pathname,
    completedLectures,
    sectionId,
    subSectionId,
  ]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white w-[300px] border-r border-gray-700">
      {/* Course Title + Progress */}
      <div className="p-4 border-b border-gray-700">
        <p className="text-sm font-semibold text-white line-clamp-2 mb-2">
          {courseEntireData.courseName}
        </p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 rounded-full transition-all duration-300"
              style={{
                width: totalNoOfLectures
                  ? `${Math.round((completedLectures.length / totalNoOfLectures) * 100)}%`
                  : "0%",
              }}
            />
          </div>
          <p className="text-xs text-gray-400 whitespace-nowrap">
            {completedLectures.length} / {totalNoOfLectures}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2 p-3 border-b border-gray-700">
        <button
          onClick={() => navigate("/dashboard/enrolled-courses")}
          className="flex-1 py-1.5 text-xs rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 transition"
        >
          ← Back
        </button>
        <button
          onClick={() => setreviewModal(true)}
          className="flex-1 py-1.5 text-xs rounded-md bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold transition"
        >
          Add Review
        </button>
      </div>

      {/* Section List */}
      <div className="flex-1 overflow-y-auto">
        {courseSectionData.map((section) => (
          <div key={section._id}>
            {/* Section Header */}
            <div
              onClick={() => setActiveStatus(section._id)}
              className="flex items-center justify-between px-4 py-3 cursor-pointer bg-gray-800 hover:bg-gray-750 border-b border-gray-700"
            >
              <p className="text-sm font-medium text-white">
                {section.sectionName}
              </p>
              <span className="text-gray-400 text-xs">
                {activeStatus === section._id ? "▲" : "▼"}
              </span>
            </div>

            {/* Subsections */}
            {activeStatus === section._id &&
              section.subsections.map((subsection) => {
                const isActive = videoBarActive === subsection._id;
                const isCompleted = completedLectures.includes(subsection._id);

                return (
                  <div
                    key={subsection._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(
                        `/view-course/courseId/${courseEntireData._id}/sectionId/${section._id}/subSectionId/${subsection._id}`,
                      );
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer border-b border-gray-700 transition
                      ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0
                        ${
                          isCompleted
                            ? "bg-yellow-400 border-yellow-400"
                            : "border-gray-500"
                        }`}
                    >
                      {isCompleted && (
                        <svg
                          className="w-2.5 h-2.5 text-gray-900"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>

                    <p
                      className={`text-xs line-clamp-2 ${isActive ? "text-yellow-400" : "text-gray-300"}`}
                    >
                      {subsection.title}
                    </p>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videosidebar;
