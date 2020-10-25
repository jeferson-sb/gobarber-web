import styled from 'styled-components';

import { slideRight } from '../../styles/animations';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    max-width: 50%;
  }
`;

export const AnimatedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: ${slideRight} 1s;

  form {
    margin: 20px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: var(--color-gray-200);
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: filter 0.2s ease;

      &:hover {
        filter: brightness(60%);
      }
    }
  }

  > a {
    color: var(--color-primary);
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      filter: brightness(60%);
    }
  }
`;
