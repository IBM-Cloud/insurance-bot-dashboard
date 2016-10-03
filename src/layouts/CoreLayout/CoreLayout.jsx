import React from 'react';
import AppBar from 'material-ui/AppBar';
import 'styles/core.scss';
import classes from './CoreLayout.scss';

export const CoreLayout = ({ children }) => (
  <div>
    <AppBar
      title="CloudCo Admin Dashboard"
      iconClassNameRight="fa fa-chevron-down"
    />
    <div className={classes.mainContainer}>
      {children}
    </div>
  </div>
);

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default CoreLayout;
