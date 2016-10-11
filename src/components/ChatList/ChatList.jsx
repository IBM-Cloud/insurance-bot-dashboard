import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import moment from 'moment';
// import { accent1Color, accent2Color } from 'styles/muiTheme';

const leftAvatar = () => (
  <Avatar
    icon={
      <FontIcon
        className={'fa fa-user'}
        style={{ left: '2px', color: 'black' }}
        color={'black'}
      />}
  />
);

const formatName = ({ owner, lastContext }) => (lastContext.fname
  ? `${lastContext.fname} ${lastContext.lname}`
  : owner
);

const ChatList = ({ conversations, selectConversation }) => (
  <List style={{ borderRight: '1px solid lightgray' }}>
    <Subheader inset={false}>Active Chats ({conversations.length})</Subheader>
    {conversations.map(conversation =>
      <ListItem
        key={conversation.conversation}
        rightIcon={<FontIcon className="fa fa-smile-o" color={'green'} />}
        primaryText={formatName(conversation)}
        secondaryText={moment(conversation.date).format('MMM Do, h:mm a')}
        onTouchTap={() => selectConversation(conversation.conversation)}
        style={{ 'font-size': 'small', borderBottom: '1px solid #f7f9f9' }}
      />
    )}
  </List>
);

ChatList.propTypes = {
  selectConversation: React.PropTypes.func.isRequired,
  conversations: React.PropTypes.arrayOf(React.PropTypes.shape({
    conversation: React.PropTypes.string.isRequired,
    owner: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
  })).isRequired,
};

export default ChatList;
