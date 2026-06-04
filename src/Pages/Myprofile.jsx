import React from "react";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Myprofile = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-full px-4 py-4 sm:px-6 sm:py-6 text-white">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-semibold">My Profile</h1>

      {/* ===== Profile Card ===== */}
      <div className="mt-6 flex flex-col gap-5 rounded-xl border border-gray-700 bg-[#0f172a] p-4 shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <img
            src={user?.image || "/default-avatar.png"}
            alt="profile"
            className="h-20 w-20 rounded-full border border-gray-600 object-cover sm:h-16 sm:w-16"
          />

          <div>
            <h2 className="text-lg font-semibold sm:text-xl">
              {user?.firstname} {user?.lastname}
            </h2>

            <p className="break-all text-gray-400">{user?.email}</p>
          </div>
        </div>

        <Link to="/dashboard/settings" className="w-full sm:w-auto">
          <button className="flex w-full items-center justify-center gap-2 rounded-md bg-yellow-400 px-4 py-2 font-medium text-black transition hover:bg-yellow-300 sm:w-auto">
            Edit <FaEdit />
          </button>
        </Link>
      </div>

      {/* ===== About Section ===== */}
      <div className="mt-6 flex flex-col gap-5 rounded-xl border border-gray-700 bg-[#0f172a] p-4 shadow-md sm:flex-row sm:items-start sm:justify-between sm:p-6">
        <div>
          <h2 className="mb-3 text-lg font-semibold sm:text-xl">About</h2>

          <p className="max-w-xl break-words text-gray-300">
            {user?.additionaldetails?.about || "Add something about yourself"}
          </p>
        </div>

        <Link to="/dashboard/settings" className="w-full sm:w-auto">
          <button className="flex w-full items-center justify-center gap-2 rounded-md bg-yellow-400 px-4 py-2 font-medium text-black transition hover:bg-yellow-300 sm:w-auto">
            Edit <FaEdit />
          </button>
        </Link>
      </div>

      {/* ===== Personal Details ===== */}
      <div className="mt-6 rounded-xl border border-gray-700 bg-[#0f172a] p-4 shadow-md sm:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold sm:text-xl">Personal Details</h2>

          <Link to="/dashboard/settings" className="w-full sm:w-auto">
            <button className="flex w-full items-center justify-center gap-2 rounded-md bg-yellow-400 px-4 py-2 font-medium text-black transition hover:bg-yellow-300 sm:w-auto">
              Edit <FaEdit />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-400">First Name</p>
            <p className="font-medium text-white">
              {user?.firstname || "Not added"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Last Name</p>
            <p className="font-medium text-white">
              {user?.lastname || "Not added"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="break-all font-medium text-white">
              {user?.email || "Not added"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Phone Number</p>
            <p className="font-medium text-white">
              {user?.additionaldetails?.contact || "Not added"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Gender</p>
            <p className="font-medium text-white">
              {user?.additionaldetails?.gender || "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Date of Birth</p>
            <p className="font-medium text-white">
              {user?.additionaldetails?.dob || "Not added"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
