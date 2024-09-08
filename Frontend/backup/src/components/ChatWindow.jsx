import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

// const messages = [
//   { text: "Hello!", sender: "John Doe", timestamp: "10:00 AM" },
//   { text: "Hi there!", sender: "You", timestamp: "10:01 AM" },
//   // Add more messages here
// ];

export default function ChatWindow() {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  console.log(messages);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, [socket]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
      </div>
      <MessageInput />
    </div>
  );
}
