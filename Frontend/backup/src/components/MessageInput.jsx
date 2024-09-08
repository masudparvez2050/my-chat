import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

export default function MessageInput() {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, [socket]);

  const sendMessage = () => {
    socket.emit("chat message", message);
    setMessage("");
  };

  return (
    <div className="flex items-center p-4 bg-gray-100 border-t">
      <input
        className="flex-1 px-4 py-2 border rounded-full focus:outline-none"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type your message..."
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}
