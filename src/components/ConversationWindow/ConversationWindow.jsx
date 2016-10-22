import React, { PropTypes } from 'react';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import ChatBox from 'components/ChatBox';
import ToneBox from 'components/ToneBox';
import ToneHistory from 'components/ToneHistory';
import TitleBar from './TitleBar';
import classes from './ConversationWindow.scss';

const formatName = ({ fname, lname }) => (fname
  ? `${fname} ${lname}`
  : 'John Doe'
);

const overallSentiment = toneResult => (
  toneResult.concat().sort((a, b) => b.score - a.score)[0].tone_name === 'Joy' ? 'Positive' : 'Negative'
);

const timeFormat = 'MMM Do, h:mm a';
const ConversationWindow = ({ conversation, toneResult, deleteLogAndRefresh }) => (
  <div className={classes.container}>
    <TitleBar
      name={formatName(conversation.lastContext)}
      email={conversation.owner}
      sentiment={toneResult.toneSummary.length > 0
        ? overallSentiment(toneResult.toneSummary)
        : 'Loading...'
      }
    />
    <div className={classes.chatWrapper}>
      <ChatBox
        user={conversation.lastContext.fname || 'John'}
        log={conversation.logs}
        time={moment(conversation.date).format(timeFormat)}
      />
      <ToneBox toneResult={toneResult.toneSummary || []} />
    </div>
    <ToneHistory toneHistory={toneResult.toneHistory || []} />
    <div className={classes.deleteWrapper}>
      <RaisedButton
        label="Delete Conversation"
        onClick={() => deleteLogAndRefresh(conversation.conversation)}
      />
    </div>
  </div>
);

ConversationWindow.propTypes = {
  conversation: PropTypes.shape({
    owner: PropTypes.string.isRequired,
    lastContext: PropTypes.shape({
      fname: PropTypes.string,
      lname: PropTypes.string,
    }).isRequired,
  }).isRequired,
  toneResult: PropTypes.shape({
    toneSummary: PropTypes.array.isRequired,
    toneHistory: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  deleteLogAndRefresh: React.PropTypes.func.isRequired,

};

export default ConversationWindow;
