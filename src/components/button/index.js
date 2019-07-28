import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './style';
import Icon from '../../../assets/baseline-fingerprint-24px.svg';

const Button = ({ pressed, onPress }) => (
  <Container type="button" onClick={onPress} pressed={pressed}>
    <img src={Icon} alt="Button icon" />
  </Container>
);

Button.propTypes = {
  pressed: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};

export default Button;
