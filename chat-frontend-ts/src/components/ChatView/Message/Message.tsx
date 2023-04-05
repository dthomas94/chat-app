import { format, formatRelative } from "date-fns";
import { useContext } from "react";

import { AppContext } from "../../../App/context";
import { Message } from "../../../types/Message";

import { StyledMessage } from "./Message.styled";

export const ChatViewMessage: React.FC<Message> = (message) => {
  const { users } = useContext(AppContext);
  const sender = users.find((u) => u.userId === message.senderId);
  const relativeDay = formatRelative(new Date(message.createdAt), new Date())
    .split("at")[0]
    .trim();

  return (
    <StyledMessage className="message-container">
      <span className="sender-info">
        <p className="sender-name">{sender?.username}</p>
        <p className="sent-at">
          {format(new Date(message.createdAt), "h:mm a ")} {relativeDay}
        </p>
      </span>
      <p className="message">{message.body}</p>
    </StyledMessage>
  );
};
