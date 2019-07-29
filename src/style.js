import { createGlobalStyle } from 'styled-components';

export const Colors = {
  text: 'purple',
  background: 'black'
};

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${Colors.background};
    color: ${Colors.text};
    font-family: 'Montserrat', sans-serif;
    margin: 1rem;
  }
  a {
    color: ${Colors.text};
    text-decoration: none;
  }
`;
