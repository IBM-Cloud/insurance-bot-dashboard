import React from 'react';
import ChatBox from 'components/ChatBox';
import api from 'services';
import classes from './HomeView.scss';

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
    };
  }

  componentDidMount() {
    api.getLogs().then(conversations => {
      console.log('Updating state, ', conversations);
      this.setState({ conversations });
    });
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
