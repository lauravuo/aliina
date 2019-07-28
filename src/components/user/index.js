import React from 'react';
import PropTypes from 'prop-types';

const User = ({ name, location }) => <p>{`${name}, ${location}`}</p>;

User.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

export default User;
