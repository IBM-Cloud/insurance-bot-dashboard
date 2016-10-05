import React from 'react';
import ChatBox from 'components/ChatBox';
import api from 'services';
import io from 'socket.io-client';
import classes from './HomeView.scss';
const moment = require('moment');
const timeFormat = 'MMM Do, h:mm a';

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

    socket.on('connect', message => {
      console.log('Connected to socket.io');
    });
    socket.on('error', message => {
      console.log('Socket.io Error:', message);
    });
    socket.on('disconnect', message => {
      console.log('Disconnected from socket.io');
    });
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
    return (
      <ul className={classes.conversationList}>
        {this.state.conversations.map(conversation =>
          <li key={conversation.conversation}>
            <ChatBox
              log={conversation.logs}
              time={moment(conversation.date).format(timeFormat)}
              owner={conversation.owner}
              conversationID={conversation.conversation}
            />
          </li>
        )}
      </ul>
    );
  }
}

export default HomeView;
