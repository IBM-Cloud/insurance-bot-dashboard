import React from 'react';
import { Card } from 'material-ui/Card';

const styles = { 'box-shadow': 'none' };

const DashCard = props => (
  <Card style={styles} {...props} />
);

export default DashCard;
