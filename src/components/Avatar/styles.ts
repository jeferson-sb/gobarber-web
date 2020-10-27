import styled from 'styled-components';

type ImageProps = {
  width?: string;
  height?: string;
};

export const Image = styled.img<ImageProps>`
  width: ${props => (props.width ? props.width : 56)}px;
  height: ${props => (props.height ? props.height : 56)}px;
  border-radius: 50%;
`;
