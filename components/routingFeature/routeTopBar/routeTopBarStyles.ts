import { COLORS } from '@/constants/theme';
import { StyleSheet } from 'react-native';

const routeTopBarStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'column',
    paddingTop: 45,
    paddingBottom: 10,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.primary,
    marginHorizontal: 8,
  },
  inputPill: {
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    width: '70%',
    maxWidth: '70%',
    elevation: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
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

export default routeTopBarStyles;
