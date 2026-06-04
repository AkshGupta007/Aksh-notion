import React from "react";
import { useSelector } from "react-redux";
import Signupform from "./Signup";
import Loginform from "./Loginform";
import login from "../../assests/login.jpg"
import signup from "../../assests/singup.jpg"
const Template = ({ heading, description1, description2, image, formtype }) => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-800 px-4 py-8">
      {/* Background Glow */}
      <div className="absolute left-[-160px] top-[-160px] h-[320px] w-[320px] rounded-full bg-blue-500/20 blur-3xl sm:h-[500px] sm:w-[500px]" />
      <div className="absolute bottom-[-160px] right-[-160px] h-[280px] w-[280px] rounded-full bg-purple-500/20 blur-3xl sm:h-[400px] sm:w-[400px]" />

      {loading ? (
        <div className="text-xl font-semibold animate-pulse text-white z-10">
          Loading...
        </div>
      ) : (
        <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl md:grid-cols-2 md:rounded-3xl">
          {/* LEFT SECTION */}
          <div className="flex flex-col justify-center px-4 py-8 sm:px-6 md:px-10 md:py-12">
            <div className="max-w-md w-full mx-auto">
              {/* Heading */}
              <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
                {heading}
              </h1>

              {/* Description */}
              <p className="mt-4 text-gray-400 text-sm md:text-base leading-relaxed">
                <span className="block">{description1}</span>
                <span className="block text-blue-400 font-medium">
                  {description2}
                </span>
              </p>

              {/* Form */}
              <div className="mt-8">
                {formtype === "signup" ? <Signupform /> : <Loginform />}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-white/5 to-white/0 relative">
            {/* Soft overlay glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10"></div>

            {formtype === "signup" ? (
              <img
                src={signup}
                alt="auth visual"
                className="relative z-10 h-full object-contain drop-shadow-2xl"
              />
            ) : (
              <img
                src={login}
                alt="auth visual"
                className="relative z-10 max-h-[420px] object-contain drop-shadow-2xl"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
