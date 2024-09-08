import { motion } from "framer-motion";

import shape1 from "../assets/1.png";
import shape2 from "../assets/2.png";
import shape3 from "../assets/3.png";
import shape4 from "../assets/4.png";

const FloatingShape2 = ({ color, size, top, left, delay }) => {
  return (
    <>
      <motion.div
        className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
        style={{ top, left }}
        animate={{
          y: ["0%", "100%", "0%"],
          x: ["0%", "100%", "0%"],
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          delay,
        }}
        aria-hidden="true"
      />
      {/* <motion.img
        src={shape2}
        alt="shape"
        className={`absolute  ${color} ${size} opacity-50 blur-md`}
        style={{ top, left }}
        animate={{
          y: ["0%", "100%", "0%"],
          x: ["0%", "100%", "0%"],
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          delay,
        }}
        aria-hidden="true"
      /> */}
    </>
  );
};
export default FloatingShape2;
