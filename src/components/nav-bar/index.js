import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Logo } from './style';

export default () => (
  <div>
    <Link to="/">
      <Container>
        <Logo />
        <h1>Aliina</h1>
      </Container>
    </Link>
    <p>
      Aliina creates a new Spotify playlist using a previously created playlist
      as the basis.
    </p>
  </div>
);
