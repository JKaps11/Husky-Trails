import { StyleSheet } from 'react-native';
import { COLORS } from '@/constants/theme';

export const searchBarStyles = StyleSheet.create({
  container: {
    height: 50, // fixed height for the container
    width: '80%',
  },
  searchBar: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.primary,
  },
  searchBarText: {
    color: COLORS.defaultText,
  },
});
