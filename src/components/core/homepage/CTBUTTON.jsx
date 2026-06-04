import React from "react";
import { Link } from "react-router";

const CTBUTTON = ({ children, linkto, active }) => {
  return (
    <Link to={linkto} className="w-full sm:w-auto">
      <div
        className={`w-full rounded-md px-6 py-3 text-center text-[13px] font-semibold transition sm:w-auto ${active ? "bg-yellow-400 text-black" : "bg-gray-300 text-gray-800"}`}
      >
        {children}
      </div>
    </Link>
  );
};

export default CTBUTTON;
