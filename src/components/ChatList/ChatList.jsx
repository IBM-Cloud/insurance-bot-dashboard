import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import moment from 'moment';
// import { accent1Color, accent2Color } from 'styles/muiTheme';

const innerDivStyle = {
  backgroundColor: 'white',
  borderBottom: '1px solid smoke',
};

const leftAvatar = () => (
  <Avatar
    icon={
      <FontIcon
        className={'fa fa-user'}
        style={{ left: '2px' }}
        color={'white'}
      />}
  />
);

const ChatList = ({ conversations }) => (
  <List style={{ borderRight: '1px solid gray' }}>
    <Subheader inset={false}>Active Chats ({conversations.length})</Subheader>
    {conversations.map(conversation =>
      <ListItem
        key={conversation.conversation}
        innerDivStyle={innerDivStyle}
        leftAvatar={leftAvatar()}
        rightIcon={<FontIcon className="fa fa-smile-o" color={'green'} />}
        primaryText={conversation.owner}
        secondaryText={moment(conversation.date).format('MMM Do, h:mm a')}
      />
    )}
  </List>
);

ChatList.propTypes = {
  conversations: React.PropTypes.arrayOf(React.PropTypes.shape({
    conversation: React.PropTypes.string.isRequired,
    owner: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
  })).isRequired,
};

export default ChatList;
