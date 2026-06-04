import React from "react";
import target from "../../../assests/homepage 1.jpg";
import leadership from "../../../assests/leadership.jpg"

const TIMELINESECTION = () => {
  const data = [
    { logo: leadership, title: "Leadership", desc: "Fully committed to success" },
    { logo: leadership, title: "Responsibility", desc: "Take ownership of your learning" },
    { logo: leadership, title: "Flexibility", desc: "Learn anytime, anywhere" },
    { logo: leadership, title: "Problem Solving", desc: "Think and build real solutions" },
  ];

  return (
    <div className="w-full mt-16">
      <div className="flex flex-col items-center gap-10 lg:flex-row">
        {/* LEFT SECTION */}
        <div className="flex w-full flex-col gap-8 lg:w-1/2">
          {data.map((item, index) => (
          <div key={index} className="flex items-start gap-4 sm:gap-5">
              {/* Icon */}
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-gray-300">
                <img
                  src={item.logo}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SECTION */}
        <div className="relative w-full lg:w-1/2">
          {/* Image */}
          <img
            src={target}
            alt="timeline"
            className="h-64 w-full rounded-xl object-cover object-center shadow-lg sm:h-80"
          />

          {/* Stats Card */}
          <div className="absolute bottom-4 left-1/2 flex w-[92%] -translate-x-1/2 gap-3 rounded-lg bg-[#022c22] px-4 py-3 text-white shadow-xl sm:bottom-6 sm:w-auto sm:gap-6 sm:px-6 sm:py-4">
            {/* Experience */}
            <div className="flex flex-1 items-center gap-2 border-r border-green-700 pr-3 sm:flex-none sm:pr-4">
              <p className="text-2xl font-bold">10+</p>
              <p className="text-green-300 text-xs">Years of Experience</p>
            </div>

            {/* Courses */}
            <div className="flex flex-1 items-center gap-2 sm:flex-none">
              <p className="text-2xl font-bold">250+</p>
              <p className="text-green-300 text-xs">Courses Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TIMELINESECTION;
