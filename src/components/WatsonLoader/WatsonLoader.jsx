import React from 'react';
import classes from './WatsonLoader.scss';

const WatsonLoader = () => (
  <div className={classes.container}>
    <img alt="loading" src="/watson_anim.gif" height="75" width="75" />
  </div>
);

export default WatsonLoader;
