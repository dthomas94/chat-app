import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppContext } from "App/context";
import { Button } from "components/Button/Button";
import { ChannelListItem } from "components/ChatSidebar/ChannelListItem/ChannelListItem";
import { StyledChatSidebar } from "components/ChatSidebar/ChatSidebar.styled";
import { ConversationListItem } from "components/ChatSidebar/ConversationListItem/ConversationListItem";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { SocketContext } from "socket/context";
import { useFilteredUsers } from "utils/useFilteredUsers";

type ChatSidebarProps = {
  typingStatus?: { conversationId?: string; senderId?: string };
};

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ typingStatus }) => {
  const { conversations, channels, currentUser } = useContext(AppContext);
  const filteredUsers = useFilteredUsers();
  const history = useHistory();
  const { socket } = useContext(SocketContext);

  return (
    <StyledChatSidebar>
      <Box className="sidebar-section channels">
        <Box
          className="section-header"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h2" textTransform="uppercase">
            Channels
          </Typography>
          <Button
            variant="secondary"
            onClick={() => {
              const channelName = window.prompt("Channel Name");
              socket?.emit("startChannel", {
                channelName: channelName,
                conversationId: channelName,
                creatorUserId: currentUser?.userId,
              });
            }}
          >
            New channel
            <EditIcon />
          </Button>
        </Box>
        <ul>
          {channels.map(({ channelName }) => {
            return (
              <ChannelListItem
                channelName={channelName}
                onClick={() =>
                  socket?.emit("addChannelUser", {
                    channelName: channelName,
                    userId: currentUser?.userId,
                  })
                }
                key={channelName}
              />
            );
          })}
        </ul>
      </Box>
      <Box className="sidebar-section direct-messages">
        <Box
          className="section-header"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h2" textTransform="uppercase">
            Direct Messages
          </Typography>
          <Button variant="secondary" onClick={() => history.push("/")}>
            New message
            <EditIcon />
          </Button>
        </Box>
        <ul>
          {conversations.map((c) => {
            const otherUser = filteredUsers.find((u) =>
              c.userIds.includes(u.userId)
            );
            // null check to appease ts
            if (!otherUser) {
              return null;
            }
            return (
              <ConversationListItem
                typingStatus={typingStatus}
                conversationId={c.conversationId}
                key={c.conversationId}
                {...otherUser}
              />
            );
          })}
        </ul>
      </Box>
    </StyledChatSidebar>
  );
};
