/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function MessageBubble({ msg }) {
  const { user } = useContext(AuthContext);
  const isSentByUser = msg.email === user.email;

  function convertUTCToLocalTime(utcTime) {
    const date = new Date(utcTime);
    const localTime = date.toLocaleTimeString("en-US", { hour12: true });

    return localTime;
  }
  return (
    <div
      className={`flex  ${isSentByUser ? "justify-end" : "justify-start"} mb-2`}
    >
      <div className="">
        <p className=" text-[11px] mb-[2px] ml-1 text-gray-500">{msg.user}</p>
        {/* <div className=" justify-end bg-red-500 w-[10px] mb-[-15px] rotate-45">
          ...{" "}
        </div> */}
        <div
          className={`p-2 pb-1 rounded-lg text  overflow-hidden text-sm shadow-md ${
            isSentByUser ? "bg-[#4b56f0] text-white" : " bg-[#414141]"
          }`}
        >
          <p>{msg.text}</p>
          <div className={`flex ${isSentByUser ? "" : "justify-end"} `}>
            {isSentByUser ? (
              <>
                <small className=" mt-[2px] text-[11px] text-gray-400 mr-4 ">
                  {msg.timestamp}
                </small>
                <small className=" mt-[2px] text-[11px] text-gray-400 mr-4 ">
                  {convertUTCToLocalTime(msg.createdAt) === "Invalid Date"
                    ? ""
                    : convertUTCToLocalTime(msg.createdAt)}
                </small>
              </>
            ) : (
              <>
                <small className=" mt-[2px] text-[11px] text-gray-400">
                  {msg.timestamp}
                </small>
                <small className=" mt-[2px] text-[11px] text-gray-400">
                  {convertUTCToLocalTime(msg.createdAt) === "Invalid Date"
                    ? ""
                    : convertUTCToLocalTime(msg.createdAt)}
                </small>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
