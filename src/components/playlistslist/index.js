import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistsList = ({ lists }) => (
  <div>
    {lists.map(list => (
      <div key={list.id}><Link to={`/playlist/${list.id}`}>{list.name}</Link></div>
    ))}
  </div>
);

export default PlaylistsList;
