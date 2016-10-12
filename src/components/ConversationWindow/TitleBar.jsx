import React, { PropTypes } from 'react';
import classes from './TitleBar.scss';

const TitleBar = ({ name, id, sentiment }) => (
  <div className={classes.container}>
    <div className={classes.avatar} />
    <div className={classes.userInfo}>
      <h1>{name}</h1>
      <p>ID: {id}</p>
    </div>
    <div className={classes.sentiment}>
      <p>CURRENT SENTIMENT</p>
      <p className={classes.value}>{sentiment}</p>
    </div>
  </div>
);

TitleBar.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  sentiment: PropTypes.string.isRequired,
};

export default TitleBar;
