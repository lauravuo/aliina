import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Logo, Description } from './style';

export default () => (
  <div>
    <Link to="/">
      <Container>
        <Logo />
      </Container>
    </Link>
    <Description>
      Aliina creates a new Spotify playlist using a previously created playlist
      as the basis.
    </Description>
  </div>
);
