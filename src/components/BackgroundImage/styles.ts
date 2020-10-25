import styled, { css } from 'styled-components';

type ContainerProps = {
  image: string;
};

export const BackgroundContainer = styled.div<ContainerProps>`
  flex: 1;
  ${props => css`
    background: url(${props.image}) no-repeat center/cover;
  `}
`;
