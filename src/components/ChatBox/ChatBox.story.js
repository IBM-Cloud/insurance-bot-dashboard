import React from 'react';
import { storiesOf } from '@kadira/storybook';

import ChatBox from './ChatBox';

const log = [
  {
    inputText: 'I need some help.',
    responseText: ['I suggest calling 911.'],
  },
  {
    inputText: 'That isnt helpful',
    responseText: ['I am a bot afterall...', 'What do you expect?'],
  },
];
storiesOf('ChatBox', module)
  .add('Some Chat', () => (
    <ChatBox log={log} owner="Robert" />
  ));
