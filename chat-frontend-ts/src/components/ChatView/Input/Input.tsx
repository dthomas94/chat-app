import { AppContext } from "App/context";
import {
  StyledForm,
  StyledInput,
  StyledSubmit,
} from "components/ChatView/Input/Input.styled";
import { useContext, useState } from "react";
import { useParams } from "react-router";
import { SocketContext } from "socket/context";

export const ChatViewInput: React.FC = () => {
  const { socket } = useContext(SocketContext);
  const { currentUser } = useContext(AppContext);
  const { conversationId, channelName } = useParams<{
    conversationId?: string;
    channelName?: string;
  }>();
  const [message, setMessage] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setMessage(e.target.value);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    socket?.emit("sendMessage", {
      body: message,
      conversationId: conversationId ?? channelName,
      senderId: currentUser?.userId,
    });

    setMessage("");
  };

  const handleTyping = () => {
    socket?.emit("typing", {
      conversationId,
      senderId: currentUser?.userId,
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        aria-label="Your message"
        onKeyPress={handleTyping}
        onChange={handleChange}
        placeholder='Type your message here. Press "Enter" or "Send"'
        value={message}
      />
      <StyledSubmit
        type="submit"
        style={{ margin: "0 0 0 5px" }}
        disabled={!message.length}
      >
        Send
      </StyledSubmit>
    </StyledForm>
  );
};
