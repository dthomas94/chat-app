import { StyledStatusIndicator } from "./StatusIndicator.styled";

type StatusIndicatorProps = {
  online?: boolean;
};

export const StatusIndicator = ({ online }: StatusIndicatorProps) => (
  <StyledStatusIndicator className="status-indicator" $online={online} />
);
