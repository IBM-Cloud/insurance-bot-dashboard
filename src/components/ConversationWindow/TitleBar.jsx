import React, { PropTypes } from 'react';
import Gravatar from 'react-gravatar';
import classes from './TitleBar.scss';


const TitleBar = ({ name, email, sentiment }) => (
  <div className={classes.container}>
    <Gravatar className={classes.avatar} email={email} />
    <div className={classes.userInfo}>
      <h1>{name}</h1>
      <p>{email}</p>
    </div>
    <div className={classes.sentiment}>
      <p>CURRENT SENTIMENT</p>
      <p className={classes.value}>{sentiment}</p>
    </div>
  </div>
);

TitleBar.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  sentiment: PropTypes.string.isRequired,
};

export default TitleBar;
