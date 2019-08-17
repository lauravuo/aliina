import styled from 'styled-components';

import { Colors } from '../../style';

export const Button = styled.button`
  background-color: ${Colors.text};
  color: ${Colors.background};
  text-align: center;
  margin-top: 1.5rem;
  padding: 1rem;
  border: none;
  min-width: 10rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
`;