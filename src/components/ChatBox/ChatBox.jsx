import React from 'react';
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import classes from './ChatBox.scss';

const ChatBox = (props) => {
  const { logs, owner } = props.conversation;
  const messages = logs.map((message, i) =>
  <li key={i}>
    <p className={classes.right}>{message.inputText}</p>
    <p className={classes.left}>{message.responseText}</p>
  </li>
  );

  return (
    <Card className={classes.container}>
      <CardHeader
        title={owner}
        subtitle="In Progress"
        avatar="https://tone-analyzer-demo.mybluemix.net/images/service-icon.svg"
      />
      <CardMedia>
        <CardText>
          <ul className={classes.messageList}>
            { messages }
          </ul>
        </CardText>
      </CardMedia>
    </Card>
  );
};
ChatBox.propTypes = {
  conversation: React.PropTypes.object.isRequired,
};

export default ChatBox;
