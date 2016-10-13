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
    letterSpacing: '1px',
    borderBottom: `1px solid ${palette.accent1Color}`,
    padding: '0.23rem 1rem',
  },
  listItem: {
    borderBottom: `1px solid ${palette.accent1Color}`,
    fontSize: '0.875rem',
  },
  secondaryText: {
    fontSize: '0.75rem',
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

const formatName = ({ fname, lname }) => (fname ? `${fname} ${lname}` : 'Unknown');
const formatDate = (date) => (
  <span style={styles.secondaryText}>
    {moment(date).format('MMM Do, h:mm a')}
  </span>
);

const ChatList = ({ conversations, selectConversation }) => (
  <List className={classes.list}>
    <Subheader style={styles.header} inset={false}>ALL CHATS ({conversations.length})</Subheader>
    <div className={classes.itemsWrapper}>
      {conversations.map(conversation =>
        <ListItem
          key={conversation.conversation}
          style={styles.listItem}
          rightIcon={<FontIcon className="fa fa-smile-o" color={palette.accent2Color} />}
          primaryText={formatName(conversation.lastContext)}
          secondaryText={formatDate(conversation.date)}
          onTouchTap={() => selectConversation(conversation.conversation)}
        />
      )}
    </div>
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
