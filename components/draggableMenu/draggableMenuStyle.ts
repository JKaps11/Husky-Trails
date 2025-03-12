import { COLORS } from '@/constants/theme';
import { StyleSheet } from 'react-native';

const draggableMenuStyles = StyleSheet.create({
  container: {
    position: 'absolute', // position at bottom
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // Elevation/shadow to appear above other content
    elevation: 10,
    zIndex: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  handle: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  handleIndicator: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default draggableMenuStyles;
