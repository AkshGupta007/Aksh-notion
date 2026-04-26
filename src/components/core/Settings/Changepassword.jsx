// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { Changepassword } from "../../../Services/authApi";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

// export default function ChangePasswordForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [showCurrent, setShowCurrent] = useState(false);
//   const [showNew, setShowNew] = useState(false);

//   const {user}=useSelector((state)=>state.profile);

//   const dispatch=useDispatch();

//   const onSubmit = (data) => {
//     console.log("Form submitted:", data);
//     const {currentPassword,newPassword}=data;

//     dispatch(Changepassword(user.email,currentPassword,newPassword));

//   };

//   return (
//     <div className="h-fit   bg-zinc-700 mt-9 py-4 px-2">
//       <h1 className="text-4xl text-white font-bold">CHANGE PASSWORD</h1>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="rounded-lg shadow-lg flex flex-col justify-between"
//       >
//         <div className="flex gap-10 justify-stretch">
//           {/* Current Password */}
//           <div className="mb-4 relative flex flex-col">
//             <label className="block text-gray-300 mb-1">
//               Current Password *
//             </label>
//             <input
//               type={showCurrent ? "text" : "password"}
//               {...register("currentPassword", {
//                 required: "Current password is required",
//               })}
//               className="w-full px-3 py-2 rounded bg-white text-black focus:outline-none"
//             />
//             <button
//               type="button"
//               onClick={() => setShowCurrent(!showCurrent)}
//               className="absolute right-2 top-8 text-black hover:text-white"
//             >
//               {showCurrent ? "🙈" : "👁️"}
//             </button>
//             {errors.currentPassword && (
//               <p className="text-red-400 text-sm mt-1">
//                 {errors.currentPassword.message}
//               </p>
//             )}
//           </div>

//           {/* New Password */}
//           <div className="mb-4 relative flex flex-col">
//             <label className="block text-gray-300 mb-1">
//               Change Password *
//             </label>
//             <input
//               type={showNew ? "text" : "password"}
//               {...register("newPassword", {
//                 required: "New password is required",
//               })}
//               className="w-full px-3 py-2 rounded bg-white text-black focus:outline-none"
//             />
//             <button
//               type="button"
//               onClick={() => setShowNew(!showNew)}
//               className="absolute right-2 top-8 text-gray-400 hover:text-white"
//             >
//               {showNew ? "🙈" : "👁️"}
//             </button>
//             {errors.newPassword && (
//               <p className="text-red-400 text-sm mt-1">
//                 {errors.newPassword.message}
//               </p>
//             )}
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-fit bg-yellow-400 text-black hover:bg-blue-700  py-2 rounded"
//         >
//           Update Password
//         </button>
//       </form>
//     </div>
//   );
// }

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Changepassword } from "../../../Services/authApi";
import { useDispatch, useSelector } from "react-redux";

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const { currentPassword, newPassword } = data;
    dispatch(Changepassword(user.email, currentPassword, newPassword));
  };

  return (
    <div className="bg-[#0f172a] border border-gray-700 rounded-xl p-6 mt-8 shadow-md">
      <h2 className="text-xl font-semibold text-white mb-6">Change Password</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        {/* Current Password */}
        <div className="relative">
          <label className="text-gray-400 text-sm">Current Password</label>
          <input
            type={showCurrent ? "text" : "password"}
            {...register("currentPassword", { required: "Required" })}
            className="w-full mt-1 p-2 rounded bg-[#020617] text-white border border-gray-600"
          />
          <span
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-3 top-9 cursor-pointer"
          >
            {showCurrent ? "🙈" : "👁️"}
          </span>
          {errors.currentPassword && (
            <p className="text-red-400 text-sm">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="relative">
          <label className="text-gray-400 text-sm">New Password</label>
          <input
            type={showNew ? "text" : "password"}
            {...register("newPassword", { required: "Required" })}
            className="w-full mt-1 p-2 rounded bg-[#020617] text-white border border-gray-600"
          />
          <span
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-9 cursor-pointer"
          >
            {showNew ? "🙈" : "👁️"}
          </span>
          {errors.newPassword && (
            <p className="text-red-400 text-sm">{errors.newPassword.message}</p>
          )}
        </div>

        <button className="col-span-2 bg-yellow-400 hover:bg-yellow-300 text-black py-2 rounded-md">
          Update Password
        </button>
      </form>
    </div>
  );
}