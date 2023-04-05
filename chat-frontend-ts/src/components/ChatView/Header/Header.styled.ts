import styled from "@emotion/styled";

export const StyledHeader = styled.div`
  border-bottom: 1px solid #e4e4e4;
  padding: 32px 0 24px 40px;

  p {
    margin: 0;
  }

  .username {
    font-family: "Nunito Sans", sans-serif;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 0.13px;
    font-weight: 700;
  }

  .status {
    display: flex;
    align-items: center;
    font-family: "Nunito Sans", sans-serif;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: 0.15px;
  }
`;
