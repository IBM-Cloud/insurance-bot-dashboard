import React from 'react';
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card';
 import classes from './ChatBox.scss';

const ChatBox = (props) => {
  let messages = [];
  if (props.conversation && props.conversation.logs){
    props.conversation.logs.forEach(function (messageentry) {
      messages.push(<p className={classes.right}>{messageentry.inputText}</p>);
      messages.push(<p className={classes.left}>{messageentry.responseText}</p>);
    });
  }
  return (
    <Card className={classes.container}>
      <CardHeader
        title={props.conversation.owner}
        subtitle="In Progress"
        avatar="https://tone-analyzer-demo.mybluemix.net/images/service-icon.svg"
      />
      <CardMedia>
        <CardText>
          { messages }
        </CardText>
      </CardMedia>
    </Card>
  );
};
ChatBox.propTypes = {
  conversation: React.PropTypes.object.isRequired,
};

export default ChatBox;
