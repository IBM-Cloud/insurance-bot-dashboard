import React from 'react';
import { storiesOf } from '@kadira/storybook';
import CoreLayout from './CoreLayout';
// import FakeActionsPane from './FakeActionsPane';

const HeightDecorator = (story) => (
  <div style={{ height: '100vh' }}>
    {story()}
  </div>
);

storiesOf('CoreLayout', module)
  .addDecorator(HeightDecorator)
  .add('Fake Actions Pane', () => (
    <CoreLayout />
  ));
