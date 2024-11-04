import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { ApiUrl } from "../utils/url";

export default function ChatWindow() {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const { user, selectedUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${ApiUrl}/api/chat/messages/${user.id}/${selectedUser}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    fetchMessages();
  }, [user.id, selectedUser]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, [socket]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#1a1a1a] bg-opacity-60 backdrop-filter">
      <ChatHeader />
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <MessageBubble key={index} msg={msg} />
        ))}
      </div>{" "}
      <MessageInput />
    </div>
  );
}
