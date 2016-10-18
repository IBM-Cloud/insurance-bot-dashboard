import React from 'react';
import { Circle } from 'rc-progress';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import WatsonLoader from 'components/WatsonLoader';
import { palette } from 'styles/muiTheme';
import classes from './ToneBox.scss';

const styles = {
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute', // Safari Fix
  },
  header: {
    paddingBottom: 0,
  },
};

const ToneBox = ({ toneResult }) => (
  <Card containerStyle={styles.container} className={classes.container}>
    <CardHeader style={styles.header} title="ALL SENTIMENTS" />
    {toneResult.length ?
      <div className={classes.graphsContainer}>
        {toneResult.map((emotion, i) =>
          <div key={i} className={classes.sentiment}>
            <div className={classes.label}>{emotion.tone_name}</div>
            <div className={classes.graphWrapper}>
              <div className={classes.percentage}>
                <div>{(emotion.score * 100).toFixed()}%</div>
              </div>
              <Circle
                className={classes.graph}
                percent={(emotion.score * 100)}
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
      <WatsonLoader />
    }
  </Card>
  );

ToneBox.propTypes = {
  toneResult: React.PropTypes.arrayOf(React.PropTypes.shape({
    tone_name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
  })).isRequired,
};

export default ToneBox;
