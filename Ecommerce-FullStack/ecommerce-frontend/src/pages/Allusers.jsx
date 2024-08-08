import React, { useEffect, useState } from "react";
import AllApi from "../common";

const Allusers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const fetchAllUsers = async () => {
    const fetchData = await fetch(AllApi.allusers.url, {
      method: AllApi.allusers.method,
      credentials: "include",
    });
    // data ko json m convert kardia
    const dataResponse = await fetchData.json();
    setAllUsers(dataResponse.data);
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <div class=" w-full h-screen p-7">
        <div class="flex items-center justify-between pb-6">
          <div>
            <h2 class="font-semibold text-gray-700 text-[2vw]">All Users</h2>
            <span class="text-xs text-gray-500">
              View accounts of registered users
            </span>
          </div>
        </div>
        <div class="w-full rounded-lg border">
          <div class="w-full">
            <table class="w-full">
              <thead className="w-full">
                <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th class="px-5 py-3">ID</th>
                  <th class="px-5 py-3">Full Name</th>
                  <th class="px-5 py-3">User Role</th>
                  <th class="px-5 py-3">Created at</th>
                </tr>
              </thead>
              <tbody class="text-gray-500 w-full">
                {allUsers.map((item,index)=>(
                  <tr>
                  <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p class="whitespace-no-wrap">{item._id}</p>
                  </td>
                  <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <div class="flex items-center">
                      <div class="ml-3">
                        <p class="whitespace-no-wrap">{item.fullname}</p>
                      </div>
                    </div>
                  </td>
                  <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p class="whitespace-no-wrap">{item.role}</p>
                  </td>
                  <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p class="whitespace-no-wrap">{item.createdAt}</p>
                  </td>
                </tr>
                ))}
                
              </tbody>
            </table>
          </div>
          <div class="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
            <span class="text-xs text-gray-600 sm:text-sm">
              {" "}
              Showing 1 to 5 of 12 Entries{" "}
            </span>
            <div class="mt-2 inline-flex sm:mt-0">
              <button class="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                Prev
              </button>
              <button class="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allusers;
