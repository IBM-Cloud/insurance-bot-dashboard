import React from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import MessageList from './MessageList';
import classes from './ChatBox.scss';

const styles = { 'box-shadow': 'none' };

const ChatBox = (props) => (
  <Card className={classes.container} style={styles}>
    <CardHeader
      title="Conversation Log"
      subtitle={props.time}
      avatar="https://tone-analyzer-demo.mybluemix.net/images/service-icon.svg"
    />
    <MessageList log={props.log} />
  </Card>
);

ChatBox.propTypes = {
  log: React.PropTypes.array.isRequired,
  time: React.PropTypes.string,
};

export default ChatBox;
