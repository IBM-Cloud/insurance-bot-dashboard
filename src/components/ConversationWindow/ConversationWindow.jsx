import React, { PropTypes } from 'react';
import moment from 'moment';
import ChatBox from 'components/ChatBox';
import ToneBox from 'components/ToneBox';
import ToneHistory from 'components/ToneHistory';
import classes from './ConversationWindow.scss';

const timeFormat = 'MMM Do, h:mm a';
const formatName = ({ owner, lastContext }) => (lastContext.fname
  ? `${lastContext.fname} ${lastContext.lname}`
  : owner
);

const ConversationWindow = ({ conversations, selected, toneResult }) => (
  <div className={classes.container}>
    <div>
      <div className={classes.title}>
        <h2>{formatName(conversations[selected])}</h2>
      </div>

      <ChatBox
        log={conversations[selected].logs}
        time={moment(conversations[selected].date).format(timeFormat)}
      />
      <ToneBox
        toneResult={toneResult}
      />
    </div>
    <ToneHistory
      toneResult={toneResult}
    />
  </div>
);

ConversationWindow.propTypes = {
  conversations: PropTypes.arrayOf(PropTypes.shape({
    owner: PropTypes.string.isRequired,
    lastContext: PropTypes.shape({
      fname: PropTypes.string,
      lname: PropTypes.string,
    }).isRequired,
  })).isRequired,
  selected: PropTypes.number.isRequired,
  toneResult: PropTypes.array.isRequired,
};

export default ConversationWindow;
