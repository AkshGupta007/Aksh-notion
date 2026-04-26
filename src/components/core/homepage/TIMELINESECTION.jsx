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
      <div className="flex flex-col lg:flex-row items-center ">
        {/* LEFT SECTION */}
        <div className="lg:w-1/2 flex flex-col gap-8">
          {data.map((item, index) => (
            <div key={index} className="flex items-start gap-5">
              {/* Icon */}
              <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300">
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
        <div className="lg:w-1/2 relative">
          {/* Image */}
          <img
            src={target}
            alt="timeline"
            className="w-full rounded-xl shadow-lg object-center h-80"
          />

          {/* Stats Card */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#022c22] text-white rounded-lg px-6 py-4 flex gap-6 shadow-xl">
            {/* Experience */}
            <div className="flex items-center gap-2 border-r border-green-700 pr-4">
              <p className="text-2xl font-bold">10+</p>
              <p className="text-green-300 text-xs">Years of Experience</p>
            </div>

            {/* Courses */}
            <div className="flex items-center gap-2">
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
