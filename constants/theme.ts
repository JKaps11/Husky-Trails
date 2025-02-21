import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const COLORS = {
  primary: 'rgba(0, 14, 47, 0.8)',
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
