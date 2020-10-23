import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  hasErrors: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.hasErrors &&
    css`
      border-color: var(--color-red-500);
    `}

  ${props =>
    props.isFocused &&
    css`
      color: var(--color-primary);
      border-color: var(--color-primary);
    `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--color-primary);
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--color-gray-200);

    &:focus {
      outline: 0;
    }

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  margin-left: 16px;
  height: 20px;

  svg {
    margin: 0;
  }

  span {
    background: var(--color-red-500);
    color: var(--color-white);

    &::before {
      border-color: var(--color-red-500) transparent;
    }
  }
`;
