import React from 'react';
import PropTypes from 'prop-types';

const Tracks = ({ tracks, onCreatePressed }) => (
  <div>
    <h2>New playlist</h2>
    {tracks.map((track, index) => (
      <div>
        {track && (
          <div>
            <span>{`${index} `}</span>
            <span>
              {track.artists.map(artist => (
                <span>{`${artist.name} `}</span>
              ))}
            </span>
            <span>{track.name}</span>
          </div>
        )}
      </div>
    ))}
    <button type="button" onClick={onCreatePressed}>
      Save playlist
    </button>
  </div>
);

Tracks.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCreatePressed: PropTypes.func.isRequired
};

export default Tracks;
