import styled from 'styled-components';

export const ToolTipContainer = styled.div`
  position: relative;

  span {
    width: 160px;
    background: var(--color-primary);
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% - 12px);
    left: 50%;
    transform: translateX(-50%);
    color: var(--color-secondary);

    &:before {
      content: '';
      border-style: solid;
      border-color: var(--color-primary) transparent;
      border-width: 6px 6px 0 6px;
      position: absolute;
      bottom: 20px;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
