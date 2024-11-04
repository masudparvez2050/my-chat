import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  setSessionCookie,
  setSessionCookieUserEmail,
  setSessionCookieUserId,
  setSessionCookieUserName,
  setSessionCookieUserStatus,
} from "../utils/Session";
import { SocketContext } from "../context/SocketContext";
import { motion } from "framer-motion";
import { ApiUrl } from "../utils/url";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setUserData } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${ApiUrl}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));

      setSessionCookie(data.token);
      setSessionCookieUserName(data.user.username);
      setSessionCookieUserEmail(data.user.email);
      setSessionCookieUserId(data.user.id);
      setSessionCookieUserStatus(data.user.status);

      setUser(data.user);
      setUserData(JSON.parse(localStorage.getItem("userData")));

      socket.emit("login", data.user.id);
      // Redirect to home or show a success message
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto "
    >
      <form
        onSubmit={handleLogin}
        className="bg-[#1f1e1e] p-8 rounded-md shadow-xl   drop-shadow-md bg-opacity-30 backdrop-filter backdrop-blur-xl overflow-hidden mx-4 md:mx-0 "
      >
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4  rounded focus:outline-none  bg-gray-900 bg-opacity-50"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4  rounded focus:outline-none  bg-gray-900 bg-opacity-50"
        />
        <button
          type="submit"
          className="w-full p-2  rounded bg-[#646cff] hover:bg-[#4b56f0] transition-all duration-300"
        >
          Login
        </button>
        <div className=" mt-6 text-xs text-gray-300">
          <Link to="/signup" className=" decoration-none">
            Don&apos;t have an account?{" "}
            <span className="text-[#6b73e9]">Register Now.</span>
          </Link>
        </div>
      </form>
    </motion.div>
  );
}
