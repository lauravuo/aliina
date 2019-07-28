import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>
    <h1>Aliina</h1>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/page">Page</Link>
      </li>
      <li>
        <Link to="/not-there">No match</Link>
      </li>
    </ul>
  </div>
);
