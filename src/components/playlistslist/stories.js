import React from 'react';
import { storiesOf } from '@storybook/react';

import PlaylistsList from './index';

storiesOf('PlaylistsList', module).add('default', () => (
  <PlaylistsList lists={[]} />
));
