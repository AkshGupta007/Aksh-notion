import clsx from 'clsx';
import React from 'react'
import { FaCheck } from "react-icons/fa";
import Allcourseinformation from './Allcourseinformation/Allcourseinfromation';
import { useSelector } from 'react-redux';
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
    <div className="flex  flex-col  mt-6 ">
      <div className="flex items-center gap-x-36">
        {steps.map((item) => {
          return (
            <div key={item.id} className="flex items-center gap-x-2">
              <div key={item.id} className="flex items-center gap-x-2">
                <p
                  className={clsx(
                    "text-sm font-medium rounded",
                    step == item.id
                      ? "bg-yellow-500 text-black px-2 py-1"
                      : "bg-gray-700 text-white px-2 py-1",
                  )}
                >
                  {steps > item.id ? <FaCheck /> : <p>{item.id}</p>}
                </p>
              </div>

              {/* dashes */}
              {}
            </div>
          );
        })}
      </div>

      <div className="text-white flex text-xs gap-x-16">
        {steps.map((item) => {
          return (
            <div key={item.id}>
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>

      {step === 1 && <Allcourseinformation />}
    </div>
  );
}

export default Rendersteps
