import styled, { createGlobalStyle } from 'styled-components';

export const Colors = {
  text: 'lightgray',
  background: '#b33c00',
  secondaryBg: 'black',
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
  #app {
    margin: auto;
    max-width: 50rem;
  }
`;

export const SecondaryLabel = styled.p`
  margin: 0;
  max-width: 80%;
  margin-left: 10%;
  color: ${Colors.secondaryBg};
  padding-bottom: 0.5rem;
  text-align: center;
`;
