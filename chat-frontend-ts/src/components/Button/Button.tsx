import { StyledButton } from "components/Button/Button.styled";
import { PropsWithChildren } from "react";
import { CSSProperties } from "styled-components";

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  style?: CSSProperties;
  variant?: "primary" | "secondary" | "outlined";
};

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  disabled,
  type,
  style,
  children,
  variant = "primary",
}) => (
  <StyledButton
    aria-disabled={disabled}
    style={style}
    type={type}
    onClick={onClick}
    $variant={variant}
  >
    {children}
  </StyledButton>
);
