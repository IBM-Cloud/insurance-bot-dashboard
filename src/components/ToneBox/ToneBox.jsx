import React from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import classes from './ToneBox.scss';
import api from 'services';

class ToneBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toneResult: [],
    };
  }
  componentDidMount() {
    api.getTone(this.props.conversationID).then(
      (toneAnalysis) => {
        const result = [];
        toneAnalysis.map((emotion, i) =>
            result.push({ text: emotion.tone_name, value: emotion.score })
        );
        this.setState({ toneResult: result });
      }
  );
  }

  render() {
    return (
      <Card className={classes.container}>
        {this.state.toneResult.length > 0 ?
        <div>
          Watson Analytics
          <hr />
          {this.state.toneResult.map((emotion, i) =>
            <li key={i}>
              <p>{emotion.text}: {(emotion.value * 100).toFixed(2)}%</p>
            </li>
          )}
        </div>
        :
        <img src="/watson_anim.gif" height="180px" width="180px" />
      }
      </Card>
    );
  }
}
ToneBox.propTypes = {
  conversationID: React.PropTypes.string.isRequired,
};

export default ToneBox;
