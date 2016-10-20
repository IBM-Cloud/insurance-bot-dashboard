import React from 'react';
import Gravatar from 'react-gravatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FontIcon from 'material-ui/FontIcon';
import moment from 'moment';
import { palette } from 'styles/muiTheme';
import classes from './ChatList.scss';

const styles = {
  header: {
    color: palette.primary1Color,
    fontWeight: '500',
    fontSize: '0.875rem',
    letterSpacing: '1px',
    borderBottom: `1px solid ${palette.accent1Color}`,
    padding: '0.23rem 1rem',
  },
  listItem: selected => ({
    borderBottom: `1px solid ${palette.accent1Color}`,
    fontSize: '0.875rem',
    [selected ? 'backgroundColor' : null]: palette.accent1Color,
  }),
  secondaryText: {
    fontSize: '0.75rem',
  },
  icon: {
    fontSize: '1.125rem',
  },
};

const formatName = ({ fname, lname }) => (fname ? `${fname} ${lname}` : 'John Doe');
const formatDate = (date) => (
  <span style={styles.secondaryText}>
    {moment(date).format('MMM Do, h:mm a')}
  </span>
);

const ChatList = ({ conversations, selected, selectConversation }) => (
  <List className={classes.list}>
    <Subheader style={styles.header} inset={false}>ALL CHATS ({conversations.length})</Subheader>
    <div className={classes.itemsWrapper}>
      {conversations.map((conversation, i) =>
        <ListItem
          key={conversation.conversation}
          style={styles.listItem(selected === i)}
          leftAvatar={<Gravatar className={classes.avatar} email={conversation.owner} />}
          rightIcon={conversation.trainingNeeded
            ? <FontIcon style={styles.icon} className="fa fa-exclamation-triangle" color={palette.accent2Color} />
            : ''
          }
          primaryText={<div className={classes.truncate}>{formatName(conversation.lastContext)}</div>}
          secondaryText={formatDate(conversation.date)}
          onTouchTap={() => selectConversation(conversation.conversation)}
        />
      )}
    </div>
  </List>
);

ChatList.propTypes = {
  selectConversation: React.PropTypes.func.isRequired,
  selected: React.PropTypes.number.isRequired,
  conversations: React.PropTypes.arrayOf(React.PropTypes.shape({
    conversation: React.PropTypes.string.isRequired,
    owner: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
  })).isRequired,
};

export default ChatList;
