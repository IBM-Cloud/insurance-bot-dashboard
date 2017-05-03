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
      loaded: false,
      conversations: [],
      toneResult: {
        toneSummary: [],
        toneHistory: [],
      },
      socket: io(__SOCKET_URL__),
    };
  }

  componentDidMount() {
    api.getLogs().then(conversations => {
      this.setConversations(conversations);
      if (conversations.length > 0) {
        this.selectConversation(conversations[0].conversation);
      }
      this.setState({ loaded: true });
    });

    const { socket } = this.state;
    socket.connect();
    socket.on('logDoc', this.updateConversation);
  }

  componentWillUnmount() {
    this.state.socket.disconnect();
  }

  setConversations = conversations => {
    const flaggedConversations = conversations.map(conversation => {
      const flaggedLogs = conversation.logs.map(message => ({
        ...message,
        trainingNeeded:
          /not confident enough/.test(message.responseText) ||
          /can't file claims for that/.test(message.responseText) ||
          /don't understand that one/.test(message.responseText),
      }));

      return {
        ...conversation,
        logs: [...flaggedLogs],
        trainingNeeded: flaggedLogs.find(message => message.trainingNeeded) !== undefined,
      };
    });

    this.setState({ conversations: flaggedConversations });
  }

  getTone = id => {
    api.getTone(id).then(toneAnalysis => this.setState({
      toneResult: toneAnalysis,
    }));
  }

  deleteLogAndRefresh = id => {
    api.deleteLog(id).then(api.getLogs().then(conversations => {
      this.setConversations(conversations);
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
    const { conversations, selected, toneResult, loaded } = this.state;

    let conversationWindow = (<div className={classes.centeredContainer}>
      <CircularProgress size={1} />
    </div>);

    if (conversations.length) {
      conversationWindow = (<ConversationWindow
        conversation={conversations[selected]}
        toneResult={toneResult}
        deleteLogAndRefresh={this.deleteLogAndRefresh}
      />);
    }
    else if (loaded) {
      conversationWindow = (
        <div className={classes.centeredContainer}>
          No Chat Found
        </div>
      );
    }

    return (
      <div className={classes.container}>
        <ChatList
          selectConversation={this.selectConversation}
          selected={selected}
          conversations={conversations}
        />
        {conversationWindow}
      </div>
    );
  }
}

export default HomeView;
