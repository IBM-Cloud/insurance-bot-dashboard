import React from 'react';
import { CardHeader } from 'material-ui/Card';

const styles = {
  paddingRight: '0',
};

const CustomCardHeader = props => (
  <CardHeader textStyle={styles} {...props} />
);

export default CustomCardHeader;
