import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import moment from 'moment';
import { palette } from 'styles/muiTheme';
import classes from './ChatList.scss';

const styles = {
  header: {
    color: palette.primary1Color,
    fontWeight: '700',
    fontSize: '1rem',
    borderBottom: `1px solid ${palette.accent1Color}`,
    padding: '0.75rem 1rem',
  },
  listItem: {
    borderBottom: `1px solid ${palette.accent1Color}`,
  },
};

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
  <List className={classes.list}>
    <Subheader style={styles.header} inset={false}>ALL CHATS ({conversations.length})</Subheader>
    {conversations.map(conversation =>
      <ListItem
        key={conversation.conversation}
        style={styles.listItem}
        className={classes.listItem}
        rightIcon={<FontIcon className="fa fa-smile-o" color={'green'} />}
        primaryText={formatName(conversation)}
        secondaryText={moment(conversation.date).format('MMM Do, h:mm a')}
        onTouchTap={() => selectConversation(conversation.conversation)}
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
