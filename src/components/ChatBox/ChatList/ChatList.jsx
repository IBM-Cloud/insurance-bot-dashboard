import React from 'react';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
// import { accent1Color, accent2Color } from 'styles/muiTheme';

const ChatList = () => (
  <List>
    <Subheader inset>Folders</Subheader>
    <ListItem
      leftAvatar={<Avatar icon={<FileFolder />} />}
      rightIcon={<ActionInfo />}
      primaryText="Photos"
      secondaryText="Jan 9, 2014"
    />
    <ListItem
      leftAvatar={<Avatar icon={<FileFolder />} />}
      rightIcon={<ActionInfo />}
      primaryText="Recipes"
      secondaryText="Jan 17, 2014"
    />
    <ListItem
      leftAvatar={<Avatar icon={<FileFolder />} />}
      rightIcon={<ActionInfo />}
      primaryText="Work"
      secondaryText="Jan 28, 2014"
    />
  </List>
);

export default ChatList;
