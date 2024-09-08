import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function UserList({ onUserSelect }) {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/api/auth/users",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(data.filter((u) => u.email !== user.email)); // Exclude current user
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [user]);

  return (
    <aside className="w-64 bg-gray-100 p-4 border-r overflow-y-auto">
      {users.map((user) => (
        <div
          key={user.email}
          className="flex items-center p-2 hover:bg-gray-200 rounded-md cursor-pointer"
          onClick={() => onUserSelect(user)}
        >
          <div className="flex-1">
            <h3 className="text-sm font-semibold">{user.username}</h3>
            <p className="text-xs text-gray-500">
              {user.online ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      ))}
    </aside>
  );
}
