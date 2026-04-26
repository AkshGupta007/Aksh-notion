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
  const [modal, setmodal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (loading || authloading) {
    return <div>loading...</div>;
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
      id: 7,
      name: "Wishlist",
      path: "/dashboard/cart",
      type: "user",
      icon: "VscBookmark",
    },
  ];

  return (
    <div className="text-white">
      <div className="flex flex-col border-r h-[calc(100vh-3.5rem)] bg-zinc-800 py-10 min-w-[222px]">
        <div className="flex flex-col justify-around items-center gap-3">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accounttype !== link.type) return null;
            return (
              <div key={link.id}>
                <SidebarLink link={link} icon={link.icon} />
              </div>
            );
          })}
        </div>

        <div className="mt-3 px-8">
          <SidebarLink
            link={{ name: "SETTING", path: "/dashboard/settings" }}
            icon="VscSettingsGear"
          />
        </div>

        <button className="mt-4 px-4"
          onClick={() =>
            setmodal({
              text1: "ARE YOU SURE?",
              text2: "YOU WILL BE LOGGED OUT",
              btn1text: "LOGOUT",
              btn2text: "CANCEL",
              btn1handler: () => dispatch(logout(navigate)),
              btn2handler: () => setmodal(null),
            })
          }
        >
          <LuLogOut className="inline-block mr-2" />
          LOGOUT
        </button>
      </div>
      {modal && <ConfirmationModal modaldata={modal} />}
    </div>
  );
};

export default Sidebar;
