import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { setSignup } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { sendOtp } from "../../Services/authApi";

const RegisterForm = () => {
    const dispatch =useDispatch();
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accountType:"user"
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onChangeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your dispatch or API call here
    dispatch(setSignup(formData));
    dispatch(sendOtp(formData.email,navigate))
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={onSubmitHandler}
        className="bg-gray-800 text-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              formData.accountType === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
            onClick={() =>
              setFormData((prev) => ({ ...prev, accountType: "user" }))
            }
          >
            Student
          </button>

          <button
            type="button"
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              formData.accountType === "instructor"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
            onClick={() =>
              setFormData((prev) => ({ ...prev, accountType: "instructor" }))
            }
          >
            Instructor
          </button>
        </div>

        {/* First Name */}
        <label className="block mb-4">
          <p className="mb-2 font-semibold">First Name*</p>
          <input
            required
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            placeholder="Enter first name"
            className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Last Name */}
        <label className="block mb-4">
          <p className="mb-2 font-semibold">Last Name*</p>
          <input
            required
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            placeholder="Enter last name"
            className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Email */}
        <label className="block mb-4">
          <p className="mb-2 font-semibold">Email Address*</p>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            placeholder="Enter email address"
            className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Phone */}
        <label className="block mb-4">
          <p className="mb-2 font-semibold">Phone Number*</p>
          <div className="flex">
            <span className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-md">
              +91
            </span>
            <input
              required
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChangeHandler}
              placeholder="12345 67890"
              className="w-full px-3 py-2 rounded-r-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </label>

        {/* Password */}
        <label className="block mb-4 relative">
          <p className="mb-2 font-semibold">Create Password*</p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            placeholder="Enter password"
            className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 cursor-pointer text-gray-400 hover:text-gray-200"
          >
            {showPassword ? <IoEyeOff /> : <IoEye />}
          </span>
        </label>

        {/* Confirm Password */}
        <label className="block mb-6 relative">
          <p className="mb-2 font-semibold">Confirm Password*</p>
          <input
            required
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={onChangeHandler}
            placeholder="Enter password again"
            className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 cursor-pointer text-gray-400 hover:text-gray-200"
          >
            {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
          </span>
        </label>

        <div>
          <Link to="/forgotpassword">
            <p>FORGOT PASSWORD</p>
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
        >
          SIGN UP
        </button>
      </form>
    </div>
  );
};


export default RegisterForm
