import React from 'react';
import { LineChart, Line } from 'Recharts';
import { Card, CardMedia, CardHeader } from 'material-ui/Card';
import { palette } from 'styles/muiTheme';
import classes from './ToneHistory.scss';
const data = [
      { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
      { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
      { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
      { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
      { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
      { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
      { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const styles = { 'box-shadow': 'none' };

const ToneHistory = ({ toneResult }) => (
  <Card className={classes.container} style={styles}>
    <p>SENTIMENT HISTORY</p>
    {toneResult.length ?
      <LineChart width={300} height={100} data={data}>
        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
      :
      <img alt="loading" src="/watson_anim.gif" height="80px" width="80px" />
    }
  </Card>
  );

ToneHistory.propTypes = {
  toneResult: React.PropTypes.arrayOf(React.PropTypes.shape({
    text: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
  })).isRequired,
};

export default ToneHistory;
