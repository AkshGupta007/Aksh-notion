import React from 'react'
import CTBUTTON from './CTBUTTON'
import { TypeAnimation } from 'react-type-animation';
const Codeblock = ({positions, heading, subheading, ct1, ct2, code, codecolor, backgroundgradient}) => {
  return (
    <div className={"flex " + positions + " my-20 justify-between gap-10"}>
      <div className="w-[50%] flex flex-col gap-8">
        {heading}

        <div className="text-red-300 font-bold">{subheading}</div>

        <div className="flex gap-4 mt-7">
          <CTBUTTON active={ct1.active} linkto={ct1.linkto}>
            {ct1.text}
          </CTBUTTON>
          <CTBUTTON active={ct2.active} linkto={ct2.linkto}>
            {ct2.text}
          </CTBUTTON>
        </div>
      </div>
      <div className="flex flex-row w-fit gap-4">
        <div className=" flex w-[10%] text-center flex-col text-zinc-600 font-sans font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
        </div>

        <div className=" w-[90%] flex flex-col gap-2 font-bold font-mono text-yellow-500">
          <TypeAnimation
            sequence={[code, 5000, ""]}
            repeat={Infinity}
            cursor={true}
            
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}

            omitDeletionAnimation={true }
          />
        </div>
      </div>
    </div>
  );
}

export default Codeblock
