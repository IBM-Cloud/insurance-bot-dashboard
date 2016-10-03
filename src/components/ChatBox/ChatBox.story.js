import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ChatBox from './ChatBox';

storiesOf('ChatBox', module)
  .add('Some Chat', () => (
    <ChatBox user="Robert" />
  ));
