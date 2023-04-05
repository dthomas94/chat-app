import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import io, { Socket } from "socket.io-client";
import { v4 } from "uuid";

import { ChatSidebar } from "../components/ChatSidebar/ChatSidebar";
import { ChatView } from "../components/ChatView/ChatView";
import { Header } from "../components/Header/Header";
import { SelectConversation } from "../components/SelectConversation/SelectConversation";
import { UsernameModal } from "../components/UsernameModal/UsernameModal";
import { SocketContext } from "../socket/context";
import { Channel } from "../types/Channel";
import { Conversation } from "../types/Conversation";
import { Message } from "../types/Message";
import { User } from "../types/User";

import { StyledApp } from "./App.styled";
import { AppContext } from "./context";

const socketPort = process.env.SOCKET_PORT || 3001;

export const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | undefined>();
  const [currentUser, setCurrentUser] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [typingStatus, setTypingStatus] = useState(
    {} as { conversationId?: string; senderId?: string }
  );
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);

  useEffect(() => {
    const socketEndpoint = `http://localhost:${socketPort}`;
    let userId = localStorage.getItem("userId");
    let username = localStorage.getItem("username");
    if (!userId || !username) {
      userId = v4();
      username = `user${Date.now()}`;
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
    }

    setCurrentUser({
      userId,
      username,
    });

    setSocket(
      io(socketEndpoint, {
        transports: ["websocket"],
        upgrade: false,
        query: {
          userId,
          username,
        },
      })
    );
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("conversations", (conversations: Conversation[]) =>
        setConversations(conversations)
      );
      socket.on("users", (users: User[]) => setUsers(users));
      socket.on("message", (message: Message) =>
        setMessages((oldMessages) => [...oldMessages, message])
      );
      socket.on("messages", (messages: Message[]) => setMessages(messages));
      socket.on("typingResponse", (data) => {
        setTypingStatus(data);
      });
      socket.on("channels", (channels) => {
        setChannels(channels);
      });
    }

    return () => {
      socket?.off("conversations", () => setConversations([]));
      socket?.off("channels", () => setChannels([]));
      socket?.off("addChannelUser", () => setChannels([]));
      socket?.off("users", () => setUsers([]));
      socket?.off("message", () => setMessages([]));
      socket?.off("messages", () => setMessages([]));
      socket?.off("typingResponse", () => setTypingStatus({}));
    };
  }, [socket]);

  return (
    <StyledApp container columns={12}>
      <AppContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          messages,
          users,
          setUsers,
          conversations,
          channels,
        }}
      >
        <SocketContext.Provider value={{ socket }}>
          <Grid item xs={12}>
            <Header handleUsernameClick={() => setIsUsernameModalOpen(true)} />
          </Grid>

          <Grid display="flex" item xs={12} height="calc(100vh - 80px)">
            <Grid item width="351px">
              <ChatSidebar typingStatus={typingStatus} />
            </Grid>
            <Switch>
              <Route exact path="/">
                <SelectConversation />
              </Route>
              <Route
                path={[
                  "/conversation/:conversationId",
                  "/channel/:channelName",
                ]}
              >
                <Grid item width="100%">
                  <ChatView />
                </Grid>
              </Route>
              <Route>404 not found ☹️</Route>
            </Switch>
          </Grid>
          <UsernameModal
            isOpen={isUsernameModalOpen}
            handleClose={() => setIsUsernameModalOpen(false)}
          />
        </SocketContext.Provider>
      </AppContext.Provider>
    </StyledApp>
  );
};
