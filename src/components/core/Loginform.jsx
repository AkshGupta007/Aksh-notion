import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
 import { login } from "../../Services/authApi"
import { Link } from "react-router";
const Loginform = () => {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const [showpassword, setshowpassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onchangehandler = (e) => {
    setformdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onsubmithandler = (e) => {
    e.preventDefault();
     dispatch(login(formdata.email, formdata.password, navigate));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={onsubmithandler}
        className="shadow-md rounded-lg p-8 w-96 flex flex-col"
      >
        <label className="mb-4">
          <p className="mb-2 font-semibold text-gray-700">Email Address</p>
          <input
            required
            type="email"
            value={formdata.email}
            onChange={onchangehandler}
            name="email"
            placeholder="Enter email address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block mb-4 relative">
          <p className="mb-2 font-semibold text-gray-700">Password</p>
          <input
            required
            type={showpassword ? "text" : "password"}
            value={formdata.password}
            onChange={onchangehandler}
            name="password"
            placeholder="Enter password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            onClick={() => setshowpassword(!showpassword)}
            className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-gray-700"
          >
            {showpassword ? <IoEyeOff /> : <IoEye />}
          </span>
        </label>

        <div className="text-blue-900">
          <Link to="/forgotpassword">
            <p>FORGOT PASSWORD</p>
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Loginform;
