import styled from 'styled-components';

export const Container = styled.button`
  background-color: ${props => (props.pressed ? 'purple' : 'blueviolet')};
  width: 20rem;
  height: 5rem;
`;
