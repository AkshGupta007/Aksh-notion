import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { setSignup } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp } from "../../Services/authApi";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accountType: "user",
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

    // normalize email to lowercase
    const normalizedData = {
      ...formData,
      email: formData.email.toLowerCase(),
    };
    dispatch(setSignup(normalizedData));
    dispatch(sendOtp(normalizedData.email, navigate));
  };;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-blue-100 px-4 py-8">
      {/* Glow Background */}
      <div className="absolute left-[-160px] top-[-160px] h-[320px] w-[320px] rounded-full bg-purple-300/30 blur-3xl sm:h-[500px] sm:w-[500px]" />
      <div className="absolute bottom-[-160px] right-[-160px] h-[280px] w-[280px] rounded-full bg-blue-300/30 blur-3xl sm:h-[400px] sm:w-[400px]" />

      {/* Card */}
      <form
        onSubmit={onSubmitHandler}
        className="relative z-10 w-full max-w-lg space-y-5 rounded-2xl border border-white/30 bg-white/60 p-5 shadow-2xl backdrop-blur-xl sm:space-y-6 sm:rounded-3xl sm:p-8"
      >
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            Create Account ✨
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Join us and start your journey
          </p>
        </div>

        {/* Account Type Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {["user", "instructor"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, accountType: type }))
              }
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                formData.accountType === type
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {type === "user" ? "Student" : "Instructor"}
            </button>
          ))}
        </div>

        {/* Name Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            required
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            placeholder="First Name"
            className="input-style"
          />
          <input
            required
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            placeholder="Last Name"
            className="input-style"
          />
        </div>

        {/* Email */}
        <input
          required
          type="email"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          placeholder="Email address"
          className="input-style"
        />

        {/* Phone */}
        <div className="flex">
          <span className="px-4 py-3 bg-white/70 border border-gray-200 rounded-l-xl text-gray-600">
            +91
          </span>
          <input
            required
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            placeholder="Phone number"
            className="input-style rounded-l-none"
          />
        </div>

        {/* Passwords */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={onChangeHandler}
              placeholder="Password"
              className="input-style pr-10"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="icon-style"
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>

          <div className="relative">
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChangeHandler}
              placeholder="Confirm"
              className="input-style pr-10"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="icon-style"
            >
              {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition"
        >
          Create Account
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>

      {/* Reusable Styles */}
      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid #e5e7eb;
          outline: none;
          transition: all 0.2s;
        }
        .input-style:focus {
          ring: 2px;
          border-color: #3b82f6;
          background: white;
        }
        .icon-style {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default RegisterForm;
