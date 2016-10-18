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


const ToneHistory = ({ toneHistory }) => (
  <Card className={classes.container}>
    <CardHeader title="SENTIMENT HISTORY" />
    <div className={classes.content}>
      {toneHistory.length ?
        <ResponsiveContainer>
          <LineChart width={672} height={125} data={toneHistory}>
            <XAxis dataKey="name" interval={2} tickLine={false} />
            <YAxis interval={1} tickLine={false} axisLine={false} />
            <Tooltip />
            <Line
              dataKey="anger"
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
        <WatsonLoader />
      }
    </div>
  </Card>
);

ToneHistory.propTypes = {
  toneHistory: React.PropTypes.array.isRequired,
};

export default ToneHistory;
