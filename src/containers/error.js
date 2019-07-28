import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Error = ({ error }) => (
  <div>
    {error && (
      <p>{`${error.description} ${error.reason ? `(${error.reason})` : ''}`}</p>
    )}
  </div>
);

Error.propTypes = {
  error: PropTypes.object
};

Error.defaultProps = {
  error: null
};

const mapStateToProps = ({ error }) => ({
  error
});

export default connect(mapStateToProps)(Error);
