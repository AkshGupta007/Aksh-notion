import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
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

      <input
        name="email"
        placeholder="Email"
        className="input-dark"
        onChange={onchangehandler}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        className="input-dark"
        onChange={onchangehandler}
      />

      <button className="btn-primary">Sign In</button>

      <p className="text-center text-sm text-gray-400">
        New here?{" "}
        <Link to="/signup" className="text-blue-400">
          Create account
        </Link>
      </p>


    <button onClick={()=>navigate("/forgotpassword") }className="text-sm text-gray-400">
      FORGOT PASSWORD
    </button>
    </form>
  )};

  


export default Loginform;
