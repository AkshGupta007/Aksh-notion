import React from 'react'

import im from "./../../../assests/images.jpeg"
import Highlighttext from './Highlighttext';
import CTBUTTON from './CTBUTTON';
const Instructorsection = () => {
  return (
    <div className="mt-16">
      <div className="flex flex-row gap-20  justify-between items-center">
        <div className="">
          <img src={im} alt={"instructor"} className='w-11/12 h-96' />
        </div>
        <div className="flex flex-col w-[50%] gap-10">
          <div className="text-4xl font-semibold w-[50%] ">
            <p className="inline-block">Become An</p>
            <Highlighttext text={"instructor"} />
          </div>

          <p className="text-base w-[80%] font-medium text-zinc-300">
            Your journey to better skills starts here. Learn, practice, and
            succeed here.
          </p>

          <div className="w-fit">
            <CTBUTTON active={true} linkto={"/signup"}>Start teaching today</CTBUTTON>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Instructorsection
