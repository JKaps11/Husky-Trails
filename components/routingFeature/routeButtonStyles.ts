import { COLORS } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const routeStyles = StyleSheet.create({
  fabTrigger: {
    position: 'absolute',
    width: 60,
    height: 60,
    bottom: 45,
    margin: 16,
  },
  View: {
    position: 'absolute',
    padding: 20,
    backgroundColor: COLORS.primary,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    top: 0,
    left: 0,
    right: 0,
    bottom: '80%',
    zIndex: 3,
  },
});

export default routeStyles;
