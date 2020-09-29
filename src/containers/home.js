import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../components/spinner';
import PlaylistsList from '../components/playlistslist';

const Home = ({ playlists, loggedIn }) => (
  <div>
    {loggedIn ? (
      <div>{playlists ? <PlaylistsList lists={playlists} /> : <Spinner />}</div>
    ) : (
      <Spinner />
    )}
  </div>
);

Home.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ playlists: { content }, user }) => ({
  playlists: content,
  loggedIn: user.token && user.token.length > 0,
});

export default connect(mapStateToProps)(Home);
