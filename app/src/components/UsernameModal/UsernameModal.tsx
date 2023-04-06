import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { AppContext } from "App/context";
import { Button } from "components/Button/Button";
import { StyledUsernameModal } from "components/UsernameModal/UsernameModal.styled";
import { useContext } from "react";
import { useHistory, useLocation } from "react-router";
import { SocketContext } from "socket/context";
import { v4 } from "uuid";

type UsernameModalProps = {
  isOpen?: boolean;
  handleClose: () => void;
};

export const UsernameModal: React.FC<UsernameModalProps> = ({
  isOpen = false,
  handleClose,
}) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const { socket } = useContext(SocketContext);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (currentUser?.userId) {
      setCurrentUser({
        username: e.target.value,
        userId: currentUser.userId,
      });
    } else {
      setCurrentUser({
        username: e.target.value,
        userId: v4(),
      });
    }
    localStorage.setItem("username", e.target.value);
  };

  const handleSubmit = () => {
    history.push(`${pathname}`);
    socket?.emit("username", currentUser);
    handleClose();
  };

  return (
    <StyledUsernameModal
      aria-label="Username input"
      open={isOpen}
      onClose={handleClose}
    >
      <Box className="modal-content">
        <Typography variant="h1" color="#303030">
          Edit your name
        </Typography>
        <Typography sx={{ mt: "8px", mb: "32px" }}>
          Edit how your name displays when others chat with you
        </Typography>
        <Box style={{ marginBottom: 80 }}>
          <label htmlFor="username">Name</label>
          <Input
            aria-label="Edit your name"
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={currentUser?.username || ""}
            placeholder="Enter your name"
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" columnGap="24px">
          <Button
            variant="outlined"
            onClick={handleClose}
            style={{ margin: 0 }}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} style={{ margin: 0 }}>
            Save
          </Button>
        </Box>
      </Box>
    </StyledUsernameModal>
  );
};
