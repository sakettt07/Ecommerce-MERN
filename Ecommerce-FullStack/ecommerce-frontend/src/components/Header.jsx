import React from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AllApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

  const handleLogout = async () => {
    try {
      const dataResponse = await fetch(AllApi.logout.url, {
        method: AllApi.logout.method,
        credentials: "include",
      });
      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success("User Logged Out");
        dispatch(setUserDetails(null)); // Clear user data in Redux store
        navigate("/"); // Navigate to the home page or login page if necessary
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } catch (err) {
      toast.error("An error occurred during logout.");
    }
  };

  return (
    <div className="w-full shadow-md flex items-center md:gap-52 gap-16 md:px-9 px-12 p-4 md:p-3 justify-between">
      {/* Logo and Brand Name Section */}
      <div className="flex items-center md:px-6 -md:ml-8">
        <Link to="/">
          <h2 className="md:text-[2vw] text-[23px]">Balaji</h2>
        </Link>
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

      {/* User and Cart Section */}
      <div className="flex items-center gap-4 md:mr-6">
        <div className="hidden md:block">
          {user?.profilePic ? (
            <img
              className="w-10 h-10 object-cover rounded-full"
              src={user?.profilePic}
              alt="User Profile"
            />
          ) : (
            <HiOutlineUserCircle className="text-[27px]" />
          )}
        </div>
        <div>
          {user?._id ? (
            <button onClick={handleLogout} className="p-2 bg-black text-white">
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="p-2 px-3 rounded-md">Login</button>
            </Link>
          )}
        </div>
        <div className="relative">
          <FaShoppingCart className="text-[27px]" />
          <div className="absolute -top-4 -right-2 bg-yellow-300 p-1 rounded-full">
            <p className="text-sm">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
