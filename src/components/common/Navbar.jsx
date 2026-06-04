import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import { FaBars, FaTimes } from "react-icons/fa";
import clsx from "clsx";
import { apiconnector } from "../../Services/apiconnector";
import { CATEGORIES_API } from "../../Services/apis";
import Profiledown from "../core/homepage/Profiledown";
import { IoIosArrowDropdown } from "react-icons/io";
import thumbnail from "../../assests/png logo.png";

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);
  const location = useLocation();

  const [sublinks, setsublinks] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  const NavbarLinks = [
    { title: "Home", path: "/" },
    { title: "Catalog" },
    { title: "About Us", path: "/about" },
    { title: "Contact Us", path: "/contact" },
  ];

  const fetchdata = async () => {
    try {
      const result = await apiconnector("GET", CATEGORIES_API);
      setsublinks(result.data.data);
    } catch (error) {
      console.log("error" + error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setCatalogOpen(false);
  }, [location.pathname]);

  const Matchroute = (routePath) => {
    if (!routePath) return false;
    return matchPath({ path: routePath }, location.pathname);
  };

  const CatalogLinks = ({ mobile = false }) => (
    <div
      className={
        mobile
          ? "mt-2 flex flex-col rounded-lg bg-zinc-900 p-2 text-sm text-white"
          : "invisible absolute left-1/2 top-full z-50 mt-2 flex w-[220px] -translate-x-1/2 transform flex-col rounded-lg bg-white p-4 text-black opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100"
      }
    >
      {!mobile && (
        <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 transform bg-white"></div>
      )}
      {sublinks.length ? (
        sublinks.map((item) => (
          <Link
            key={item._id}
            to={`/catalog/${item.name}`}
            className={
              mobile
                ? "rounded px-3 py-2 hover:bg-zinc-800"
                : "block rounded px-2 py-1 hover:bg-gray-100"
            }
          >
            {item.name}
          </Link>
        ))
      ) : (
        <div className={mobile ? "px-3 py-2 text-gray-400" : "text-gray-500"}>
          No links available
        </div>
      )}
    </div>
  );

  return (
    <div className="relative flex min-h-16 items-center border-b border-b-zinc-500 px-4">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        <Link to="/signup" className="shrink-0">
          <img src={thumbnail} alt="logo" width={92} height={32} loading="lazy" />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex gap-6">
            {NavbarLinks.map((item, index) => (
              <li key={index}>
                {item.title === "Catalog" ? (
                  <div className="group relative flex items-center gap-2 text-white">
                    {item.title}
                    <IoIosArrowDropdown />
                    <CatalogLinks />
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={clsx(
                      Matchroute(item.path)
                        ? "text-yellow-500"
                        : "text-white hover:text-yellow-200",
                    )}
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-x-3 md:flex">
          {user && user?.accounttype === "user" && (
            <Link to="/dashboard/cart" className="relative text-2xl">
              <CiShoppingCart className="text-white" />
              <span className="absolute -right-2 -top-2 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-bold text-black">
                {cart.length}
              </span>
            </Link>
          )}

          {!token && (
            <Link to="/login">
              <button className="rounded-md border border-zinc-800 bg-zinc-500 px-3 py-2 text-white">
                LOGIN
              </button>
            </Link>
          )}
          {user === null && (
            <Link to="/signup">
              <button className="rounded-md border border-zinc-800 bg-zinc-500 px-3 py-2 text-white">
                SIGN UP
              </button>
            </Link>
          )}
          {token != null && <Profiledown />}
        </div>

        <button
          type="button"
          className="rounded-md border border-zinc-700 p-2 text-white md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute left-0 right-0 top-full z-50 border-b border-zinc-700 bg-zinc-950 px-4 py-4 shadow-2xl md:hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-3">
            {NavbarLinks.map((item, index) =>
              item.title === "Catalog" ? (
                <div key={index}>
                  <button
                    type="button"
                    onClick={() => setCatalogOpen((open) => !open)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-white hover:bg-zinc-900"
                  >
                    <span>Catalog</span>
                    <IoIosArrowDropdown className={catalogOpen ? "rotate-180 transition" : "transition"} />
                  </button>
                  {catalogOpen && <CatalogLinks mobile />}
                </div>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  className={clsx(
                    "rounded-lg px-3 py-2",
                    Matchroute(item.path)
                      ? "text-yellow-500"
                      : "text-white hover:bg-zinc-900",
                  )}
                >
                  {item.title}
                </Link>
              ),
            )}

            <div className="mt-2 flex flex-wrap items-center gap-3 border-t border-zinc-800 pt-4">
              {user && user?.accounttype === "user" && (
                <Link to="/dashboard/cart" className="relative rounded-md border border-zinc-700 p-2 text-2xl">
                  <CiShoppingCart className="text-white" />
                  <span className="absolute -right-2 -top-2 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-bold text-black">
                    {cart.length}
                  </span>
                </Link>
              )}
              {!token && (
                <Link to="/login" className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-semibold text-white">
                  LOGIN
                </Link>
              )}
              {user === null && (
                <Link to="/signup" className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-semibold text-white">
                  SIGN UP
                </Link>
              )}
              {token != null && <Profiledown />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
