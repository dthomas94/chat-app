import CircleIcon from "@mui/icons-material/Circle";
import styled from "styled-components";

export const StyledStatusIndicator = styled(CircleIcon)<{ $online?: boolean }>`
  color: ${(props) => (props.$online ? "#3DAD0E" : "transparent")};
  border: ${(props) =>
    `1px solid ${props.$online ? "transparent" : "#e4e4e4"}`};
`;
