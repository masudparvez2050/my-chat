const chats = [
  {
    name: "John Doe",
    message: "Hey, how are you?",
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Jane Smith",
    message: "Let’s catch up!",
    avatar: "https://via.placeholder.com/40",
  },
  // Add more chat data here
];

export default function ChatList() {
  return (
    <aside className="w-64 bg-gray-100 p-4 border-r overflow-y-auto">
      {chats.map((chat, index) => (
        <div
          key={index}
          className="flex items-center p-2 hover:bg-gray-200 rounded-md cursor-pointer"
        >
          <img
            src={chat.avatar}
            alt={`${chat.name}'s avatar`}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-4">
            <h3 className="text-sm font-semibold">{chat.name}</h3>
            <p className="text-xs text-gray-500">{chat.message}</p>
          </div>
        </div>
      ))}
    </aside>
  );
}
