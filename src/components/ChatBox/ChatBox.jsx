import React from 'react';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import MessageList from './MessageList';
import classes from './ChatBox.scss';

const ChatBox = ({ time, log }) => (
  <Card className={classes.container}>
    <CardHeader
      title="CONVERSATION LOG"
      subtitle={`Conversation Start: ${time}`}
    />
    <MessageList log={log} />
  </Card>
);

ChatBox.propTypes = {
  log: React.PropTypes.array.isRequired,
  time: React.PropTypes.string.isRequired,
};

export default ChatBox;
