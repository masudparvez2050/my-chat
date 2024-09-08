import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { SocketContext } from "./SocketContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const userName = Cookies.get("username");
    const userEmail = Cookies.get("useremail");
    const userId = Cookies.get("userid");
    const userStatus = Cookies.get("userstatus");

    if (userName && userEmail && userStatus && userId) {
      setUser({
        id: userId,
        username: userName,
        email: userEmail,
        status: userStatus,
      });
    } else {
      setUser(null);
    }
  }, []);

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (user && token) {
      try {
        await axios.post(
          "http://localhost:3001/api/auth/logout",
          { id: user.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (err) {
        console.error("Failed to update online status:", err);
      }
    }
    console.log("Logout: ", user);
    socket.emit("logout", user.id);
    socket.disconnect();
    setUser(null);
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        users,
        setUsers,
        selectedUser,
        setSelectedUser,
        userData,
        setUserData,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
