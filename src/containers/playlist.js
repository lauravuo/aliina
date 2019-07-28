import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Tracks from '../components/tracks';
import { fetchPlaylistTracks, createNewPlaylist } from '../store/actions';

// match.params.id
const Playlist = ({
  playlist,
  match,
  doFetchPlaylistTracks,
  doCreateNewPlaylist
}) => {
  useEffect(() => {
    if (!playlist) {
      doFetchPlaylistTracks(match.params.id);
    }
  });
  console.log(playlist);
  return (
    <div>
      {playlist && (
        <Tracks tracks={playlist} onCreatePressed={doCreateNewPlaylist} />
      )}
    </div>
  );
};

Playlist.propTypes = {};

const mapStateToProps = ({ newPlaylist }) => ({
  playlist: newPlaylist
});

const mapDispatchToProps = dispatch => ({
  doFetchPlaylistTracks: id => dispatch(fetchPlaylistTracks(id)),
  doCreateNewPlaylist: () => dispatch(createNewPlaylist())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);
