import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ title, children, className }) => (
  <Container className={className}>
    <span>{title}</span>
    {children}
  </Container>
);

export default Tooltip;
