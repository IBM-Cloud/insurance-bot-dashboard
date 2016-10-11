import React from 'react';
import { CardHeader } from 'material-ui/Card';
import Card from 'components/Card';
import MessageList from './MessageList';
import classes from './ChatBox.scss';

const ChatBox = (props) => (
  <Card >
    <CardHeader
      title="CONVERSATION LOG"
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
