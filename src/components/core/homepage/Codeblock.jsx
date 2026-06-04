import React from "react";
import CTBUTTON from "./CTBUTTON";
import { TypeAnimation } from "react-type-animation";

const Codeblock = ({
  positions,
  heading,
  subheading,
  ct1,
  ct2,
  code,
  codecolor,
  backgroundgradient,
}) => {
  const lines = code.split("\n");

  return (
    <div
      className={`my-10 flex flex-col justify-between gap-8 lg:gap-10 ${positions}`}
    >
      {/* LEFT CONTENT */}
      <div className="flex flex-col gap-6 lg:w-1/2">
        {heading}

        <p className="text-gray-400 leading-relaxed">{subheading}</p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <CTBUTTON active={ct1.active} linkto={ct1.linkto}>
            {ct1.text}
          </CTBUTTON>
          <CTBUTTON active={ct2.active} linkto={ct2.linkto}>
            {ct2.text}
          </CTBUTTON>
        </div>
      </div>

      {/* RIGHT CODE BLOCK */}
      <div
        className={`relative flex max-w-full gap-4 overflow-x-auto rounded-xl border border-gray-700 p-4 font-mono text-xs shadow-lg sm:p-5 sm:text-sm lg:w-1/2`}
        style={{ background: backgroundgradient }}
      >
        {/* Line Numbers */}
        <div className="text-gray-500 text-right pr-3 select-none">
          {lines.map((_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Code Content */}
        <div className={`min-w-[420px] flex-1 ${codecolor}`}>
          <TypeAnimation
            sequence={[code, 4000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Codeblock;
