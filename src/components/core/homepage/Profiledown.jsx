import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { logout } from "../../../Services/authApi";
import { useOnClickOutside } from "usehooks-ts";
import { CiLogin } from "react-icons/ci";

const Profiledown = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const dispatch = useDispatch();

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div className="relative">
      {/* Trigger */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center cursor-pointer"
      >
        <img
          className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover bg-white"
          src={user?.image}
          alt={user?.firstname || "User Avatar"}
        />
        <MdOutlineArrowDropDown className="text-white text-3xl" />
      </div>

      {/* Dropdown */}
      {open && (
        <div
          ref={ref}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] rounded-md border border-yellow-600 bg-richblack-800"
        >
          <Link
            to="/dashboard/my-profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-richblack-100 bg-slate-500  hover:bg-white hover:text-black"
          >
            
            Dashboard
          </Link>

          <button
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="w-full flex justify-center items-center gap-1 px-4 py-2 text-sm text-black bg-slate-500  hover:bg-white hover:text-black"
          >
           <span className="text-black"> <CiLogin/> </span> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Profiledown;
