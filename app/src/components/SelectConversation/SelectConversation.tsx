import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { AppContext } from "App/context";
import { Button } from "components/Button/Button";
import { StyledSelect } from "components/SelectConversation/SelectConversation.styled";
import { useContext, useState } from "react";
import { SocketContext } from "socket/context";
import { useFilteredUsers } from "utils/useFilteredUsers";

export const SelectConversation: React.FC = () => {
  const { socket } = useContext(SocketContext);
  const { currentUser } = useContext(AppContext);
  const [selectedUser, setSelectedUser] = useState<string | undefined>();
  const users = useFilteredUsers();

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    socket?.emit("startConversation", {
      userId: currentUser?.userId,
      recipientId: selectedUser,
    });
  };

  return (
    <Box style={{ marginLeft: 80, marginRight: 80 }}>
      <Typography variant="h1" marginTop="24px" marginBottom="8px">
        New message
      </Typography>
      <Typography className="p-large" marginBottom="8px">
        Select an existing conversation from the left or select a user here to
        start chatting:
      </Typography>
      <form
        onSubmit={handleFormSubmit}
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        <Box>
          <InputLabel
            style={{ color: "#303030" }}
            variant="standard"
            htmlFor="uncontrolled-native"
          >
            User
          </InputLabel>
          <StyledSelect
            defaultValue={"select-a-user"}
            inputProps={{
              id: "user",
              name: "user",
            }}
            onChange={(e) => setSelectedUser(e.target.value)}
            value={selectedUser}
          >
            <option disabled value="select-a-user">
              Select one
            </option>
            {users.map((u) => (
              <option key={`user-select-option-${u.userId}`} value={u.userId}>
                {u.username}
              </option>
            ))}
          </StyledSelect>
        </Box>
        <Button
          style={{
            letterSpacing: 2,
            width: 193,
          }}
          disabled={!selectedUser}
          type="submit"
        >
          Start conversation{" "}
        </Button>
      </form>
    </Box>
  );
};
