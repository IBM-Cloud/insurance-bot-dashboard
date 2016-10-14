import React from 'react';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { palette } from 'styles/muiTheme';
import classes from './ToneHistory.scss';

const lineData = [
  { name: '1', joy: 0.27, frustration: 0.80, sadness: 0.70 },
  { name: '2', joy: 0.50, frustration: 0.20, sadness: 0.40 },
  { name: '3', joy: 0.67, frustration: 0.40, sadness: 0.30 },
  { name: '4', joy: 0.97, frustration: 0.60, sadness: 0.20 },
  { name: '5', joy: 0.47, frustration: 0.90, sadness: 0.60 },
  { name: '6', joy: 0.17, frustration: 0.10, sadness: 0.50 },
  { name: '7', joy: 0.27, frustration: 0.80, sadness: 0.70 },
  { name: '8', joy: 0.50, frustration: 0.20, sadness: 0.40 },
  { name: '9', joy: 0.67, frustration: 0.40, sadness: 0.30 },
  { name: '10', joy: 0.97, frustration: 0.60, sadness: 0.20 },
  { name: '11', joy: 0.47, frustration: 0.90, sadness: 0.60 },
  { name: '12', joy: 0.17, frustration: 0.10, sadness: 0.50 },
];

const ToneHistory = ({ toneResult }) => (
  <Card>
    <CardHeader title="SENTIMENT HISTORY" />
    <div className={classes.content}>
      {toneResult.length ?
        <ResponsiveContainer>
          <LineChart width={672} height={125} data={lineData}>
            <XAxis dataKey="name" interval={2} tickLine={false} />
            <YAxis interval={1} tickLine={false} axisLine={false} />
            <Tooltip />
            <Line
              dataKey="frustration"
              stroke={palette.graph1Color}
              type="natural"
              strokeWidth={2}
            />
            <Line
              dataKey="joy"
              stroke={palette.graph2Color}
              type="natural"
              strokeWidth={2}
            />
            <Line
              dataKey="sadness"
              stroke={palette.graph3Color}
              type="natural"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
        :
        <img alt="loading" src="/watson_anim.gif" height="80px" width="80px" />
      }
    </div>
  </Card>
);

ToneHistory.propTypes = {
  toneResult: React.PropTypes.arrayOf(React.PropTypes.shape({
    text: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
  })).isRequired,
};

export default ToneHistory;
