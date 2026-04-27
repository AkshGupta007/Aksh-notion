// import react from "react";
// import { useDispatch, useSelector } from "react-redux";
import { apiconnector } from "./apiconnector";
import { setLoading } from "../slices/authSlice";
import { setUser } from "../slices/ProfileSlice";
import { resetcart } from "../slices/Cartslice";
import { setToken } from "../slices/authSlice";

import { toast } from "react-toastify";

import {
  SENDOTP_API,
  LOGIN_API,
  SIGNUP_API,
  RESETPASSWORDTOKEN_API,
  RESETPASSWORD_API,
  UPDATEPROFILE_API,
  CHANGEPASSWORD_API,
  DELETEPROFILE_API,
} from "./apis";


export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiconnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      console.log("SENDOTP API RESPONSE............", response);
      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export const login = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiconnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("api response" + response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("login successfull");
      dispatch(setToken(response.data.token));

      ///image line
      const image = `https://api.dicebear.com/9.x/pixel-art/svg`;

      const userWithImage = { ...response.data.user, image: image };

      dispatch(setUser(userWithImage));
      localStorage.setItem("user", JSON.stringify(userWithImage));

      localStorage.setItem("token", JSON.stringify(response.data.token));

      console.log("User from API:", response.data.user);
      console.log("User saved in Redux:", userWithImage);
      console.log("User in localStorage:", localStorage.getItem("user"));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("error occured" + error);
      toast.error("login failed");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

export function resetpasswordtoken(email, setEmailsent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiconnector("POST", RESETPASSWORDTOKEN_API, {
        email,
      });

      console.log("reset password token response" + response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("email sent successfuly");
      setEmailsent(true);
    } catch (error) {
      console.log("error occured" + error);
      toast.error("email failed");
    }

    dispatch(setLoading(false));
  };
}

export function resetpassword(password, confirmpassword, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    console.log("token is" + token);
    try {
      const response = await apiconnector("POST", RESETPASSWORD_API, {
        password,
        confirmpassword,
        token,
      });

      console.log("password changed successfuly" + response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("password changed successfuly");
    } catch (error) {
      console.log("error occured" + error);
      toast.error("password change  failed");
    }

    dispatch(setLoading(false));
  };
}

export function signUp(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  accountType,
  navigate,
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      if (password !== confirmPassword) {
        toast.dismiss(toastId);
        toast.error("Passwords do not match");
        dispatch(setLoading(false));
        return;
      }

      const response = await apiconnector("POST", SIGNUP_API, {
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        confirmpassword: confirmPassword,
        otp,
        accounttype: accountType,
      });

      console.log("SIGNUP RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup successful");
      navigate("/login"); // redirect after success
    } catch (error) {
      console.error("SIGNUP ERROR:", error);
      toast.error("Signup failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export const logout = (navigate) => {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetcart());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };
};

export const Updateprofile = ({ dob, about, contact, gender }) => {
  return async (dispatch) => {
    try {
       const token = localStorage.getItem("token");
       console.log("token isss",token)
       console.log("Sending Data:", { dob, about, contact, gender });
      toast.success("wait");

      const response = await apiconnector(
        "PUT",
        UPDATEPROFILE_API,
        {
          dob,
          about,
          contact,
          gender,
        },
        {
            Authorization: `Bearer ${token}`, // ✅ attach token properly
          
        },
      );

      toast.success("updated successfully");
      console.log(response.data.data);
    } catch (error) {
      toast.error("error in updating");
      console.log(error);
    }
  };
};

export const Changepassword=(email,currentPassword,newPassword)=>{

  return async(dispatch)=>{

    try{
       const token = localStorage.getItem("token");
      const response = await apiconnector("POST", CHANGEPASSWORD_API,{
        email,
        password:currentPassword,
        newpassword:newPassword,
        confirmpassword:newPassword
      }, {
            Authorization: `Bearer ${token}`, // ✅ attach token properly
          
        },)

        
      toast.success("updated successfully");

        console.log("response",response);
    }catch(error){
      console.log("error",error);
        toast.error("error in updating");
    }
  }
}

export const Deleteprofileaccount=(navigate)=>{

  const token=localStorage.getItem("token")

  return async(dispatch)=>{
    try{
      const response= await apiconnector("DELETE",DELETEPROFILE_API,{}, {
            Authorization: `Bearer ${token}`, // ✅ attach token properly
          
        },)

     if(response.data.success){
          dispatch(setToken(null));
          dispatch(setUser(null));
          dispatch(resetcart());
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate("/");

          toast.success("delete successfull");
     }
    }
  catch(error){
      console.log("error",error);
        toast.error("error in deleting");
    }}
}