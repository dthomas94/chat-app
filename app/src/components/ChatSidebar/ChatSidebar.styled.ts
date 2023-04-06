import Box from "@mui/material/Box";
import styled from "styled-components";

export const StyledChatSidebar = styled(Box)`
  background-color: #063347;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: scroll;
  padding-top: 24px;
  width: 351px;

  .sidebar-section {
    display: flex;
    flex-direction: column;
    margin-bottom: 48px;

    .section-header {
      margin: 0 0 40px 80px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;

    li {
      margin-bottom: 40px;
    }
  }
`;
