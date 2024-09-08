import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

export default function Chat() {
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
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-md border p-4 mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="text-sm mb-2">
            {msg}
          </div>
        ))}
      </div>
      <input
        className="border p-2 w-full max-w-md"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type your message..."
      />
      <button className="mt-2 p-2 bg-blue-500 text-white" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}
