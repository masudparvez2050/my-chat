export default function ChatHeader() {
  return (
    <header className="flex items-center justify-between p-4 bg-blue-600 text-white shadow-md">
      <h1 className="text-lg font-semibold">ChatApp</h1>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-full text-black"
        />
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
}
