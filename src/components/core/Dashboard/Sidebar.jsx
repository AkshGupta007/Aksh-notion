import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import ConfirmationModal from "../../common/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../Services/authApi";
import { LuLogOut } from "react-icons/lu";

const Sidebar = () => {
  const { user, loading } = useSelector((state) => state.profile);
  const { loading: authloading } = useSelector((state) => state.auth);

  const [modal, setModal] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (loading || authloading) {
    return (
      <div className="flex items-center justify-center p-5 text-white">
        Loading...
      </div>
    );
  }

  const sidebarLinks = [
    {
      id: 1,
      name: "My Profile",
      path: "/dashboard/my-profile",
      icon: "VscAccount",
    },
    {
      id: 2,
      name: "Dashboard",
      path: "/dashboard/instructor",
      type: "instructor",
      icon: "VscDashboard",
    },
    {
      id: 3,
      name: "My Courses",
      path: "/dashboard/my-courses",
      type: "instructor",
      icon: "VscVm",
    },
    {
      id: 4,
      name: "Add Course",
      path: "/dashboard/add-course",
      type: "instructor",
      icon: "VscAdd",
    },
    {
      id: 5,
      name: "Enrolled Courses",
      path: "/dashboard/enrolled-courses",
      type: "user",
      icon: "VscMortarBoard",
    },
    {
      id: 6,
      name: "Wishlist",
      path: "/dashboard/cart",
      type: "user",
      icon: "VscBookmark",
    },
  ];

  return (
    <>
      <div
        className="
          w-full
          bg-zinc-900
          border-b border-zinc-700
          md:w-[250px]
          md:min-h-[calc(100vh-64px)]
          md:border-r
          md:border-b-0
          flex
          flex-col
          justify-between
        "
      >
        {/* Top Section */}
        <div className="py-4">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accounttype !== link.type) {
              return null;
            }

            return <SidebarLink key={link.id} link={link} icon={link.icon} />;
          })}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-zinc-700 py-4">
          <SidebarLink
            link={{
              name: "Settings",
              path: "/dashboard/settings",
            }}
            icon="VscSettingsGear"
          />

          <button
            onClick={() =>
              setModal({
                text1: "Are you sure?",
                text2: "You will be logged out.",
                btn1text: "Logout",
                btn2text: "Cancel",
                btn1handler: () => dispatch(logout(navigate)),
                btn2handler: () => setModal(null),
              })
            }
            className="
              flex
              w-full
              items-center
              gap-3
              px-6
              py-3
              text-sm
              text-zinc-300
              hover:bg-zinc-800
              hover:text-white
              transition-all
            "
          >
            <LuLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {modal && <ConfirmationModal modaldata={modal} />}
    </>
  );
};

export default Sidebar;
