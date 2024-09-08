import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";

const WelcomePage = () => {
  return (
    <div className="w-full max-w-md mx-auto ">
      <div className=" w-80 flex justify-center flex-col items-center">
        <h1 className="text-7xl font-caveat text-center mb-8 font-bold">
          {/* <span className="text-[#4b56f0] text-8xl">My</span>Chat */}
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=" w-[200px] md:w-[250px]"
            src={logo}
            alt=""
          />
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full p-3 mb-6  rounded bg-[#646cff] hover:bg-[#4b56f0] transition-all duration-300 text-center"
        >
          {" "}
          <Link to="/signin">Login</Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full p-3  rounded bg-[#646cff] hover:bg-[#4b56f0] transition-all duration-300 text-center"
        >
          {" "}
          <Link to="/signup">Register</Link>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomePage;
