import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { fetchallreviews } from "../../../Services/profileApi";
import  RatingStars from "../../../Utils/GetRatingstar";

const ReviewSlider = ({ courseId }) => {
  const [course, setcourse] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchallreviews();
      if (res) {
        setcourse(res);
      }
    };
    fetch();
  }, [courseId]);

  return (
    <div className="w-full px-4 py-2 mb- ">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {course?.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="h-full bg-white rounded-xl border border-gray-200 shadow-sm p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between ">
              {/* Top Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-gray-800">
                    {review.user.firstname} {review.user.lastname}
                  </h3>
                  <span className="text-yellow-500 text-sm font-semibold">
                    <RatingStars reviewCount={review.rating} />
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                  {review.review}
                </p>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center gap-3 mt-5 pt-4 border-t">
                <img
                  src={review.course.thumbnail}
                  alt={review.course.courseName}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {review.course.courseName}
                  </p>
                  <p className="text-xs text-gray-500">
                    ₹{review.course.price}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
