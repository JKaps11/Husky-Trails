import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const COLORS = {
  primaryO: 'rgba(0, 14, 47, 0.8)',
  primary: '#000E2F',
  defaultText: '#FFFFFF',
};

export const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.defaultText,
    primaryContainer: COLORS.primary,
    secondary: '#7C878E',
  },
};
