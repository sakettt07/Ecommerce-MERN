import React from "react";
import { useSelector } from "react-redux";
import { HiOutlineUserCircle } from "react-icons/hi";

const Admin = () => {
  const user = useSelector((state) => state?.user?.user);

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
        </div>
      </aside>
      <main>main</main>
    </div>
  );
};

export default Admin;
