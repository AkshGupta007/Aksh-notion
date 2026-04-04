import React from 'react'
import logo1 from "../../../assests/9672621-naruto-desktop-wallpaper-4k.png"
import Highlighttext from './Highlighttext';
import CTBUTTON from './CTBUTTON';
const Instructorsection = () => {
  return (
    <div className='mt-16'>
      <div className="flex flex-row gap-20  justify-between items-center">
        <div className="w-[50%] ">
          <img src={logo1} />
        </div>
        <div className="flex flex-col w-[50%] gap-10">
          <div className='text-4xl font-semibold w-[50%] '>
            <p className='inline-block'>Become An</p>
            <Highlighttext text={"instructor"} />
          </div>

          <p className='text-16px w-[80%] font-medium text-zinc-300 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, voluptatem voluptas odit optio adipisci, nesciunt nemo perspiciatis debitis tenetur, molestias est modi doloribus voluptate quo vel dolore eaque? Praesentium, accusamus!</p>
         
         
          <div className='w-fit'>

            <CTBUTTON active={true}>
                Start teaching today

            </CTBUTTON>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Instructorsection
