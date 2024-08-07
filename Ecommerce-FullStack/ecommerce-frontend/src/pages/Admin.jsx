import React from "react";
import { useSelector } from "react-redux";
import { HiOutlineUserCircle } from "react-icons/hi";
import {Link, Outlet} from "react-router-dom"

const Admin = () => {
  const user = useSelector((state) => state?.user?.user);
  console.log("userdetails",user);

  return (
    <div className="h-screen w-full flex">
      <aside className="w-full max-w-60 bg-yellow-600 min-h-full">
        <div className="flex-col">
          <div className="p-3">
            <div className="text-3xl cursor-pointer relative flex justify-center">
              {user?.profilePic ? (
                <img
                  className="w-28 h-28 rounded-full object-cover  cursor-pointer"
                  src={user?.profilePic}
                  alt="User Profile"
                />
              ) : (
                <HiOutlineUserCircle className="text-[27px] cursor-pointer" />
              )}
            </div>
          </div>
          <h2 className="text-center text-2xl font-semibold">
            {user?.fullname}
          </h2>
          <p className="text-center">({user?.role})</p>
        </div>
        <div>
          <nav className="grid p-4">
            <Link className="px-16 hover:bg-slate-300 py-2" to="all-users">All Users</Link>
            <Link className="px-16 hover:bg-slate-300 py-2" to="products">Products</Link>
          </nav>
        </div>
      </aside>
      <main>
        <Outlet />
        {/* main */}
      </main>
    </div>
  );
};

export default Admin;
