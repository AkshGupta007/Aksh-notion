import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Sidebar from "../components/core/Dashboard/Sidebar";

const Dashboard = () => {
  const { loading: authloading } = useSelector((state) => state.auth);

  const { loading: profileloading } = useSelector((state) => state.profile);

  if (profileloading || authloading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-richblack-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 md:px-8 md:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
