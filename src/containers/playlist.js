import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../components/spinner';
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
  return (
    <div>
      {playlist ? (
        <Tracks tracks={playlist} onCreatePressed={doCreateNewPlaylist} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

Playlist.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  doFetchPlaylistTracks: PropTypes.func.isRequired,
  doCreateNewPlaylist: PropTypes.func.isRequired
};

const mapStateToProps = ({ newPlaylist }) => ({
  playlist: newPlaylist.content
});

const mapDispatchToProps = dispatch => ({
  doFetchPlaylistTracks: id => dispatch(fetchPlaylistTracks(id)),
  doCreateNewPlaylist: () => dispatch(createNewPlaylist())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);
