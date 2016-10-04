import React from 'react';
import ChatBox from 'components/ChatBox';
import api from 'services';
import io from 'socket.io-client';
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
    api.getLogs().then(conversations => {
      console.log('Updating state, ', conversations);
      this.setState({ conversations });
    });

    const { socket } = this.state;
    socket.connect();
    socket.on('connect', message => {
      console.log('Connected to socket.io');
    });
    socket.on('error', message => {
      console.log('Socket.io Error:', message);
    });
    socket.on('logDoc', message => {
      console.log(message);
    });
    socket.on('disconnect', message => {
      console.log('Disconnected from socket.io');
    });
  }

  componentDidUnmount() {
    this.state.socket.disconnect();
  }


  render() {
    return (
      <ul className={classes.conversationList}>
        {this.state.conversations.map(conversation =>
          <li key={conversation._id}>
            <ChatBox log={conversation.logs} owner={conversation.owner} />
          </li>
        )}
      </ul>
    );
  }
}

export default HomeView;
