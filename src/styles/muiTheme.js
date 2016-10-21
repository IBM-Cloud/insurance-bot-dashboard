import getMuiTheme from 'material-ui/styles/getMuiTheme';
import colors from './base/_colors.scss';
import styleVars from './base/_variables.scss';

export const palette = {
  primary1Color: colors.primary1Color,
  primary2Color: colors.primary2Color,
  primary3Color: colors.primary3Color,
  accent1Color: colors.accent1Color,
  accent2Color: colors.accent2Color,
  accent3Color: colors.accent3Color,
  graph1Color: colors.graph1Color,
  graph2Color: colors.graph2Color,
  graph3Color: colors.graph3Color,
  alert1Color: colors.alert1Color,
  alert2Color: colors.alert2Color,
  textColor: colors.textColor,
  secondaryTextColor: colors.secondaryTextColor,
  alternateTextColor: colors.alternateTextColor,
  canvasColor: 'white',
  borderColor: colors.borderColor,
  // disabledColor: fade(darkBlack, 0.3),
  // pickerHeaderColor: cyan500,
  // clockCircleColor: fade(darkBlack, 0.07),
  // shadowColor: fullBlack,
};

const muiTheme = getMuiTheme({
  palette,
  fontFamily: styleVars.primaryFont,
  appBar: {
    color: palette.primary2Color,
  },
});

export default muiTheme;
