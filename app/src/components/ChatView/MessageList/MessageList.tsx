import { AppContext } from "App/context";
import { ChatViewMessage } from "components/ChatView/Message/Message";
import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { SocketContext } from "socket/context";
import { Message } from "types/Message";

import { StyledMessageList } from "./MessageList.styled";

export const ChatViewMessageList: React.FC = () => {
  const { socket } = useContext(SocketContext);
  const { conversationId, channelName } = useParams<{
    conversationId?: string;
    channelName?: string;
  }>();
  const { messages } = useContext(AppContext);
  let filteredMessages: Message[] = [];

  if (conversationId) {
    filteredMessages = messages.filter(
      (msg) => msg.conversationId === conversationId
    );
  } else if (channelName) {
    filteredMessages = messages.filter(
      (msg) => msg.conversationId === channelName
    );
  }

  useEffect(() => {
    socket?.emit("getMessages", conversationId ?? channelName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelName, conversationId]);

  return (
    <StyledMessageList>
      {filteredMessages?.map((m) => (
        <ChatViewMessage key={m.messageId} {...m} />
      ))}
    </StyledMessageList>
  );
};
