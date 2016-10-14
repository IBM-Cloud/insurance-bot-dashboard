import React from 'react';
import moment from 'moment';
import { CardMedia, CardText } from 'material-ui/Card';
import classes from './ChatBox.scss';

const formatTime = (date) => moment(date).format('h:mma');

const MessageList = ({ user, log }) => (
  <CardMedia>
    <CardText style={{ padding: '0' }}>
      <ul className={classes.messageList}>
        {log.map((message, i) =>
          <li key={i}>
            <div className={`${classes.owner} ${classes.user}`}>
              {user} | {formatTime(message.date)}
            </div>
            <p className={`${classes.text} ${classes.user}`}>
              {message.inputText}
            </p>

            <div className={`${classes.owner} ${classes.ana}`}>
              Ana
            </div>
            <p className={`${classes.text} ${classes.ana}`}>
              {message.responseText}
            </p>
          </li>
        )}
      </ul>
    </CardText>
  </CardMedia>
);

MessageList.propTypes = {
  user: React.PropTypes.string.isRequired,
  log: React.PropTypes.arrayOf(React.PropTypes.shape({
    inputText: React.PropTypes.string.isRequired,
    responseText: React.PropTypes.string.isRequired,
  })).isRequired,
};


export default MessageList;
