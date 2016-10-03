import React from 'react';
import classes from './HomeView.scss';
import ChatBox from 'components/ChatBox';

export const HomeView = () => (
  <div>
    <ChatBox user="Robert" />
  </div>
);

export default HomeView;
