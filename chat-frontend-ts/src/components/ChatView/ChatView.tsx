import { StyledChatView } from "./ChatView.styled";
import { ChatViewHeader } from "./Header/Header";
import { ChatViewInput } from "./Input/Input";
import { ChatViewMessageList } from "./MessageList/MessageList";

export const ChatView: React.FC = () => (
  <StyledChatView>
    <ChatViewHeader />
    <ChatViewMessageList />
    <ChatViewInput />
  </StyledChatView>
);
