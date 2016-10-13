import React from 'react';
import { Circle } from 'rc-progress';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import { palette } from 'styles/muiTheme';
import classes from './ToneBox.scss';

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
};

const ToneBox = ({ toneResult }) => (
  <Card containerStyle={styles.container} className={classes.container}>
    <CardHeader title="ALL SENTIMENTS" />
    {toneResult.length ?
      <div className={classes.graphsContainer}>
        {toneResult.map((emotion, i) =>
          <div key={i} className={classes.sentiment}>
            <div className={classes.label}>{emotion.text}</div>
            <div className={classes.graphWrapper}>
              <div className={classes.percentage}><div>{(emotion.value * 100).toFixed()}%</div></div>
              <Circle
                className={classes.graph}
                percent={(emotion.value * 100)}
                strokeWidth="12"
                trailWidth="12"
                strokeColor={palette[`graph${i + 1}Color`]}
                trailColor={palette.accent1Color}
                strokeLinecap="square"
              />
            </div>
          </div>
        )}
      </div>
      :
      <img alt="loading" src="/watson_anim.gif" height="80px" width="80px" />
    }
  </Card>
  );

ToneBox.propTypes = {
  toneResult: React.PropTypes.arrayOf(React.PropTypes.shape({
    text: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
  })).isRequired,
};

export default ToneBox;
