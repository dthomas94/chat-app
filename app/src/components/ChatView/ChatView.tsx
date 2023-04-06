import { StyledChatView } from "components/ChatView/ChatView.styled";
import { ChatViewHeader } from "components/ChatView/Header/Header";
import { ChatViewInput } from "components/ChatView/Input/Input";
import { ChatViewMessageList } from "components/ChatView/MessageList/MessageList";

export const ChatView: React.FC = () => (
  <StyledChatView>
    <ChatViewHeader />
    <ChatViewMessageList />
    <ChatViewInput />
  </StyledChatView>
);
