import React, { PropTypes } from 'react';
import moment from 'moment';
import TitleBar from './TitleBar';
import ChatBox from 'components/ChatBox';
import ToneBox from 'components/ToneBox';
import ToneHistory from 'components/ToneHistory';
import classes from './ConversationWindow.scss';

const formatName = ({ owner, lastContext }) => (lastContext.fname
  ? `${lastContext.fname} ${lastContext.lname}`
  : owner
);

const timeFormat = 'MMM Do, h:mm a';
const ConversationWindow = ({ conversations, selected, toneResult }) => {
  const conversation = conversations[selected];

  return (
    <div className={classes.container}>
      <TitleBar
        name={formatName(conversation)}
        id={conversation.conversation}
        sentiment="Positive"
      />
      <div className={classes.row2}>
        <ChatBox
          log={conversations[selected].logs}
          time={moment(conversations[selected].date).format(timeFormat)}
        />
        <ToneBox toneResult={toneResult} />
      </div>
      <ToneHistory toneResult={toneResult} />
    </div>
  );
};

/*
const ConversationWindow = ({ conversations, selected, toneResult }) => (
  <div className={classes.container}>
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
*/


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
