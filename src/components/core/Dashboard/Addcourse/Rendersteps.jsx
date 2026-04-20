import clsx from 'clsx';
import React from 'react'
import { FaCheck } from "react-icons/fa";
import Allcourseinformation from './Allcourseinformation/Allcourseinfromation';
import Coursebuilder from './CourseBuilder/Coursebuilder';
import { useSelector } from 'react-redux';
import Publishcourse from './Publishcourse/Publishcourse';
const Rendersteps = () => {

    const { step} = useSelector((state) => state.course);

    const steps=[
        {
            id:1,
            name: "Course information"
        } , {
            id:2,
            name:" Course Builder"
        },
         {
            id:3,
            name:"Publish"
        }
    ]
  return (
    <div className="flex flex-col mt-6 text-white">
      {/* STEP INDICATOR */}
      <div className="flex items-center justify-between w-full">
        {steps.map((item, index) => (
          <div key={item.id} className="flex items-center w-full">
            {/* STEP CIRCLE */}
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  "flex items-center justify-center w-8 h-8 rounded-full font-medium",
                  step > item.id
                    ? "bg-yellow-500 text-black"
                    : step === item.id
                      ? "bg-yellow-500 text-black"
                      : "bg-zinc-500 text-white",
                )}
              >
                {step > item.id ? <FaCheck /> : item.id}
              </div>

              {/* LABEL */}
              <p className="text-xs mt-2 text-center w-24">{item.name}</p>
            </div>

            {/* LINE (only if not last step) */}
            {index !== steps.length - 1 && (
              <div
                className={clsx(
                  "flex-1 border-2 border-dashed mx-2",
                  step > item.id ? "border-yellow-500" : "border-zinc-600",
                )}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* STEP CONTENT */}
      <div className="mt-10">
        {step === 1 && <Allcourseinformation />}
        {step === 2 && <Coursebuilder />}
        {step === 3 && <Publishcourse />}
      </div>
    </div>
  );
}

export default Rendersteps
