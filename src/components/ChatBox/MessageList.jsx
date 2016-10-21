import React from 'react';
import moment from 'moment';
import { CardMedia, CardText } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import { palette } from 'styles/muiTheme';
import classes from './ChatBox.scss';

const formatTime = (date) => moment(date).format('h:mma');

const styles = {
  icon: {
    fontSize: '1.125rem',
    marginRight: '0.5rem',
  },
};

const MessageList = ({ user, log }) => (
  <CardMedia>
    <CardText style={{ padding: '0' }}>
      <ul className={classes.messageList}>
        {log.map((message, i) =>
          <li key={i} className={`${classes.message} ${message.trainingNeeded ? classes.warning : ''}`}>
            <div className={`${classes.owner}`}>
              {message.trainingNeeded ?
                <span className={classes.trainingMsg}>
                  <FontIcon style={styles.icon} className="fa fa-exclamation-triangle" color={palette.primary2Color} />
                  TRAINING NEEDED
                </span>
                : ''
              }
              <div className={classes.user}>{user} | {formatTime(message.date)}</div>
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
    trainingNeeded: React.PropTypes.bool.isRequired,
  })).isRequired,
};


export default MessageList;
