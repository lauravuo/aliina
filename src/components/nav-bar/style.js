import styled from 'styled-components';

import { Colors } from '../../style';
import { ReactComponent as Icon } from '../../../assets/aliina.svg';

export const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 1.5rem;
`;

export const Logo = styled(Icon)`
  fill: ${Colors.text};
  height: 20rem;
  width: 20rem;
  margin-right: 1.5rem;
`;

export const Description = styled.p`
  max-width: 80%;
  margin-left: 10%;
  text-align: center;
`;
