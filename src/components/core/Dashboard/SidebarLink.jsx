import clsx from "clsx";
import React from "react";
import * as icons from "react-icons/vsc";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ link, icon }) => {
  const Icon = icons[icon];

  if (!link || !link.path) return null;

  return (
    <NavLink
      to={link.path}
      end={false}
      className={({ isActive }) =>
        clsx(
          "relative flex w-max items-center gap-x-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 md:w-full md:px-6",
          isActive
            ? "bg-yellow-700 text-black"
            : "text-gray-300 hover:bg-zinc-700 hover:text-white",
        )
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={clsx(
              "absolute left-0 top-0 h-full w-[0.2rem] bg-red-600 transition-opacity",
              isActive ? "opacity-100" : "opacity-0",
            )}
          ></span>

          <Icon className="text-lg" />
          <span>{link.name}</span>
        </>
      )}
    </NavLink>
  );
};

export default SidebarLink;
