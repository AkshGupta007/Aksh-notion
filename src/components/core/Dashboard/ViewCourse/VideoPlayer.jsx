import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../../Services/CourseApi";
import { updateCompletedLectures } from "../../../../slices/Viewcourse";

const VideoPlayer = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { courseSectionData, completedLectures } = useSelector(
    (state) => state.viewcourse,
  );

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const { courseId, sectionId, subSectionId } = useParams();
  const videoRef = useRef(null);

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) return;
      if (!courseId || !sectionId || !subSectionId) {
        navigate("/dashboard/enrolled-courses");
        return;
      }
      const section = courseSectionData?.find((sec) => sec._id === sectionId);
      if (!section) return;

      const subSection = section.subsections?.find(
        (sub) => sub._id === subSectionId,
      );
      if (subSection) {
        setVideoData(subSection);
        setVideoEnded(false);
      }
    };
    setVideoSpecificDetails();
  }, [courseSectionData, courseId, sectionId, subSectionId, location.pathname, navigate]);

  const isFirstVideo = () => {
    const si = courseSectionData?.findIndex((d) => d._id === sectionId);
    const ssi = courseSectionData[si]?.subsections.findIndex(
      (d) => d._id === subSectionId,
    );
    return si === 0 && ssi === 0;
  };

  const isLastVideo = () => {
    const si = courseSectionData?.findIndex((d) => d._id === sectionId);
    const total = courseSectionData?.[si]?.subsections.length;
    const ssi = courseSectionData?.[si]?.subsections.findIndex(
      (d) => d._id === subSectionId,
    );
    return si === courseSectionData.length - 1 && ssi === total - 1;
  };

  const goToNextVideo = () => {
    const si = courseSectionData?.findIndex((d) => d._id === sectionId);
    const total = courseSectionData?.[si]?.subsections.length;
    const ssi = courseSectionData?.[si]?.subsections.findIndex(
      (d) => d._id === subSectionId,
    );
    if (ssi !== total - 1) {
      navigate(
        `/view-course/courseId/${courseId}/sectionId/${sectionId}/subSectionId/${courseSectionData[si].subsections[ssi + 1]._id}`,
      );
    } else {
      const nextSec = courseSectionData[si + 1];
      navigate(
        `/view-course/courseId/${courseId}/sectionId/${nextSec._id}/subSectionId/${nextSec.subsections[0]._id}`,
      );
    }
  };

  const goToPrevVideo = () => {
    const si = courseSectionData.findIndex((d) => d._id === sectionId);
    const ssi = courseSectionData[si]?.subsections.findIndex(
      (d) => d._id === subSectionId,
    );
    if (ssi !== 0) {
      navigate(
        `/view-course/courseId/${courseId}/sectionId/${sectionId}/subSectionId/${courseSectionData[si].subsections[ssi - 1]._id}`,
      );
    } else {
      const prevSec = courseSectionData[si - 1];
      const lastSub = prevSec.subsections[prevSec.subsections.length - 1];
      navigate(
        `/view-course/courseId/${courseId}/sectionId/${prevSec._id}/subSectionId/${lastSub._id}`,
      );
    }
  };

  const markAsComplete = async () => {
    setLoading(true);
    try {
      const res = await markLectureAsComplete(courseId, subSectionId, token);
      if (res) {
        dispatch(updateCompletedLectures(String(subSectionId)));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-950 text-white">
      {videoData ? (
        <>
          {/* Video */}
          <div className="relative w-full bg-black">
            <video
              key={videoData._id}
              src={videoData.video}
              muted={isMuted}
              controls
              autoPlay
              ref={videoRef}
              onEnded={() => setVideoEnded(true)}
              className="w-full aspect-video object-contain"
            />

            {/* Mute toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white text-xs px-3 py-1.5 rounded-full transition"
            >
              {isMuted ? "🔇 Unmute" : "🔊 Mute"}
            </button>
          </div>

          {/* Video Info */}
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold">{videoData.title}</h2>
            <p className="text-sm text-gray-400 mt-1">
              {videoData.description}
            </p>
          </div>

          {/* End-of-video controls */}
          {videoEnded && (
            <div className=" absolute flex flex-wrap items-center gap-3 px-6 py-4 bg-gray-900 border-t border-gray-700">
              {/* Rewatch */}
              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current.play();
                  }
                  setVideoEnded(false);
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold transition"
              >
                ↩ Rewatch
              </button>

              {/* Prev */}
              {!isFirstVideo() && (
                <button
                  onClick={goToPrevVideo}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold transition"
                >
                  ← Prev
                </button>
              )}

              {/* Next */}
              {!isLastVideo() && (
                <button
                  onClick={goToNextVideo}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold transition"
                >
                  Next →
                </button>
              )}

              {/* Mark as complete */}
              {!completedLectures.includes(subSectionId) && (
                <button
                  disabled={loading}
                  onClick={markAsComplete}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                >
                  {loading ? "Saving..." : "✓ Mark as Complete"}
                </button>
              )}

              {/* Already completed badge */}
              {completedLectures.includes(subSectionId) && (
                <span className="ml-auto flex items-center gap-1.5 text-sm text-green-400 font-medium">
                  ✓ Completed
                </span>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>No video available</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
