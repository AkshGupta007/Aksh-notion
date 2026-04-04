import React, { useState } from 'react'
import { IoEye, IoEyeOff } from "react-icons/io5"; 
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { resetpassword } from '../Services/authApi';
import { useSelector } from 'react-redux';
const Updatepassword = () => {

    const[formData, setformData]=useState({
        password:"",confirmpassword:""
    })

    const[showPassword,setshowPassword]=useState(false);
       const [showConfirmPassword, setshowConfirmPassword] = useState(false);

    const onChangeHandler=(e)=>{
        setformData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value

        }));
    }
    
    const{token}=useParams();
    const dispatch=useDispatch()

    const OnSubmithandler=(e)=>{
        e.preventDefault();
        dispatch(resetpassword(formData.password,formData.confirmpassword,token))

    }

    const{loading}=useSelector((state)=>state.auth);

    

  return (
    <div className="h-screen flex items-center justify-center bg-pink-950">
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="flex flex-col ">
          <h1 className="text-red-100 text-4xl">CHOOSE YOUR NEW PASSWORD</h1>

          <form onSubmit={OnSubmithandler}>
            {/* Password */}
            <label className="block mb-4 relative">
              <p className="mb-2 font-semibold text-red-300">
                Create Password*
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={onChangeHandler}
                placeholder="Enter password"
                className="w-96 px-3 py-2 rounded-md bg-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setshowPassword(!showPassword)}
                className="absolute text-3xl top-9 cursor-pointer text-white hover:text-gray-200 hover:scale-150 transition-all"
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </span>
            </label>

            {/* Confirm Password */}
            <label className="block mb-6 relative">
              <p className="mb-2 font-semibold text-red-300">
                Confirm Password*
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={onChangeHandler}
                placeholder="Enter password again"
                className="w-96 px-3 py-2 rounded-md bg-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setshowConfirmPassword(!showConfirmPassword)}
                className="absolute text-3xl top-9 cursor-pointer text-white hover:text-gray-200 hover:scale-150 transition-all"
               
              >
                {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
              </span>
            </label>

            <button
              type="submit"
              className="w-96 bg-yellow-600 text-black py-2 text-center rounded-md font-semibold hover:scale-75 transition-colors"
            >
              CHANGE PASSWORD
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Updatepassword

