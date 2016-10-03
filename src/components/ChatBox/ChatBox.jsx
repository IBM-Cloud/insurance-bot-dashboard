import React from 'react';
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card';
// import classes from './ChatBox.scss';

const ChatBox = (props) => (
  <Card>
    <CardHeader
      title={props.user}
      subtitle="In Progress"
      avatar="https://pbs.twimg.com/profile_images/567730084467859456/x9UsKKGz.jpeg"
    />
    <CardMedia>
      <CardText>
        <p>{props.user}: How much would a cavity cost?</p>
        <p>Watson: No idea, I haven't been trained to answer that.</p>
      </CardText>
    </CardMedia>
  </Card>
);

ChatBox.propTypes = {
  user: React.PropTypes.string.isRequired,
};

export default ChatBox;
