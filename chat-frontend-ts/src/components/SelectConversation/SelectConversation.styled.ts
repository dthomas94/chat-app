import NativeSelect from "@mui/material/NativeSelect";
import styled from "styled-components";

export const StyledSelect = styled(NativeSelect)`
  border: 1px solid #303030;
  border-radius: 3px;
  color: #686868 !important;
  padding: 5px;
  height: 50px;
  margin-right: 10px;

  &::before {
    border: none !important;
  }
`;
