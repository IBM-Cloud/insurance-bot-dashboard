import React from 'react';
import { Card } from 'material-ui/Card';
import classes from './ToneBox.scss';


const ToneBox = (props) => (
  <Card className={classes.container}>
    {props.toneResult.length > 0 ?
      <div>
        Watson Analytics
        <hr />
        {props.toneResult.map((emotion, i) =>
          <li key={i}>
            <p>{emotion.text}: {(emotion.value * 100).toFixed(2)}%</p>
          </li>
        )}
      </div>
    :
      <img alt="loading" src="/watson_anim.gif" height="180px" width="180px" />
  }
  </Card>
  );

ToneBox.propTypes = {
  toneResult: React.PropTypes.array.isRequired,
};

export default ToneBox;
