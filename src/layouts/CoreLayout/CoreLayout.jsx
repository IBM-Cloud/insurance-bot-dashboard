import React from 'react';
import AppBar from 'material-ui/AppBar';
import 'styles/core.scss';
import classes from './CoreLayout.scss';
import FakeActionsPane from './FakeActionsPane';

const styles = {
  title: {
    fontSize: '1rem',
    height: '3rem',
    lineHeight: '3rem',
  },
};

export const CoreLayout = ({ children }) => (
  <div className={classes.layoutWrapper}>
    <AppBar
      titleStyle={styles.title}
      title="Cloud Insurance Co"
      showMenuIconButton={false}
    />
    <div className={classes.mainContainer}>
      <FakeActionsPane />
      <div className={classes.chatContainer} >
        {children}
      </div>
    </div>
  </div>
);

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default CoreLayout;
