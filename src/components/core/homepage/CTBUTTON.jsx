import React from "react";
import { Link } from "react-router";

const CTBUTTON = ({ children, linkto, active }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[13px] rounded-md px-6 py-3 font-semibold ${active ? "bg-yellow-400 text-black" : "bg-gray-300 text-gray-800"}`}
      >
        {children}
      </div>
    </Link>
  );
};

export default CTBUTTON;
