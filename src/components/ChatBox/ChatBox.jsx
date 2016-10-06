import React from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import MessageList from './MessageList';
import classes from './ChatBox.scss';
import api from 'services';

class ChatBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
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
      </Card>
    );
  }
}
ChatBox.propTypes = {
  log: React.PropTypes.array.isRequired,
  owner: React.PropTypes.string.isRequired,
  time: React.PropTypes.string,
};

export default ChatBox;
