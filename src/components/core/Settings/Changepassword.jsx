import { useForm } from "react-hook-form";
import { useState } from "react";
import { Changepassword } from "../../../Services/authApi";
import { useDispatch, useSelector } from "react-redux";

export default function ChangePasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(
      Changepassword(user.email, data.currentPassword, data.newPassword),
    );
  };

  return (
    <div className="mt-8 rounded-xl border border-gray-700 bg-[#0f172a] p-4 md:p-6 shadow-md">
      <h2 className="mb-6 text-xl font-semibold text-white">Change Password</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <div className="relative">
          <label className="text-sm text-gray-300">Current Password</label>

          <input
            type={showCurrent ? "text" : "password"}
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            className="mt-2 w-full rounded-md border border-gray-600 bg-[#020617] p-3 text-white"
          />

          <span
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-4 top-11 cursor-pointer"
          >
            {showCurrent ? "🙈" : "👁️"}
          </span>

          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-400">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label className="text-sm text-gray-300">New Password</label>

          <input
            type={showNew ? "text" : "password"}
            {...register("newPassword", {
              required: "New password is required",
            })}
            className="mt-2 w-full rounded-md border border-gray-600 bg-[#020617] p-3 text-white"
          />

          <span
            onClick={() => setShowNew(!showNew)}
            className="absolute right-4 top-11 cursor-pointer"
          >
            {showNew ? "🙈" : "👁️"}
          </span>

          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-400">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="rounded-md bg-yellow-400 py-3 font-medium text-black hover:bg-yellow-300 md:col-span-2"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
