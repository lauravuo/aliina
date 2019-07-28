import React from 'react';

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

export default Tracks;
