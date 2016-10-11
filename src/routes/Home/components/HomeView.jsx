import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import ChatBox from 'components/ChatBox';
import ToneBox from 'components/ToneBox';
import ToneHistory from 'components/ToneHistory';
import ChatList from 'components/ChatList';
import api from 'services';
import io from 'socket.io-client';
import moment from 'moment';
import classes from './HomeView.scss';

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      conversations: [],
      toneResult: [],
      socket: io(__SOCKET_URL__),
    };
  }

  componentDidMount() {
    // api.getLogs().then(conversations => );
    api.getLogs().then(
      (conversations) => {
        this.setState({ conversations });
        this.getTone(conversations[0].conversation);
      }
    );

    const { socket } = this.state;
    socket.connect();
    socket.on('logDoc', this.updateConversation);
  }

  componentWillUnmount() {
    this.state.socket.disconnect();
  }

  getTone = id => {
    api.getTone(id).then(toneAnalysis => this.setState({
      toneResult: toneAnalysis.map(emotion => ({ text: emotion.tone_name, value: emotion.score })),
    }));
  }

  updateConversation = message => {
    const { conversations } = this.state;
    const existingConversation = conversations
      .find(conversation => conversation.conversation === message.conversation);

    if (existingConversation) {
      existingConversation.logs = message.logs;
    }
    else {
      conversations.unshift(message);
    }

    this.setState(conversations);
  }

  selectConversation = id => {
    this.setState({ toneResult: [] });
    this.state.conversations.some((conv, i) => {
      if (conv.conversation === id) {
        this.setState({ selected: i });
        this.getTone(id);
        return true;
      }

      return false;
    });
  }

  formatName = ({ owner, lastContext }) => (lastContext.fname
    ? `${lastContext.fname} ${lastContext.lname}`
    : owner
  )

  render() {
    const timeFormat = 'MMM Do, h:mm a';
    const { conversations, selected } = this.state;

    return (
      <div className={classes.homeView}>
        <ChatList selectConversation={this.selectConversation} conversations={conversations} />
        <div className={classes.conversationWindow}>
          {conversations.length ?
            <div>
              <div>
                <div className={classes.title}>
                  <h2>{this.formatName(conversations[selected])}</h2>
                </div>

                <ChatBox
                  log={conversations[selected].logs}
                  time={moment(conversations[selected].date).format(timeFormat)}
                />
                <ToneBox
                  toneResult={this.state.toneResult}
                />
              </div>

              <hr />
              <ToneHistory
                toneResult={this.state.toneResult}
              />
            </div>
            :
            <CircularProgress size={1} />
          }
        </div>
      </div>
    );
  }
}

export default HomeView;
