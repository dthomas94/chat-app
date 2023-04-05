/* eslint-disable indent */
import styled, { css } from "styled-components";

export const StyledButton = styled.button<{ $variant?: string }>`
  border-radius: 4px;
  border-style: none;

  padding: 16px 24px;
  display: flex;
  column-gap: 3px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  letter-spacing: 0.2em;
  width: fit-content;
  height: fit-content;
  font-family: "Nunito Sans", sans-serif;
  margin: 24px 0;

  ${(props) => {
    switch (props.$variant) {
      case "primary":
        return css`
          background-color: #007d8c;
          border-color: #007d8c;
          color: #ffff;
        `;
      case "secondary":
        return css`
          background-color: #fff;
          border: 1px solid #fff;
          color: #007d8c;
        `;
      case "outlined":
        return css`
          background-color: #fff;
          border: 1px solid #007d8c;
          color: #007d8c;
        `;
      default:
        break;
    }
  }}

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 16px;
  }
`;
