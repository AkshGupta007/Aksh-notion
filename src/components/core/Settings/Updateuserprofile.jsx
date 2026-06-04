import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Updateprofile } from "../../../Services/authApi";
import { setUser } from "../../../slices/ProfileSlice";

const Updateuserprofile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        dob: user?.additionaldetails?.dob || "",
        phoneno: user?.additionaldetails?.contact?.replace("+91", "") || "",
        countrycode: "+91",
        gender: user?.additionaldetails?.gender || "",
        about: user?.additionaldetails?.about || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    const { gender, dob, countrycode, phoneno, about } = data;

    const contact = `${countrycode}${phoneno}`;

    const updatedUser = {
      ...user,
      additionaldetails: {
        ...user?.additionaldetails,
        gender,
        dob,
        contact,
        about,
      },
    };

    dispatch(setUser(updatedUser));

    localStorage.setItem("user", JSON.stringify(updatedUser));

    dispatch(
      Updateprofile({
        dob,
        about,
        contact,
        gender,
      }),
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 rounded-xl border border-gray-700 bg-[#0f172a] p-4 md:p-6 shadow-md"
    >
      <h2 className="mb-6 text-xl font-semibold text-white">
        Profile Information
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* DOB */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Date of Birth
          </label>

          <input
            type="date"
            {...register("dob", {
              required: "Date of birth is required",
            })}
            className="w-full rounded-md border border-gray-600 bg-[#020617] p-3 text-white"
          />

          {errors.dob && (
            <p className="mt-1 text-sm text-red-400">{errors.dob.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Phone Number
          </label>

          <div className="flex gap-2">
            <select
              {...register("countrycode")}
              className="rounded-md border border-gray-600 bg-[#020617] p-3 text-white"
            >
              <option value="+91">+91</option>
            </select>

            <input
              type="tel"
              placeholder="9876543210"
              {...register("phoneno", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter valid 10 digit number",
                },
              })}
              className="flex-1 rounded-md border border-gray-600 bg-[#020617] p-3 text-white"
            />
          </div>

          {errors.phoneno && (
            <p className="mt-1 text-sm text-red-400">
              {errors.phoneno.message}
            </p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">Gender</label>

          <div className="flex flex-wrap gap-5 text-white">
            <label>
              <input
                type="radio"
                value="male"
                {...register("gender")}
                className="mr-2"
              />
              Male
            </label>

            <label>
              <input
                type="radio"
                value="female"
                {...register("gender")}
                className="mr-2"
              />
              Female
            </label>

            <label>
              <input
                type="radio"
                value="other"
                {...register("gender")}
                className="mr-2"
              />
              Other
            </label>
          </div>
        </div>

        {/* About */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">About</label>

          <textarea
            rows={4}
            {...register("about")}
            className="w-full rounded-md border border-gray-600 bg-[#020617] p-3 text-white"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md bg-gray-700 px-6 py-3 text-white hover:bg-gray-600"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-md bg-yellow-400 px-6 py-3 font-medium text-black hover:bg-yellow-300"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default Updateuserprofile;
