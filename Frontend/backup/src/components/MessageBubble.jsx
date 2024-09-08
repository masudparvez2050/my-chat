export default function MessageBubble({ message }) {
  const isSentByUser = message.sender === "You";
  return (
    // <div
    //   className={`flex ${isSentByUser ? "justify-end" : "justify-start"} mb-2`}
    // >
    <div className={`flex justify-end mb-2`}>
      {/* <div
        className={`p-3 rounded-lg max-w-xs text-sm shadow-md ${
          isSentByUser ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      > */}
      <div
        className={`p-3 rounded-lg max-w-xs text-sm shadow-md bg-blue-500 text-white
        }`}
      >
        {/* <p>{message.text}</p> */}
        <p>{message}</p>
        {/* <small className="block mt-1 text-xs text-gray-400">
          {message.timestamp}
        </small> */}
      </div>
    </div>
  );
}
