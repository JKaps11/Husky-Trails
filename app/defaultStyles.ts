import { COLORS } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  textInput: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 50,
    width: '80%',
    height: '40%',
    textAlign: 'center',
  },
  topBar: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: COLORS.primary,
    top: 0,
    left: 0,
    width: '100%',
    height: '10%',
    zIndex: 2,
  },
  // bottomNavBar: {
  //   position: 'absolute',
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-around',
  //   backgroundColor: COLORS.primary,
  //   borderRadius: 50,
  //   top: '80%',
  //   left: '15%',
  //   width: '70%',
  //   height: '7.5%',
  //   zIndex: 2,
  // },
  map: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    top: 0,
    zIndex: 1,
  },
});

export default defaultStyles;
