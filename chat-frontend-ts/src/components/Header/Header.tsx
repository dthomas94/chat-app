import { AppContext } from "App/context";
import { StyledHeader } from "components/Header/Header.styled";
import { useContext } from "react";

type HeaderProps = {
  handleUsernameClick?: () => void;
};

export const Header: React.FC<HeaderProps> = ({ handleUsernameClick }) => {
  const { currentUser } = useContext(AppContext);

  return (
    <StyledHeader>
      <span className="username" onClick={handleUsernameClick} role="button">
        <p>{currentUser?.username ?? "Pick a username"}</p>
      </span>
    </StyledHeader>
  );
};
