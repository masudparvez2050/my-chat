import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { AuthContext } from "../context/AuthContext";

export default function ChatHeader() {
  const { users, selectedUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!users || !selectedUser) return;
    const foundUser = users.find((user) => user._id === selectedUser);
    if (foundUser) {
      setName(foundUser.username);
      setEmail(foundUser.email);
    } else {
      console.warn("Selected user not found in users list.");
      setName("");
      setEmail("");
    }
  }, [users, selectedUser]);

  return (
    <header className="flex items-center justify-between p-4 border border-[#94a3b81a]    text-white shadow-md">
      <div className="flex items-center">
        <img
          src={`https://avatar.iran.liara.run/username?username=${name}`}
          alt="User Avatar"
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h1 className="text-lg font-semibold">{name}</h1>
          <h2 className="text-xs text-gray-500">{email}</h2>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-full focus:outline-none bg-gray-900 "
        />
        <button className="rounded-full mr-2 w-10">
          <HiOutlineBellAlert className="h-5 w-5 ml-[-10px] text-2xl" />
        </button>
      </div>
    </header>
  );
}
