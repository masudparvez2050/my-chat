import "./App.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import ChatWindow from "./components/ChatWindow";
import UserList from "./components/UserList";
import Login from "./components/Login";
import Register from "./components/Register";
import { io } from "socket.io-client";

// Initialize Socket.IO connection
const socket = io("http://localhost:3001");

export default function App() {
  const { user, setUser } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (user) {
      // Notify server of user login
      socket.emit("login", user.email);

      // Listen for updated user list from the server
      socket.on("userList", (users) => {
        setOnlineUsers(users);
      });

      // Cleanup on component unmount
      return () => {
        socket.emit("logout", user.email);
        socket.off("userList");
      };
    }
  }, [user]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex h-screen">
      {user ? (
        <>
          <UserList users={onlineUsers} onUserSelect={handleUserSelect} />
          <div className="flex-1 flex flex-col">
            {selectedUser ? (
              <ChatWindow selectedUser={selectedUser} socket={socket} />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">Select a user to start chatting</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <div className="w-full max-w-md">
            <Login />
            <Register />
          </div>
        </div>
      )}
    </div>
  );
}
