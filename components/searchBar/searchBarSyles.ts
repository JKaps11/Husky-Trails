import { COLORS } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const searchBarStyles = StyleSheet.create({
  searchBar: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.primary,
  },
  searchBarText: {
    color: COLORS.defaultText,
  },
});
