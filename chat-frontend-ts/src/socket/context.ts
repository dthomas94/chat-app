import { createContext } from "react";
import { Socket } from "socket.io-client";

type SocketContextType = {
  socket?: Socket;
};

export const SocketContext = createContext<SocketContextType>({});
