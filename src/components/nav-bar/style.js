// <div>Icons made by <a href="https://www.flaticon.com/authors/mynamepong" title="mynamepong">mynamepong</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

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
  text-align: center;
`;
