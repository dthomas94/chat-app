import { StyledStatusIndicator } from "components/StatusIndicator/StatusIndicator.styled";

type StatusIndicatorProps = {
  online?: boolean;
};

export const StatusIndicator = ({ online }: StatusIndicatorProps) => (
  <StyledStatusIndicator className="status-indicator" $online={online} />
);
