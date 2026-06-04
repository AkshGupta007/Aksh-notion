import React from 'react'

import im from "./../../../assests/images.jpeg"
import Highlighttext from './Highlighttext';
import CTBUTTON from './CTBUTTON';
const Instructorsection = () => {
  return (
    <div className="mt-16 w-full">
      <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-20">
        <div className="w-full lg:w-1/2">
          <img src={im} alt={"instructor"} className='h-72 w-full rounded-xl object-cover sm:h-96' />
        </div>
        <div className="flex w-full flex-col gap-6 lg:w-[50%] lg:gap-10">
          <div className="w-full text-3xl font-semibold leading-tight sm:text-4xl lg:w-[70%]">
            <p className="inline-block">Become An</p>
            <Highlighttext text={"instructor"} />
          </div>

          <p className="w-full text-base font-medium text-zinc-300 lg:w-[80%]">
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
