import React from "react";
// import logo from "../assets/officialLogo.png";
import { CiSearch } from "react-icons/ci";
import { HiMenuAlt3 } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full shadow-md flex items-center md:gap-52 gap-16 md:px-9 px-12 p-4 md:p-3 justify-between">
      {/* Logo and Brand Name Section */}
      <div className="flex items-center md:px-6 -md:ml-8">
        {/* <img className="w-16 md:w-auto" src={logo} alt="Official Logo" /> */}
        <Link to="/"><h2 className="md:text-[2vw] text-[23px] ">Balaji</h2></Link>
      </div>

      {/* Search Box Section */}
      <div className="flex-1 md:block hidden relative">
        <button className="absolute left-2 top-1/2 transform -translate-y-1/2">
          <CiSearch className="w-5 h-5 text-gray-700" />
        </button>
        <input
          className="input rounded-md w-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300"
          placeholder="Search products"
          required
          type="text"
        />
      </div>

      {/* Menu Icon Section */}
      <div className="mr-2 flex items-center md:mr-6">
        <div>
            <HiOutlineUserCircle className="text-[27px]" />
        </div>
        <div>
            <Link to="/login"><button className="p-2 px-3 rounded-md">Login</button></Link>
        </div>
        <div className="relative">
            <span><FaShoppingCart className="text-[27px]" /></span>
            <div className="absolute -top-4 -right-2 bg-yellow-300 p-1 rounded-full">
                <p className="text-sm">0</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
