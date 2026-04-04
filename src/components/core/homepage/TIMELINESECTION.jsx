import React from 'react';
import logo from '../../../assests/407659.jpg'
import img from '../../../assests/135625.jpg'


const TIMELINESECTION = () => {
    const data = [
      { logo: logo, Title: " LEADERSHIP ", Description: " FULLY COMMITED FOR SUCCCESS" },
      { logo: logo, Title: " RESPONSIBLITY ", Description: " FULLY COMMITED FOR SUCCCESS" },
      { logo: logo, Title: " FLEXIBLITY", Description: " FULLY COMMITED FOR SUCCCESS" },
      { logo: logo, Title: " SOLVE THE PROBLEM ", Description: " FULLY COMMITED FOR SUCCCESS" },
    ];
  return (
    <div>
      <div className="flex flex-row items-center">
        <div className="w-[45%] flex flex-col gap-5">
          {data.map((item, index) => {
            return (
              <div key={index}>
                <div className="flex flex-row gap-6">
                  <div className="w-[50px] h-[50px] flex items-center bg-white">
                    <img src={item.logo} alt={item.Title} />
                  </div>

                  <div className="flex flex-col">
                    <h3 className="font-semibold text-16px ">{item.Title}</h3>
                    <p className="text-sm">{item.Description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative w-[40%] shadow-blue-200 py-2 " >
          <img src={img} className="object-cover shadow-white h-fit"></img>
          <div className=" absolute flex bg-green-950 flex-row text-white uppercase py-10 left-[15%] translate-y-[-30%]">
            <div className="flex flex-row gap-2 items-center  border-r border-green-700">
              <p className="text-3xl font-bold"> 10</p>
              <p className="text-green-300 text-sm"> YEARS OF EXPERIENCE </p>
            </div>
            <div className="flex flex-row gap-2 mx-3 items-center">
              <p className="text-3xl font-bold"> 250</p>
              <p className="text-green-300 text-sm"> TYPES OF COURSES</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TIMELINESECTION
