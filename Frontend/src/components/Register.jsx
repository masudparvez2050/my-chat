import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ApiUrl } from "../utils/url";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(` ${ApiUrl}/api/auth/register`, {
        username,
        email,
        password,
      });
      // Redirect to login or show a success message
      navigate("/signin");
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
        onSubmit={handleRegister}
        className="bg-[#1f1e1e] p-8 rounded-md shadow-xl  drop-shadow-md bg-opacity-30 backdrop-filter backdrop-blur-xl overflow-hidden mx-4 md:mx-0 "
      >
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4  rounded focus:outline-none  bg-gray-900 bg-opacity-50"
        />
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
          Register
        </button>
        <div className=" mt-6 text-xs text-gray-300">
          <Link to="/signin" className=" decoration-none">
            Do you have an account?{" "}
            <span className="text-[#6b73e9]">Login Now.</span>
          </Link>
        </div>
      </form>
    </motion.div>
  );
}
