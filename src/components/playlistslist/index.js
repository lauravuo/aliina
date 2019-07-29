import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Row } from './style';

const PlaylistsList = ({ lists }) => (
  <div>
    <p> Select playlist below:</p>
    <Container>
      {lists.map(list => (
        <Link key={list.id} to={`/playlist/${list.id}`}>
          <Row>{list.name}</Row>
        </Link>
      ))}
    </Container>
  </div>
);

export default PlaylistsList;
