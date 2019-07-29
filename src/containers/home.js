import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../components/spinner';
import PlaylistsList from '../components/playlistslist';
import { buttonPress } from '../store/actions';

const Home = ({ playlists }) => (
  <div>{playlists ? <PlaylistsList lists={playlists} /> : <Spinner />}</div>
);

Home.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = ({ playlists: { content } }) => ({
  playlists: content
});

const mapDispatchToProps = dispatch => ({
  doButtonPress: () => dispatch(buttonPress())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
