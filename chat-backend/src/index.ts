import { config } from "dotenv";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { v4 } from "uuid";
import { Channel, Conversation, Message, User } from "./types";

config();

// store everything in memory
const conversations: Conversation[] = [];
const messages: Message[] = [];
const users: User[] = [];
const channels: Channel[] = [];

const httpServer = createServer();
const io = new Server(httpServer, {
  serveClient: false,
});

/**
TODO
- store a state of typing 
*/

io.on("connection", (socket: Socket) => {
  console.log(`Socket connected [socket.id]: ${socket.id}`);
  const { userId, username } = (socket.handshake.query as unknown) as {
    userId: string;
    username: string;
  };
  const userIndex = users.findIndex((u) => u.userId === userId);
  // update socket id if this client has connected previously
  if (userIndex > -1) {
    users[userIndex] = {
      ...users[userIndex],
      socketId: socket.id,
    };
  } else {
    users.push({ socketId: socket.id, userId, username });
  }

  // send most up to date array of users bc new client connected
  io.sockets.emit("users", users);
  io.sockets.emit("channels", channels);

  // send conversations, if any, to newly connected user
  socket.emit(
    "conversations",
    conversations.filter((c) => c.userIds.includes(userId))
  );

  let timer: NodeJS.Timeout;
  socket.on("typing", (data) => {
    clearTimeout(timer);
    // send messager to recipient, if possible
    const conversation = conversations.find(
      (c) => c.conversationId === data.conversationId
    );
    const recipient = users.find(
      (u) => conversation?.userIds.includes(u.userId) && u.userId !== userId
    );
    if (recipient?.socketId) {
      io.to(recipient.socketId).emit("typingResponse", data);
    }

    timer = setTimeout(() => {
      if (recipient?.socketId) {
        io.to(recipient.socketId).emit("typingResponse", {});
      }
    }, 1000);
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected [socket.id]: ${socket.id}`);
    // set socketId to undefined so clients know the user is disconnected
    const userIndex = users.findIndex((u) => u.socketId === socket.id);
    users[userIndex] = {
      socketId: undefined,
      userId,
      username,
    };
    // emit up-to-date users array
    io.sockets.emit("users", users);
  });

  socket.on("username", ({ userId, username }) => {
    const userIndex = users.findIndex((u) => u.socketId === socket.id);
    users[userIndex] = {
      socketId: socket.id,
      userId,
      username,
    };

    // emit changed username
    io.sockets.emit("users", users);
  });

  socket.on("startChannel", ({ channelName, creatorUserId }) => {
    const channelExists = channels.find((ch) => ch === channelName);

    if (!channelExists) {
      const channel: Channel = {
        channelName,
        conversationId: channelName,
        userIds: [creatorUserId],
      };

      channels.push(channel);
      socket.join(channelName);

      io.sockets.emit("channels", channels);
    }
  });

  socket.on("addChannelUser", ({ channelName, userId }) => {
    socket.join(channelName);

    const channel = channels.find((ch) => ch.channelName === channelName);
    if (!channel?.userIds.includes(userId)) {
      channel?.userIds.push(userId);

      //Emit to the client that made the new channel, to change their channel to the one they made.
      io.sockets.emit("channels", channels);
    }
    io.sockets.emit("conversations", conversations);
  });

  socket.on("startConversation", ({ userId, recipientId }) => {
    const conversation: Conversation = {
      conversationId: v4(),
      userIds: [userId, recipientId],
    };

    const convoExists = conversations.filter(
      (convo) =>
        convo.userIds.includes(userId) &&
        conversation.userIds.includes(recipientId)
    ).length;

    if (!convoExists) {
      conversations.push(conversation);

      // let both clients know theyre part of a conversation
      const userConversations = conversations.filter((c) =>
        c.userIds.includes(userId)
      );
      socket.emit("conversations", userConversations);

      const recipient = users.find((u) => u.userId === recipientId);
      if (recipient && recipient.socketId) {
        const recipientConversations = conversations.filter((c) =>
          c.userIds.includes(recipientId)
        );
        io.to(recipient.socketId).emit("conversations", recipientConversations);
      }
    }
  });

  socket.on("getConversations", ({ userId }) => {
    socket.emit(
      "conversations",
      conversations.filter((c) => c.userIds.includes(userId))
    );
  });

  socket.on("getMessages", (conversationId) => {
    socket.emit(
      "messages",
      messages.filter((m) => m.conversationId === conversationId)
    );
  });

  socket.on("sendMessage", (newMessage: Message, channelName?: string) => {
    const message = { ...newMessage, createdAt: new Date(), messageId: v4() };

    messages.push(message);

    // send messager to recipient, if possible
    const conversation = conversations.find(
      (c) => c.conversationId === message.conversationId
    );
    const channel = channels.find(
      (ch) => ch.conversationId === message.conversationId
    );

    if (conversation) {
      socket.emit("message", message);
      const recipient = users.find(
        (u) => conversation.userIds.includes(u.userId) && u.userId !== userId
      );
      if (recipient?.socketId) {
        io.to(recipient.socketId).emit("message", message);
      }
    } else if (channel) {
      io.to(channel.channelName).emit("message", message);
    }
  });

  io.of("/").adapter.on("create-room", (room) => {
    console.log(`room ${room} was created`);
  });

  io.of("/").adapter.on("join-room", (room, id) => {
    console.log(`socket ${id} has joined room ${room}`);
  });
});

const port = process.env.PORT || 3001;
httpServer.listen(port);
console.log(`Socket server listening on: ${port}`);
