import "./App.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import ChatWindow from "./components/ChatWindow";
import UserList from "./components/UserList";
import Login from "./components/Login";
import Register from "./components/Register";
import { io } from "socket.io-client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import FloatingShape1 from "./components/FloatingShape1";

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
    <div
      className="flex h-screen justify-center items-center bg-gradient-to-br
    from-gray-900 via-indigo-900 to-purple-900  relative overflow-hidden"
    >
      <FloatingShape1
        color="bg-blue-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape1
        color="bg-sky-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape1
        color="bg-cyan-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />
      {user !== null ? (
        <>
          <UserList users={onlineUsers} onUserSelect={handleUserSelect} />
          <div className="flex-1 flex flex-col h-screen">
            {selectedUser ? (
              <ChatWindow selectedUser={selectedUser} socket={socket} />
            ) : (
              <div className="flex-1 flex items-center justify-center bg-[#1a1a1a] bg-opacity-60 backdrop-filter">
                <p className="text-gray-500">Select a user to start chatting</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <div className="w-full max-w-md">
            <Router>
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Router>
          </div>
        </div>
      )}
    </div>
  );
}
