import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import api from 'services';
import io from 'socket.io-client';
import ChatList from 'components/ChatList';
import ConversationWindow from 'components/ConversationWindow';
import classes from './HomeView.scss';

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      conversations: [],
      toneResult: {
        toneSummary: [],
        toneHistory: [],
      },
      socket: io(__SOCKET_URL__),
    };
  }

  componentDidMount() {
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
      toneResult: toneAnalysis,
    }));
  }

  deleteLogAndRefresh = id => {
    api.deleteLog(id).then(api.getLogs().then(conversations => {
      this.setState({ conversations });
      this.selectConversation(conversations[0].conversation);
    }));
  }

  updateConversation = message => {
    this.getTone(message.conversation);

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
    this.setState({ toneResult: { toneSummary: [], toneHistory: [] } });
    this.state.conversations.some((conv, i) => {
      if (conv.conversation === id) {
        this.setState({ selected: i });
        this.getTone(id);
        return true;
      }

      return false;
    });
  }

  render() {
    const { conversations, selected, toneResult } = this.state;

    return (
      <div className={classes.container}>
        <ChatList
          selectConversation={this.selectConversation}
          selected={selected}
          conversations={conversations}
        />
        {conversations.length ?
          <ConversationWindow
            conversation={conversations[selected]}
            toneResult={toneResult}
            deleteLogAndRefresh={this.deleteLogAndRefresh}
          />
          :
          <div className={classes.loadingContainer}>
            <CircularProgress size={1} />
          </div>
        }
      </div>
    );
  }
}

export default HomeView;
