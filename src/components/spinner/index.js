import React from 'react';
import styled, { keyframes } from 'styled-components';

import { ReactComponent as SpinnerSvg } from '../../../assets/spinner.svg';

import { Colors } from '../../style';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SpinnerSvgComponent = styled(SpinnerSvg)`
  animation: ${rotation} 1s infinite linear;
  path {
    fill: ${Colors.text};
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default () => (
  <Container>
    <SpinnerSvgComponent />
  </Container>
);
