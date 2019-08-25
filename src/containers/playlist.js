import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../components/spinner';
import Tracks from '../components/tracks';
import { fetchPlaylistTracks, createNewPlaylist } from '../store/actions';

// match.params.id
const Playlist = ({
  selectedId,
  playlist,
  playlistUrl,
  saving,
  match,
  doFetchPlaylistTracks,
  doCreateNewPlaylist
}) => {
  useEffect(() => {
    if (!playlist || selectedId !== match.params.id) {
      doFetchPlaylistTracks(match.params.id);
    }
  });
  return (
    <div>
      {playlist ? (
        <Tracks
          tracks={playlist}
          onCreatePressed={doCreateNewPlaylist}
          playlistUrl={playlistUrl}
          saving={saving}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
};
//
Playlist.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.object.isRequired,
  doFetchPlaylistTracks: PropTypes.func.isRequired,
  doCreateNewPlaylist: PropTypes.func.isRequired
};

Playlist.defaultProps = {
  playlist: null
};

const mapStateToProps = ({ newPlaylist }) => ({
  selectedId: newPlaylist.originalId,
  playlist: newPlaylist.content,
  playlistUrl: newPlaylist.newId
    ? `https://open.spotify.com/user/spotify/playlist/${newPlaylist.newId}`
    : null,
  saving: newPlaylist.saving
});

const mapDispatchToProps = dispatch => ({
  doFetchPlaylistTracks: id => dispatch(fetchPlaylistTracks(id)),
  doCreateNewPlaylist: name => dispatch(createNewPlaylist(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);
