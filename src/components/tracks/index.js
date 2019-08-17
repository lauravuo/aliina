import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './style';

const Tracks = ({ tracks, onCreatePressed }) => (
  <div>
    <h2>{`Aliina ${new Date().toLocaleDateString()}`}</h2>
    {tracks.map((track, index) => (
      <div key={track.id}>
        {track && (
          <div>
            <span>{`${index} `}</span>
            <span>
              {track.artists.map(artist => (
                <span key={artist.id}>{`${artist.name} `}</span>
              ))}
            </span>
            <span>{track.name}</span>
          </div>
        )}
      </div>
    ))}
    <Button
      type="button"
      onClick={() =>
        onCreatePressed(`Aliina ${new Date().toLocaleDateString()}`)
      }
    >
      Save playlist
    </Button>
  </div>
);

Tracks.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCreatePressed: PropTypes.func.isRequired
};

export default Tracks;
