import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from './index';

storiesOf('Button', module)
  .add('not pressed', () => <Button pressed={false} onPress={() => {}} />)
  .add('pressed', () => <Button pressed onPress={() => {}} />);
