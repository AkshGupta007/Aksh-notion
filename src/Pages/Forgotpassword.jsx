import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // useNavigate from react-router-dom
import { resetpasswordtoken } from "../Services/authApi";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(resetpasswordtoken(email, setEmailSent));
  
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-zinc-900 text-white px-4">
      {loading ? (
        <p className="text-gray-300">Loading...</p>
      ) : (
        <>
          {/* Heading */}
          <div className="mb-6 text-center">
            {!emailSent ? (
              <h1 className="text-2xl font-bold">Reset Your Password</h1>
            ) : (
              <h1 className="text-2xl font-bold">Check Your Email</h1>
            )}
          </div>

          {/* Subtext */}
          <div className="mb-4 text-center">
            {!emailSent ? (
              <p className="text-gray-400">
                Enter your email address to reset your password.
              </p>
            ) : (
              <p className="text-gray-400">
               {` Weve sent a reset link to your email to ${email}.`}
              </p>
            )}
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmitHandler}
            className="w-full max-w-sm bg-gray-800 p-6 rounded-lg shadow-md"
          >
            {!emailSent && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Email Address <sup className="text-red-600">*</sup>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="mt-2 w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>
            )}

            {!emailSent ? (
              <button
                type="submit"
                className="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md transition duration-200"
              >
                Send Password
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
              >
                Resend Email
              </button>
            )}
          </form>

          {/* Link */}
          <div className="mt-6">
            <Link to="/login" className="text-blue-400 hover:underline">
              Return to Login
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
