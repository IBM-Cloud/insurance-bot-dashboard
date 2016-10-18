import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Circle } from 'rc-progress';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const HeightDecorator = (story) => (
  <div style={{ height: '100vh' }}>
    {story()}
  </div>
);

const lineData = [
  { name: 'Message 1', happiness: 0.27, anger: 0.80 },
  { name: 'Message 1', happiness: 0.50, anger: 0.80 },
  { name: 'Message 1', happiness: 0.67, anger: 0.80 },
  { name: 'Message 1', happiness: 0.97, anger: 0.80 },
  { name: 'Message 1', happiness: 0.47, anger: 0.80 },
  { name: 'Message 1', happiness: 0.17, anger: 0.80 },
];

storiesOf('Charts', module)
  .addDecorator(HeightDecorator)
  .add('Circle Progress', () => (
    <Circle
      percent="30"
      strokeWidth="5"
      trailWidth="5"
      strokeColor="tomato"
      strokeLinecap="square"
    />
  ))
  .add('Line Chart', () => (
    <ResponsiveContainer>
      <LineChart
        width={600}
        height={300}
        data={lineData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="happiness" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="anger" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  ));
