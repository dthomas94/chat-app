import TypingIndicator from "@mui/icons-material/MoreHoriz";
import { StatusIndicator } from "components/StatusIndicator/StatusIndicator";
import { NavLink } from "react-router-dom";
import { User } from "types/User";

import { StyledListItem } from "./ConversationListItem.styled";

type ConversationListItemProps = {
  conversationId: string;
  typingStatus?: { conversationId?: string; senderId?: string };
};

export const ConversationListItem: React.FC<
  User & ConversationListItemProps
> = ({ conversationId, username, socketId, typingStatus }) => {
  return (
    <StyledListItem>
      {typingStatus?.conversationId === conversationId ? (
        <TypingIndicator className="typing-indicator" />
      ) : (
        <StatusIndicator online={!!socketId} />
      )}
      <NavLink
        activeClassName="active"
        className="link"
        isActive={(match) => !!match}
        to={`/conversation/${conversationId}`}
      >
        <p className="username">{username}</p>
      </NavLink>
    </StyledListItem>
  );
};
