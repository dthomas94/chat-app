import { StyledListItem } from "components/ChatSidebar/ChannelListItem/ChannelListItem.styled";
import { NavLink } from "react-router-dom";

type ChannelListeItemProps = {
  channelName: string;
  onClick?: () => void;
};

export const ChannelListItem: React.FC<ChannelListeItemProps> = ({
  channelName,
  onClick,
}) => {
  return (
    <StyledListItem onClick={onClick}>
      <NavLink
        activeClassName="active"
        className="link"
        isActive={(match) => !!match}
        to={`/channel/${channelName}`}
      >
        <p className="channel-name">{channelName}</p>
      </NavLink>
    </StyledListItem>
  );
};
