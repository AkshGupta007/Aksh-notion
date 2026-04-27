import React from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router';
import { sendOtp } from '../Services/authApi';
import { signUp } from '../Services/authApi';
import { useState } from 'react';
import { useEffect } from 'react';
const Verifyemail = () => {

    const dispatch=useDispatch();
    const{signup,loading}=useSelector((state)=>state.auth);
    const[otp,setotp]=useState("");
    console.log("signup data"+signup)

    const navigate=useNavigate();

    useEffect(()=>{
        if(!signup){
            navigate("/signup")
        }
    },[signup,navigate]);


    const Submithandler=(e)=>{

        e.preventDefault();
        const {
         
          lastName,
          email,
          password,
          confirmPassword,
          accountType
        } = signup;

        const firstName=signup.firstName.toLowerCase();

        console.log("Sending data:", {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          otp,
          accountType
        });
           

        dispatch(
          signUp(
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            accountType,
            navigate
          ),
        );
    }



  return (
    <div className="h-screen bg-zinc-800">


      {loading ? (
        <div></div>
      ) : (
        <div className=" h-screen flex flex-col justify-center items-center gap-6">
          <form onSubmit={Submithandler}>
            <OTPInput className="otp-container flex w-12 h-12" 
              value={otp}
              onChange={setotp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => (
                <input {...props} className="text-purple-400 bg-black" />
              )}
            />

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-7" type="submit">
              Verify Email
            </button>
          </form>

          <div>
            <Link to="/login">
              <p className="text-blue-500 hover:underline"> BACK TO LOGIN</p>
            </Link>
          </div>

          <button  className="bg-orange-600 px-4 py-4 rounded-md "onClick={() => dispatch(sendOtp(signup.email,navigate))}>
            RESEND
          </button>
        </div>
      )}
    </div>
  );
}

export default Verifyemail
