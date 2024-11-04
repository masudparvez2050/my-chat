import { createContext } from "react";
import { io } from "socket.io-client";
import { ApiUrl } from "../utils/url";

const socket = io(ApiUrl);
export const SocketContext = createContext(socket);
