import React from 'react';
import { Card } from 'material-ui/Card';
import { palette } from 'styles/muiTheme';

const styles = {
  boxShadow: 'none',
  border: `1px solid ${palette.accent1Color}`,
};

const DashCard = props => (
  <Card style={styles} {...props} />
);

export default DashCard;
