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

export default styled(SpinnerSvg)`
  animation: ${rotation} 1s infinite linear;
  path {
    fill: ${Colors.text};
  }
`;
