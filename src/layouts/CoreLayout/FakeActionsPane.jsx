import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import 'styles/core.scss';
import classes from './CoreLayout.scss';


export const FakeActionsPane = () => (
  <div className={classes.fakeActionsPane}>
    <FontIcon className={`fa fa-users ${classes.icon}`} color={'white'} />
    <FontIcon className={`fa fa-comments-o ${classes.selected} ${classes.icon}`} color={'white'} />
    <FontIcon className={`fa fa-phone ${classes.icon}`} color={'white'} />
  </div>
);

export default FakeActionsPane;
