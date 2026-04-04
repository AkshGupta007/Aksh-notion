import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import Sidebar from "../components/core/Dashboard/Sidebar"

const Dashboard = () => {
    const{loading:authloading}=useSelector((state)=>state.auth);
     const { loading: profileloading } = useSelector((state) => state.profile);

          
        if (profileloading || authloading) {
            return(
                <div>
                    loaading...
                </div>
            )
        }
  return (
    <div
      className="flex relative h-[calc(100vh-3.5rem)]
"
    >
      <Sidebar />
      <div className=" flex-1 overflow-auto">
        <div className="w-11/12 mx-auto  py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard
