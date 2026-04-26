import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Updateprofile } from "../../../Services/authApi";
import { setUser } from "../../../slices/ProfileSlice";

const Updateuserprofile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const{user}=useSelector((state)=>state.profile)

  // Submit handler
  const onSubmit = (data) => {
    const { gender, dob, countrycode, phoneno, about } = data;
    const contact = countrycode + phoneno;

    // alert(`Profile Updated!\n${JSON.stringify(data, null, 2)}`);
  const updatedUser = {
    ...user,
    additionaldetails: {
      ...user.additionaldetails, // keep existing values
      gender,
      dob,
      contact,
      about,
    },
  };

      dispatch(setUser(updatedUser));
localStorage.setItem("user", JSON.stringify(updatedUser));


    console.log(user);

    dispatch(Updateprofile({dob, about, contact, gender}));
  };

  useEffect(() => {
    console.log("User after update:", user);
  }, [user]);


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col bg-[#0f172a] border border-gray-700 rounded-xl p-6 mt-8 shadow-md  text-yellow-50 font-semibold"
    >
      <h1 className="text-xl font-bold">PROFILE INFORMATION</h1>

      <div className="flex  mt-5 gap-11 ">
        <div className="flex flex-col gap-y-11 ">
          {/* Display Name */}
          <div className="flex flex-col w-fit gap-1">
            <label htmlFor="display">Display Name</label>
            <input
              type="text"
              id="display"
              {...register("name", { required: "Name is required" })}
              className="border px-2 py-1 text-black rounded-md"
            />
            {errors.name && (
              <span className="text-red-400 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col w-fit gap-1">
            <label htmlFor="dob">Date Of Birth</label>
            <input
              type="date"
              id="dob"
              {...register("dob", { required: "Date of Birth is required" })}
              className="bg-slate-600 text-yellow-300 px-2 py-1 rounded-md"
            />
            {errors.dob && (
              <span className="text-red-400 text-sm">{errors.dob.message}</span>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col w-fit gap-1">
            <label htmlFor="phoneno" className="text-yellow-300">
              Phone No.
            </label>
            <div className="flex gap-4 items-center mt-2">
              <select
                id="countrycode"
                className="border px-2 py-1 text-black w-16 rounded-md"
                {...register("countrycode")}
              >
                <option value="+91">+91</option>
              </select>
              <input
                type="tel"
                id="phoneno"
                {...register("phoneno", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit number",
                  },
                })}
                className="border px-2 py-1 text-black rounded-md"
              />
            </div>
            {errors.phoneno && (
              <span className="text-red-400 text-sm">
                {errors.phoneno.message}
              </span>
            )}
          </div>
        </div>

        {/* <div className=" "> */}
        <div className=" flex flex-col gap-y-11">
          {/* Profession */}
          <div className="flex flex-col w-fit gap-1">
            <label htmlFor="profession">Profession</label>
            <input
              type="text"
              id="profession"
              {...register("profession")}
              className="border px-2 py-1 text-black rounded-md"
            />
          </div>

          {/* Gender Radio */}
          <div className="py-2">
            <label className="font-medium">Gender</label>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="male"
                  {...register("gender", { required: "Gender is required" })}
                  className="accent-blue-500"
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="female"
                  {...register("gender", { required: "Gender is required" })}
                  className="accent-pink-500"
                />
                Female
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="other"
                  {...register("gender", { required: "Gender is required" })}
                  className="accent-green-500"
                />
                Other
              </label>
            </div>
            {errors.gender && (
              <span className="text-red-400 text-sm">
                {errors.gender.message}
              </span>
            )}
          </div>

          {/* About */}
          <div className="flex flex-col w-fit gap-1">
            <label htmlFor="about">About</label>
            <input
              type="text"
              id="about"
              {...register("about")}
              className="border px-2 py-1 text-black rounded-md"
            />
          </div>
        </div>
        {/* </div> */}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Save Profile
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default Updateuserprofile;
