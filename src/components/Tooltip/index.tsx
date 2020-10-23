import React from 'react';

import { ToolTipContainer } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ title, children, className }) => (
  <ToolTipContainer className={className}>
    <span>{title}</span>
    {children}
  </ToolTipContainer>
);

export default Tooltip;
