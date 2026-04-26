import React from "react";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Myprofile = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="text-white w-full px-6 py-6">
      {/* Heading */}
      <h1 className="text-3xl font-semibold">My Profile</h1>

      {/* ===== Profile Card ===== */}
      <div className="bg-[#0f172a] border border-gray-700 rounded-xl p-6 flex items-center justify-between mt-8 shadow-md">
        <div className="flex items-center gap-5">
          <img
            src={user?.image || "/default-avatar.png"}
            alt="profile"
            className="w-16 h-16 rounded-full object-cover border border-gray-600"
          />

          <div>
            <h2 className="text-xl font-semibold">
              {user?.firstname} {user?.lastname}
            </h2>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </div>

        <Link to="/dashboard/settings">
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-md flex items-center gap-2 font-medium transition">
            Edit <FaEdit />
          </button>
        </Link>
      </div>

      {/* ===== About Section ===== */}
      <div className="bg-[#0f172a] border border-gray-700 rounded-xl p-6 mt-8 shadow-md flex justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-3">About</h2>
          <p className="text-gray-300 max-w-xl">
            {user?.additionaldetails?.about || "Add something about yourself"}
          </p>
        </div>

        <Link to="/dashboard/settings">
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-md flex items-center gap-2 font-medium transition h-fit">
            Edit <FaEdit />
          </button>
        </Link>
      </div>

      {/* ===== Personal Details ===== */}
      <div className="bg-[#0f172a] border border-gray-700 rounded-xl p-6 mt-8 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Personal Details</h2>

          <Link to="/dashboard/settings">
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-md flex items-center gap-2 font-medium transition">
              Edit <FaEdit />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-y-6 gap-x-10 text-sm">
          <div>
            <p className="text-gray-400">First Name</p>
            <p className="text-white font-medium">{user?.firstname}</p>
          </div>

          <div>
            <p className="text-gray-400">Last Name</p>
            <p className="text-white font-medium">{user?.lastname}</p>
          </div>

          <div>
            <p className="text-gray-400">Email</p>
            <p className="text-white font-medium">{user?.email}</p>
          </div>

          <div>
            <p className="text-gray-400">Phone</p>
            <p className="text-white font-medium">
              {user?.additionaldetails?.contact || "Not added"}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Gender</p>
            <p className="text-white font-medium">
              {user?.additionaldetails?.gender || "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Date of Birth</p>
            <p className="text-white font-medium">
              {user?.additionaldetails?.dob || "Not added"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myprofile; 


// import React from "react";
// import { useSelector } from "react-redux";
// import { FaEdit } from "react-icons/fa";
// import { Link } from "react-router";
// const Myprofile = () => {
//     const {user}=useSelector((state)=>state.profile)
//   return (
//     <div className=" text-white w-full h-full mt-5 ">
//       <h1 className="text-white text-3xl">MY PROFILE</h1>

//       <div className="bg-neutral-600 flex w-11/12 h-28 items-center justify-between mt-8">
//         <div className="flex">
//           <img
//             src={user?.image}
//             alt="aksh"
//             className="object-cover w-32 h-14rounded-md"
//           />
//           <div>
//             <h1 className="text-2xl">
//               {user.firstname} {user.lastname}
//             </h1>

//             <p className="text-green-500">{user.email}</p>
//           </div>
//         </div>

//         <Link to="/dashboard/settings">
//           <button className="bg-yellow-500 text-black rounded-md mr-9 px-2 py-2 font-semibold hover:bg-yellow-400 transition flex justify-center items-center gap-2">
//             EDIT{" "}
//             <span>
//               <FaEdit />
//             </span>
//           </button>
//         </Link>
//       </div>

//       <div className="bg-neutral-600 flex w-11/12 h-28 items-center justify-between mt-16">
//         <div className="ml-9 flex flex-col gap-7">
//           <h1 className="text-3xl">ABOUT</h1>

//           <p className="text-white">
//             {user?.additionaldetails?.about ?? " add your about"}
//           </p>
//         </div>
//         <Link to="/dashboard/settings">
//           <button className="bg-yellow-500 text-black rounded-md mr-9 px-2 py-2 font-semibold hover:bg-yellow-400 transition flex justify-center items-center gap-2">
//             EDIT{" "}
//             <span>
//               <FaEdit />
//             </span>
//           </button>
//         </Link>
//       </div>

//       <div className="bg-neutral-600 flex w-11/12 h-fit items-center justify-between mt-16">
//         <div className="ml-9 flex flex-col gap-7">
//           <h1 className="text-3xl mt-6">PERSONAL DETAILS</h1>

//           <div className=" flex gap-8 mb-4">
//             <div className="flex flex-col gap-2">
//               <div className="flex flex-col">
//                 <p className="text-sm text-gray-900"> FIRST NAME</p>
//                 <p>{user.firstname}</p>
//               </div>

//               <div className="flex flex-col">
//                 <p className="text-sm text-gray-900">EMAIL</p>
//                 <p>{user.email}</p>
//               </div>

//               <div className="flex flex-col">
//                 <p className="text-sm text-gray-900"> about</p>
//                 <p>{user?.additionaldetails.about}</p>
//               </div>
//             </div>

//             <div className="flex flex-col gap-2">
//               <div className="flex flex-col">
//                 <p className="text-sm text-gray-900"> Gender</p>
//                 <p>{user?.additionaldetails.gender}</p>
//               </div>

//               <div className="flex flex-col">
//                 <p className="text-sm text-gray-900"> PHONE NUMBER</p>
//                 <p>{user?.additionaldetails.contact ?? "add your number"}</p>
//               </div>

//               <div className="flex flex-col">
//                 <p className="text-sm text-gray-900"> DOB</p>
//                 <p>{user?.additionaldetails.dob}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <Link to="/dashboard/settings">
//           <button className="bg-yellow-500 text-black rounded-md mr-9 px-2 py-2 font-semibold hover:bg-yellow-400 transition flex justify-center items-center gap-2">
//             EDIT{" "}
//             <span>
//               <FaEdit />
//             </span>
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Myprofile;
