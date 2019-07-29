// <div>Icons made by <a href="https://www.flaticon.com/authors/mynamepong" title="mynamepong">mynamepong</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

import styled from 'styled-components';

import { Colors } from '../../style';
import { ReactComponent as Icon } from '../../../assets/turntable.svg';

export const Container = styled.div`
  align-items: center;
  display: flex;
`;

export const Logo = styled(Icon)`
  fill: ${Colors.text};
  height: 3rem;
  width: 3rem;
  margin-right: 0.8rem;
`;