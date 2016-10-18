import React from 'react';
import { CardHeader } from 'material-ui/Card';
import { palette } from 'styles/muiTheme';

const styles = {
  title: {
    color: palette.primary1Color,
    fontSize: '0.75rem',
    letterSpacing: '1px',
  },
  text: {
    paddingRight: '0',
    fontSize: '0.875rem',
  },
};

const CustomCardHeader = props => (
  <CardHeader
    titleStyle={styles.title}
    textStyle={styles.text}
    {...props}
  />
);

export default CustomCardHeader;
