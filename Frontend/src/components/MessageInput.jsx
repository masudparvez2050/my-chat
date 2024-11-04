import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { LuMic } from "react-icons/lu";
import { CiImageOn } from "react-icons/ci";
import { IoMdAttach } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { ApiUrl } from "../utils/url";

export default function MessageInput() {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user, selectedUser } = useContext(AuthContext);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, [socket]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await axios.post(
        ` ${ApiUrl}/api/chat/message`,
        {
          senderId: user.id,
          receiverId: selectedUser,
          text: message,
          user: user.username,
          email: user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      const msg = {
        id: user.id,
        senderId: user.id,
        receiverId: selectedUser,
        text: message,
        user: user?.username || "Anonymous",
        email: user?.email || "unknown@email.com",
        timestamp: new Date().toLocaleTimeString(),
      };
      socket.emit("chat message", msg);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex border-t-[#94a3b81a] border-t items-center p-4   ">
      <button className="  rounded-full mr-2 w-10   ">
        <LuMic className=" h-5 w-5 ml-[-10px] " />
      </button>
      <button className=" rounded-full mr-2 w-10 ">
        <CiImageOn className=" h-5 w-5 ml-[-10px] " />
      </button>
      <button className="rounded-full mr-2 w-10 ">
        <IoMdAttach className=" h-5 w-5 ml-[-10px] " />
      </button>
      <input
        className="flex-1 px-4 py-2 rounded-full focus:outline-none bg-gray-900 "
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type your message..."
      />
      <button className="ml-2 px-4 py-2  rounded-full" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}
