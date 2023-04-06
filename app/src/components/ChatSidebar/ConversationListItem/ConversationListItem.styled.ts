import Box from "@mui/material/Box";
import styled from "styled-components";

export const StyledListItem = styled(Box)`
  display: flex;
  flex-grow: 1;
  position: relative;
  height: 58px;
  align-items: center;
  justify-content: flex-start;

  .status-indicator,
  .typing-indicator {
    position: absolute;
    left: 40px;
  }

  .typing-indicator {
    color: white;
  }

  .link {
    border-left: 4px solid transparent;
    color: #ffffff;
    align-items: center;
    display: flex;
    height: 100%;
    text-decoration: none;
    width: 100%;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .username {
      margin: 0 0 0 72px;
      text-decoration: none;
      font-family: "Nunito Sans", sans-serif;
      font-weight: 700;
    }

    &.active {
      background-color: rgba(255, 255, 255, 0.15);
      border-left-color: #ffffff;
    }
  }
`;
