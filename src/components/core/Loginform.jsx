import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../Services/authApi";

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
    dispatch(login(formdata.email.toLowerCase(), formdata.password, navigate));
  };

  return (
    <form
      onSubmit={onsubmithandler}
      className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5"
    >
      <h2 className="text-2xl font-bold text-white text-center">
        Welcome Back 👋
      </h2>

      {/* EMAIL */}
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formdata.email}
        onChange={onchangehandler}
        className="input-dark"
        required
      />

      {/* PASSWORD */}
      <div className="relative">
        <input
          name="password"
          type={showpassword ? "text" : "password"}
          placeholder="Password"
          value={formdata.password}
          onChange={onchangehandler}
          className="input-dark w-full"
          required
        />

        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setshowpassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400"
        >
          {showpassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* SUBMIT */}
      <button type="submit" className="btn-primary w-full">
        Sign In
      </button>

      {/* LINKS */}
      <p className="text-center text-sm text-gray-400">
        New here?{" "}
        <Link to="/signup" className="text-blue-400">
          Create account
        </Link>
      </p>

      <button
        type="button"
        onClick={() => navigate("/forgotpassword")}
        className="block mx-auto text-sm text-gray-400 hover:text-white"
      >
        Forgot Password?
      </button>
    </form>
  );
};

export default Loginform;
