import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { addtocart } from "../../../../slices/Cartslice";
import { FiShare2 } from "react-icons/fi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

const CourseCard = ({
  handlebuy,
  coursedata,
  courseId,
  setConfirmationModal,
}) => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleshare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const isEnrolled =
    user &&
    Array.isArray(coursedata?.studentsenrolled) &&
    coursedata.studentsenrolled.includes(user?._id);

  const Addtocart = () => {
    if (user?.accounttype === "instructor") {
      toast.error("Instructors can't purchase courses");
      return;
    }
    if (token) {
      dispatch(addtocart(coursedata));
      toast.success("Added to cart!");
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in",
      text2: "Please login to add to cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  return (
    <div className="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 sticky top-6">
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={coursedata?.thumbnail}
          alt={coursedata?.courseName}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">
            ₹{coursedata?.price?.toLocaleString("en-IN")}
          </span>
        </div>

        {/* CTA Buttons */}
        {user?.accounttype === "user" && (
          <div className="flex flex-col gap-3">
            <button
              onClick={() =>
                isEnrolled
                  ? navigate("/dashboard/enrolled-courses")
                  : handlebuy()
              }
              className="w-full py-3 rounded-xl font-semibold text-sm tracking-widest uppercase text-black bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/30 active:scale-[0.98]"
            >
              {isEnrolled ? "Go To Course" : "Buy Now"}
            </button>

            {!isEnrolled && (
              <button
                onClick={Addtocart}
                className="w-full py-3 rounded-xl font-semibold text-sm tracking-widest uppercase text-yellow-400 border border-yellow-400/40 bg-yellow-400/5 hover:bg-yellow-400/10 hover:border-yellow-400/70 transition-all duration-200 active:scale-[0.98]"
              >
                Add To Cart
              </button>
            )}
          </div>
        )}

        {/* Money-back */}
        <div className="flex items-center justify-center gap-2 text-white/40 text-xs">
          <IoShieldCheckmarkOutline className="text-green-400 text-base shrink-0" />
          <span>30-Day Money-Back Guarantee</span>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10" />

        {/* This course includes */}
        {coursedata?.instructions?.length > 0 && (
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-3">
              This course includes
            </p>
            <ul className="flex flex-col gap-2">
              {(coursedata?.instructions ?? []).map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 text-sm text-white/70"
                >
                  <FaCheckCircle className="text-yellow-400 mt-0.5 shrink-0 text-xs" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-white/10" />

        {/* Share */}
        <button
          onClick={handleshare}
          className="flex items-center justify-center gap-2 text-sm text-white/50 hover:text-yellow-400 transition-colors duration-200 py-1"
        >
          <FiShare2 />
          <span>Share this course</span>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
