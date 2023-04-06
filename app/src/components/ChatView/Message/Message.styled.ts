import styled from "styled-components";

export const StyledMessage = styled.div`
  margin-left: 40px;

  p {
    margin: 0;
  }

  .sender-info {
    align-items: center;
    display: flex;

    .sender-name {
      font-size: 18px;
      font-family: "Nunito Sans", sans-serif;
      font-weight: 700;
      margin-right: 8px;
      color: #303030;
    }

    .sent-at {
      font-size: 12px;
      font-family: "Nunito Sans", sans-serif;
      color: #e4e4e4;
    }
  }

  .message {
    font-family: "Nunito Sans", sans-serif;
    color: #686868;
  }
`;
