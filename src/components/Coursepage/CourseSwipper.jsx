import React from 'react'
import CourseCard from './Coursecard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CourseSwipper = ({course}) => {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
      >
        {course?.map((course, index) => {
          return (
            <SwiperSlide key={index}>
              <CourseCard course={course} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default CourseSwipper
