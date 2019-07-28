import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../components/button';
import PlaylistsList from '../components/playlistslist';
import { buttonPress } from '../store/actions';

const Home = ({ playlists, doButtonPress }) => (
  <div>
    {playlists && <PlaylistsList lists={playlists} />}
  </div>
);

Home.propTypes = {
  buttonIsPressed: PropTypes.bool.isRequired,
  doButtonPress: PropTypes.func.isRequired
};

const mapStateToProps = ({ playlists }) => ({
  playlists
});

const mapDispatchToProps = dispatch => ({
  doButtonPress: () => dispatch(buttonPress())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
