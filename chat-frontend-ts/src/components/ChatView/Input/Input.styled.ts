import styled from "styled-components";

import { Button } from "../../Button/Button";

export const StyledForm = styled.form`
  box-shadow: 0 1px 3px 0 rgba(89, 89, 89, 0.23);
  display: flex;
  height: 100px;
  padding: 24px 40px 32px;
`;

export const StyledInput = styled.input`
  border: 1px solid #303030;
  border-radius: 2px;
  width: 100%;
  padding-left: 12px;
`;

export const StyledSubmit = styled(Button)`
  margin-left: 16px;
  height: 44px;
  color: #ffffff;
`;
