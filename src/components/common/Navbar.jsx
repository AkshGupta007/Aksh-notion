import React from 'react'

import { Link, matchPath} from 'react-router';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { CiShoppingCart } from "react-icons/ci";
import { useState,  useEffect } from 'react';
import clsx from 'clsx';
import { apiconnector } from '../../Services/apiconnector';
import { CATEGORIES_API} from '../../Services/apis';
import Profiledown from '../core/homepage/Profiledown';
import { IoIosArrowDropdown } from "react-icons/io";
import thumbnail from "../../assests/png logo.png"

const Navbar = () => {
    const token=useSelector((state)=>state.auth.token);

    const{cart}=useSelector((state)=>state.cart);
    console.log("Token from Redux:", token);

    const{user}=useSelector((state)=>state.profile);
     console.log("User object:", JSON.stringify(user, null, 2));

    //  console.log("User object:", JSON.stringify(user.additionaldetails, null, 2));


    const[sublinks,setsublinks]=useState([]);


    const fetchdata=async()=>{
        try{
            const result= await apiconnector("GET",CATEGORIES_API);
                
            setsublinks(result.data.data);
            console.log("printing", result.data.data);

        

        }
        catch(error){ 
            console.log("error"+ error);

        }

    }
    useEffect(()=>{
        fetchdata();
    },[])


    const NavbarLinks = [
      { title: "Home", path: "/" },
      { title: "Catalog" }, // path: '/catalog'
      { title: "About Us", path: "/about" },
      { title: "Contact Us", path: "/contact" },
    ];

   const Matchroute = (routePath) => {
     const location = useLocation();
     if (!routePath) return false; // prevent crash
     return matchPath({ path: routePath }, location.pathname);
   };
  return (
    <div className=" flex items-center border-b-[1px] border-b-zinc-500 px-4 ">
      <div className="flex w-11/12 items-center justify-between">
        <Link to="/signup">
          <img src={thumbnail} alt="logo" width={100} height={32} loading="lazy" className='' />
        </Link>

        {/* van links */}

        <nav>
          <ul className="flex gap-6">
            {NavbarLinks.map((item, index) => (
              <li key={index}>
                {item.title === "Catalog" ? (
                  <div
                    className={clsx(
                      "relative group flex gap-2 items-center ",
                      Matchroute(item.path) ? "text-yellow-500" : "text-white",
                    )}
                  >
                    {item.title}
                    <IoIosArrowDropdown />

                    <div
                      className="absolute flex flex-col bg-white lg:w-[200px] 
             top-full left-1/2 transform -translate-x-1/2 mt-2
             p-4 text-black invisible opacity-0 
             transition-all duration-200 z-50
             group-hover:opacity-100 group-hover:visible"
                    >
                      {/* little arrow */}
                      <div className="absolute bg-white rotate-45 h-4 w-4 -top-2 left-1/2 transform -translate-x-1/2"></div>

                      {sublinks.length ? (
                        sublinks.map((item) => (
                          <div key={item._id} className="py-1">
                            <Link
                              to={`/catalog/${item.name}`}
                              className="block px-2 py-1 hover:bg-gray-100 rounded"
                            >
                              {item.name}
                            </Link>
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-500">No links available</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={item.path}>
                    <div ///use of clsx node package
                      className={clsx(
                        Matchroute(item.path)
                          ? "text-yellow-500"
                          : "text-white",
                      )}
                    >
                      {item.title}
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* login/sign/ button */}
        <div className="flex gap-x-4 items-center ">
          {user && user?.accounttype === "user" && (
            <Link to="/dashboard/cart" className="relative mt-6 ml-2 mr-3 mb-2 text-2xl">
              <CiShoppingCart className="text-white" />
              {cart.length >= 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-100 text-black text-xs font-bold rounded-full px-2 py-0.5">
                  {cart.length}
                </span>
              )}
            </Link>
          )}

          {!token && (
            <Link to="/login">
              <button className="border border-zinc-800 bg-zinc-500 px-[12px] py-[8px] rounded-md text-white ">
                LOGIN
              </button>
            </Link>
          )}
          {user === null && (
            <Link to="/signup">
              <button className="border border-zinc-800 bg-zinc-500 px-[12px] py-[8px] rounded-md text-white">
                {" "}
                SIGN UP
              </button>
            </Link>
          )}
          {token != null && <Profiledown />}
        </div>
      </div>
    </div>
  );
}

export default Navbar
