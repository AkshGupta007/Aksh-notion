import React from "react";
import { useSelector } from "react-redux";
import Signupform from "./Signup";
import Loginform from "./Loginform";

const Template = ({ heading, description1, description2, image, formtype }) => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-800 px-4">
      {loading ? (
        <div className="text-xl font-semibold animate-pulse text-white">
          Loading...
        </div>
      ) : (
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-6 md:p-10">
          {/* LEFT SECTION */}
          <div className="flex flex-col justify-center items-center space-y-6">
            {/* Form */}
            <div className="">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mt-8">
                {heading}
              </h1>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-7">
                <span className="block">{description1}</span>
                <span className="block text-blue-400">{description2}</span>
              </p>
              {formtype === "signup" ? <Signupform /> : <Loginform />}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="hidden md:flex items-center justify-center relative">
            {/* Glow Effect */}
            <div className="absolute w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>

            {/* Image */}
            {image && (
              <img
                src={image}
                alt="template visual"
                className="relative z-10 rounded-xl shadow-lg max-h-[420px] object-cover border border-white/10"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
