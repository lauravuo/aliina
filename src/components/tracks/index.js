import React from 'react';

const Tracks = ({ tracks }) => (
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
  </div>
);

export default Tracks;
