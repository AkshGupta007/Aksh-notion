import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { buyCourse } from "../Services/StudentFeaturesApi";
import { fetchcoursedetails } from "../Services/CourseApi";
import getAvgRating from "../Utils/Avgrating";
import RatingStars from "../Utils/GetRatingstar";
import CourseCard from "../components/core/Dashboard/Course details/CourseCard";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { FiChevronRight } from "react-icons/fi";
import { HiOutlineAcademicCap } from "react-icons/hi";
import CourseReviews from "../components/core/Dashboard/Course details/CourseReviews";
const CoursePage = () => {
  const { courseId } = useParams();
  const [coursedata, setcoursedata] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchcoursedetails(courseId, token);
      if (res) setcoursedata(res.details);
    };
    fetch();
  }, []);

  const handlebuy = () => {
    if (token) buyCourse([courseId], token, user, navigate, dispatch);
  };

  if (!coursedata) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  const {
    courseName,
    courseDescription,
    price,
    thumbnail,
    Category,
    instructions,
    instructor,
    ratingandreview,
    studentsenrolled,
    whatYouWillLearn,
  } = coursedata;

  const rating = getAvgRating(ratingandreview);

  return (
    <div className="min-h-screen bg-gray-950 text-white mb-20">
      {/* ── Hero Banner ── */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-950 border-b border-white/10">
        {/* Faint bg thumbnail blur */}
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center blur-2xl scale-110"
          style={{ backgroundImage: `url(${thumbnail})` }}
        />

        <div className="relative max-w-7xl mx-auto px-4 md:px-10 py-12 lg:pr-[26rem]">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-white/40 mb-6">
            <span
              onClick={() => navigate("/")}
              className="hover:text-yellow-400 cursor-pointer transition-colors"
            >
              Home
            </span>
            <FiChevronRight />
            <span>Learning</span>
            <FiChevronRight />
            <span className="text-yellow-400">{Category?.name}</span>
          </div>

          {/* Course Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 max-w-2xl">
            {courseName}
          </h1>

          {/* Description */}
          <p className="text-white/60 text-base leading-relaxed mb-6 max-w-2xl">
            {courseDescription}
          </p>

          {/* Rating Row */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-yellow-400 font-bold text-lg">{rating}</span>
            <RatingStars reviewCount={rating} />
            <span className="text-white/40 text-sm">
              ({ratingandreview?.length ?? 0} ratings)
            </span>
            <span className="text-white/40 text-sm">·</span>
            <span className="text-white/40 text-sm">
              {studentsenrolled?.length ?? 0} students enrolled
            </span>
          </div>

          {/* Instructor */}
          <div className="flex items-center gap-2">
            <HiOutlineAcademicCap className="text-yellow-400" />
            <span className="text-sm text-white/50">Created by</span>
            <span className="text-sm text-yellow-400 font-medium">
              {instructor?.firstname} {instructor?.lastname}
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 relative">
        <div className="lg:pr-[26rem]">
          {/* What You'll Learn */}
          <section className="mb-10 border border-white/10 rounded-2xl p-6 md:p-8 bg-white/[0.02]">
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-yellow-400 rounded-full inline-block" />
              What You'll Learn
            </h2>
            <p className="text-white/65 leading-relaxed text-sm md:text-base">
              {whatYouWillLearn}
            </p>
          </section>

          {/* Requirements / Instructions */}
          {instructions?.length > 0 && (
            <section className="mb-10 border border-white/10 rounded-2xl p-6 md:p-8 bg-white/[0.02]">
              <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-yellow-400 rounded-full inline-block" />
                Requirements
              </h2>
              <ul className="flex flex-col gap-2.5">
                {instructions.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-white/60"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* ── Sticky Course Card ── */}
        <div className="lg:absolute lg:top-10 lg:right-10 lg:w-96 w-full mt-8 lg:mt-0">
          <CourseCard
            handlebuy={handlebuy}
            coursedata={coursedata}
            courseId={courseId}
            setConfirmationModal={setConfirmationModal}
          />
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modaldata={confirmationModal} />}

      <CourseReviews courseId={courseId}/>
    </div>
  );
};

export default CoursePage;
