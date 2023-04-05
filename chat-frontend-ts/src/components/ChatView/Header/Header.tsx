import { useContext } from "react";
import { useParams } from "react-router";

import { AppContext } from "../../../App/context";
import { User } from "../../../types/User";
import { useFilteredUsers } from "../../../utils/useFilteredUsers";
import { StatusIndicator } from "../../StatusIndicator/StatusIndicator";

import { StyledHeader } from "./Header.styled";

export const ConversationHeader = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const { conversations } = useContext(AppContext);
  const conversation = conversations.find(
    (c) => c.conversationId === conversationId
  );
  const filteredUsers = useFilteredUsers();

  if (!conversation) {
    return (
      <div>
        <p>
          uh oh, we couldn&apost find a conversation with id: {conversationId}
        </p>
      </div>
    );
  }

  const viewedUser = filteredUsers.find((u) =>
    conversation.userIds.includes(u.userId)
  );

  if (!viewedUser) {
    return (
      <div>
        <p>uh oh, we could not find another user for this conversation</p>
      </div>
    );
  }

  return (
    <StyledHeader>
      <p className="username">{viewedUser.username}</p>
      <div className="status">
        <StatusIndicator online={!!viewedUser.socketId} />
        <p style={{ color: viewedUser.socketId ? "#3DAD0E" : "#686868" }}>
          {viewedUser.socketId ? "Online" : "Offline"}
        </p>
      </div>
    </StyledHeader>
  );
};

export const ChannelHeader = ({ channelName }: { channelName: string }) => {
  const channelUsers = [] as User[];

  return (
    <StyledHeader>
      <p className="username">{channelName}</p>
      {channelUsers?.map((viewedUser) => (
        <div className="status" key={viewedUser?.userId}>
          <StatusIndicator online={!!viewedUser?.socketId} />
          <p style={{ color: "#686868" }}>{viewedUser.username}</p>
        </div>
      ))}
    </StyledHeader>
  );
};

export const ChatViewHeader: React.FC = () => {
  const { conversationId, channelName } = useParams<{
    conversationId: string;
    channelName: string;
  }>();

  return conversationId ? (
    <ConversationHeader conversationId={conversationId} />
  ) : (
    <ChannelHeader channelName={channelName} />
  );
};
