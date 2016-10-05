import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import ChatBox from 'components/ChatBox';
import ChatList from 'components/ChatList';
import api from 'services';
import io from 'socket.io-client';
import moment from 'moment';
import classes from './HomeView.scss';

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      socket: io(__SOCKET_URL__),
    };
  }

  componentDidMount() {
    api.getLogs().then(conversations => this.setState({ conversations }));

    const { socket } = this.state;
    socket.connect();
    socket.on('logDoc', this.updateConversation);
  }

  componentWillUnmount() {
    this.state.socket.disconnect();
  }

  updateConversation = (message) => {
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
  };


  render() {
    const timeFormat = 'MMM Do, h:mm a';
    const { conversations } = this.state;

    return (
      <div className={classes.homeView}>
        <ChatList conversations={conversations} />
        <div className={classes.conversationWindow}>
          {conversations.length > 0 ?
            <ChatBox
              log={conversations[0].logs}
              time={moment(conversations[0].date).format(timeFormat)}
              owner={conversations[0].owner}
            />
            :
            <CircularProgress size={2} />
          }
        </div>
      </div>
    );
  }
}

export default HomeView;
