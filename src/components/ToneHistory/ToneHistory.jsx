import React from 'react';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import WatsonLoader from 'components/WatsonLoader';
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

const chartStyle = {
  margin: {
    top: 5,
    left: 50,
    right: 5,
    bottom: 5,
  },
  xAxisPadding: {
    left: 30,
    right: 10,
  },
  lineType: 'natural', // http://recharts.org/api#Line
};

const formatPercent = data => {
  const formatted = (data * 100).toFixed();
  return formatted === '0' ? '' : `${formatted}%`;
};

const CustomLabel = props => (
  <g>
    <text
      width={props.width}
      height={props.height}
      x={chartStyle.margin.left / 2}
      y={props.y + chartStyle.margin.top}
      className="recharts-text"
      stroke="none"
      fill={props.stroke}
    >
      <tspan x="25" dy="0.71em">Comments</tspan>
    </text>
  </g>
);


const ToneHistory = ({ toneHistory }) => (
  <Card className={classes.container}>
    <CardHeader title="SENTIMENT HISTORY" />
    <div className={classes.content}>
      {toneHistory.length ?
        <ResponsiveContainer>
          <LineChart
            data={toneHistory}
            margin={chartStyle.margin}
          >
            <XAxis
              label={<CustomLabel />}
              dataKey="name"
              interval={2}
              tickLine={false}
              padding={chartStyle.xAxisPadding}
            />
            <YAxis
              tickFormatter={formatPercent}
              domain={[0, 1]}
              interval={1}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip />
            <Line
              dataKey="anger"
              stroke={palette.graph1Color}
              type={chartStyle.lineType}
              strokeWidth={2}
              formatter={formatPercent}
            />
            <Line
              dataKey="joy"
              stroke={palette.graph2Color}
              type={chartStyle.lineType}
              strokeWidth={2}
              formatter={formatPercent}
            />
            <Line
              dataKey="sadness"
              stroke={palette.graph3Color}
              type={chartStyle.lineType}
              strokeWidth={2}
              formatter={formatPercent}
            />
          </LineChart>
        </ResponsiveContainer>
        :
        <WatsonLoader />
      }
    </div>
  </Card>
);

ToneHistory.propTypes = {
  toneHistory: React.PropTypes.array.isRequired,
};

export default ToneHistory;
