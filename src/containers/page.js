import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import User from '../components/user';

const Page = ({ user }) => (
  <div>{user && <User name={user.name} location={user.location} />}</div>
);

Page.propTypes = {
  user: PropTypes.object
};

Page.defaultProps = {
  user: null
};

const mapStateWithProps = ({ user }) => ({
  user
});

export default connect(mapStateWithProps)(Page);
