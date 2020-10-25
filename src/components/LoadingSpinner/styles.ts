import styled, { keyframes } from 'styled-components';

const spinnerAnimation1 = keyframes`
  100% {
    transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg);
  }
`;

const spinnerAnimation2 = keyframes`
  100% {
    transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg);
  }
`;

const spinnerAnimation3 = keyframes`
  100% {
    transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg);
  }
`;

export const Spinner = styled.div`
  height: 90px;
  width: 90px;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
`;

export const SpinnerInner = styled.div`
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
`;

export const SpinnerLine = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation-duration: 1s;
  border-left-width: calc(60px / 25);
  border-top-width: calc(60px / 25);
  border-left-color: #ff9000;
  border-left-style: solid;
  border-top-style: solid;
  border-top-color: transparent;

  &:nth-child(1) {
    animation: ${spinnerAnimation1} 1s linear infinite;
    transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
  }

  &:nth-child(2) {
    animation: ${spinnerAnimation2} 1s linear infinite;
    transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
  }

  &:nth-child(3) {
    animation: ${spinnerAnimation3} 1s linear infinite;
    transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg);
  }
`;

export const SpinnerCircle = styled.div`
  display: block;
  position: absolute;
  color: #ff9000;
  font-size: calc(60px * 0.24);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
