import React from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import MessageList from './MessageList';
import classes from './ChatBox.scss';
import api from 'services';
import BarChart from 'react-bar-chart';

class ChatBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toneResult: [],
    };
  }
  componentDidMount() {
    // console.log('this.props.conversationID: ', this.props.conversationID);
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
        <CardHeader
          title={this.props.owner}
          subtitle={this.props.time}
          avatar="https://tone-analyzer-demo.mybluemix.net/images/service-icon.svg"
        />
        <MessageList log={this.props.log} />
        <BarChart ylabel="Quantity"
          data={this.state.toneResult}
          margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
          height={500}
          width={500}
        />
      </Card>
    );
  }
}
ChatBox.propTypes = {
  log: React.PropTypes.array.isRequired,
  owner: React.PropTypes.string.isRequired,
  time: React.PropTypes.string,
  conversationID: React.PropTypes.string.isRequired,
};

export default ChatBox;
