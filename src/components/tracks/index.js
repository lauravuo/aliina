import React from 'react';
import PropTypes from 'prop-types';

import { Button, PlaylistLink } from './style';

const newTitle = `Aliina ${new Date().toLocaleDateString()}`;

const Tracks = ({ tracks, onCreatePressed, playlistUrl, saving }) => (
  <div>
    {playlistUrl ? (
      <PlaylistLink>
        <p>All done!</p>
        <a href={playlistUrl} target="_blank" rel="noopener noreferrer">
          Show playlist in Spotify
        </a>
      </PlaylistLink>
    ) : (
      <div>
        <h2>{newTitle}</h2>
        {tracks.map((track, index) => (
          <div key={track.id}>
            {track && (
              <div>
                <span>{`${index + 1} `}</span>
                <span>
                  {track.artists.map((artist, i) => (
                    <span key={artist.id}>{`${artist.name}${
                      i < track.artists.length - 1 ? ', ' : ': '
                    }`}</span>
                  ))}
                </span>
                <span>{track.name}</span>
              </div>
            )}
          </div>
        ))}
        <Button
          disabled={saving}
          type="button"
          onClick={() => onCreatePressed(newTitle)}
        >
          Save playlist
        </Button>
      </div>
    )}
  </div>
);

Tracks.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCreatePressed: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  playlistUrl: PropTypes.string,
};

Tracks.defaultProps = {
  playlistUrl: null,
};

export default Tracks;
