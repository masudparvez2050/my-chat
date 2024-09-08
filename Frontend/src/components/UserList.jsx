import { useEffect, useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { CiLogout } from "react-icons/ci";
import Cookies from "js-cookie";
import { clearSessionCookie } from "../utils/Session";

export default function UserList({ onUserSelect }) {
  const { user, users, setUsers, logout, selectedUser, setSelectedUser } =
    useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/api/auth/users",
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setUsers(data.filter((u) => u.email !== user.email));
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [user, setUsers]);

  const handleUserClick = (user) => {
    onUserSelect(user);
    setSelectedUser(user._id);
  };

  //logout function
  const handleLogout = async () => {
    logout();
    clearSessionCookie();
  };

  return (
    <aside className="w-64  px-2 py-4 border-[#94a3b81a]  border-r-[0.5px]  flex flex-col justify-between h-screen overflow-hidden bg-[#1a1a1a] bg-opacity-60 backdrop-filter ">
      <div className=" overflow-y-auto mb-2">
        {users.map((user) => (
          <div
            key={user.email}
            className={`flex items-center hover:border hover:border-[#646cff] bg-[#383838] mb-2 p-2 hover:bg-[#0e0d0d] rounded-md cursor-pointer transition-all duration-300 ${
              selectedUser === user._id
                ? "border-[#646cff] border bg-[#0e0d0d]"
                : ""
            }`}
            onClick={() => handleUserClick(user)}
          >
            <div className="flex-1 flex items-center">
              <img
                src={`https://avatar.iran.liara.run/username?username=${user.username}`}
                alt="User Avatar"
                className="mr-2 w-10 h-10 rounded-full"
              />
              <div className="">
                <h3 className="text-sm font-semibold">{user.username}</h3>
                <div className="flex justify-start items-center">
                  {user.online ? (
                    <div className="ml-[-4px] bg-lime-500 rounded-full w-1 scale-50 p-2"></div>
                  ) : (
                    <div className="ml-[-4px] bg-red-500 rounded-full w-[1px] scale-50 p-2"></div>
                  )}{" "}
                  <p className=" ml-[-4px] text-xs scale-90  text-gray-500">
                    {user.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="">
        <div className="flex items-center mb-4">
          <img
            src={`https://avatar.iran.liara.run/username?username=${user.username}`}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <h1 className="text-lg font-semibold">{user.username}</h1>
            <h2 className="text-xs text-gray-500">{user.email}</h2>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center hover:border hover:border-[#646cff] bg-[#1a1a1a]  p-2 hover:bg-[#0e0d0d] rounded-md cursor-pointer w-full"
        >
          <CiLogout className=" mr-3 ml-2" />
          <span className="mt-[-2px]">Log out</span>
        </button>
      </div>
    </aside>
  );
}
